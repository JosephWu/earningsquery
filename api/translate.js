// pages/api/translate.js
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // 1. 設定 CORS Headers，處理預檢請求
  res.setHeader('Access-Control-Allow-Origin', 'https://josephwu.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 2. 限制只能用 POST 請求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 3. 讀取環境變數
  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    return res.status(500).json({ error: '後端未設定 GEMINI_API_KEY 環境變數' });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt in request body' });
  }

  // ==========================================
  // 【核心黑科技：動態讀取你的本機 CSV 檔案】
  // ==========================================
  let csvContext = "";
  try {
    // 取得根目錄下的 CSV 路徑（假設你的 csv 放在專案最外層根目錄）
    const taxonomyPath = path.join(process.cwd(), 'taxonomy.csv');
    const synonymsPath = path.join(process.cwd(), 'synonyms.csv');

    const taxonomyData = fs.readFileSync(taxonomyPath, 'utf8');
    const synonymsData = fs.readFileSync(synonymsPath, 'utf8');

    csvContext = `
【權威資料庫 1：標準行業別分類 (Taxonomy)】
${taxonomyData}

【權威資料庫 2：口語同義詞對照表 (Synonyms)】
${synonymsData}
`;
  } catch (csvError) {
    console.error("讀取 CSV 失敗，降級使用內建 Prompt", csvError);
    // 如果檔案路徑不對，可以先放個簡單的備用文字防止程式崩潰
    csvContext = "（暫時無法讀取 CSV 對照表，請根據已知台灣行業別嘗試通用的分類）";
  }

  // 4. 定義嚴格的 System Prompt，將 CSV 內容當作 Context 餵給 Gemini
  const SYSTEM_PROMPT = `你是一個嚴格的台灣主計總處「薪情平台」自然語言查詢轉譯器。
你的任務是分析使用者的口語化輸入，並將其嚴格對照到指定的「行業別代碼(target_id)」。

以下是系統目前擁有的權威對照資料庫（包含標準代碼與口語同義詞）：
${csvContext}

【轉譯鐵律】
1. 分析使用者的輸入，找出他想查詢的「行業別」。
2. 請死命地比對【權威資料庫 2】中的 keyword。如果使用者的口語命中 keyword，請找出對應的 target_id。
3. 如果沒有完全命中的關鍵字，請比對【權威資料庫 1】中的 name，嘗試歸類到最接近的行業別（例如：做生意的 -> 歸類到批發零售業 I048）。
4. 如果使用者輸入的內容完全跟行業別無關、或者完全無法辨識，行業別代碼請務必填寫 "UNKNOWN"。
5. 統計指標預設為 "earnings" (總薪資)，除非明確提到時薪或別的指標。

【回傳規範】你必須嚴格遵守 JSON Schema 格式回傳，不得包含任何額外的 Markdown 標籤。`;

  // 5. 建立呼叫 Gemini API 的 Payload（啟用 JSON 強制輸出模式）
  const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  const payload = {
    contents: [
      {
        parts: [
          { text: `${SYSTEM_PROMPT}\n\n現在請轉譯這句使用者口語：\n"${prompt}"` }
        ]
      }
    ],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          industry_code: { 
            type: "string", 
            description: "對應的官方行業別代碼，例如 I006 或 I067。若無法識別則填 UNKNOWN" 
          },
          industry_name: { 
            type: "string", 
            description: "該代碼對應的標準官方名稱，例如 製造業、資訊服務業" 
          },
          metric: { 
            type: "string", 
            description: "統計指標，預設為 earnings" 
          },
          explanation: { 
            type: "string", 
            description: "繁體中文簡短說明你為何這樣分類的原因（1句話）" 
          }
        },
        required: ["industry_code", "industry_name", "metric", "explanation"]
      }
    }
  };

  try {
    const googleResponse = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await googleResponse.json();

    if (!googleResponse.ok) {
      return res.status(googleResponse.status).json({
        error: 'Google API 回傳錯誤',
        details: data
      });
    }

    // 取得 Gemini 吐出來的純 JSON 字串
    const jsonString = data.candidates[0].content.parts[0].text;
    
    // 直接解析並回傳給前端
    const result = JSON.parse(jsonString);
    return res.status(200).json(result);

  } catch (error) {
    return res.status(500).json({ error: '後端程式碼發生錯誤', details: error.message });
  }
}
