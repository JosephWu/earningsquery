// api/translate.js
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

  // 4. 定義嚴格的 System Prompt 與對照標準
  const SYSTEM_PROMPT = `你是一個嚴格的台灣主計總處「薪情平台」自然語言查詢轉譯器。
你的任務是分析使用者的口語化輸入，並將其嚴格對照到指定的「行業別代碼(target_id)」。

【行業別與同義詞對照權威資料庫】
以下是使用者可能輸入的口語關鍵字與對應的標準代碼：
- 工業/服務業/工及服務 -> "I001"
- 製造業/製造 -> "I006"
- 食品製造/飼品製造 -> "I007"
- 飲料製造/菸草製造 -> "I008"
- 紡織業/紡織 -> "I009"
- 電子零組件製造 -> "I026"
- 電腦/電子產品/光學製品製造 -> "I027"
- 電力設備製造 -> "I028"
- 機械設備製造 -> "I029"
- 汽車/零件製造 -> "I030"
- 營建工程業/營造業/建築工程 -> "I043"
- 批發及零售業/買賣業/零售/批發 -> "I048"
- 運輸及倉儲業/貨運/客運/倉儲 -> "I053"
- 住宿及餐飲業/飯店/餐廳/餐飲/住宿 -> "I058"
- 出版/影音製作/傳播/資通訊服務 -> "I062"
- 軟體出版/數位內容 -> "I063"
- 電信業/通訊業 -> "I066"
- 資訊服務業/軟體設計/程式研發 -> "I067"
- 金融及保險業/銀行/保險/證券 -> "I069"
- 不動產業/房地產/仲介 -> "I082"
- 專業科學技術/法律/會計/管顧/工程設計/研發 -> "I087"
- 醫療保健/醫院/診所/社會工作 -> "I107"
- 藝術/娛樂/休閒服務 -> "I110"

【轉譯鐵律】
1. 分析使用者的輸入，找出他想查詢的「行業別」。
2. 從上方的權威資料庫中，找到最精確符合的標準代碼（例如 "I006"）。如果使用者講的很模糊（如：做生意的），請嘗試歸類到最接近的（如批發零售 "I048"）。
3. 如果使用者輸入的內容完全跟行業別無關、或者完全無法辨識，行業別代碼請務必填寫 "UNKNOWN"。
4. 統計指標預設為 "earnings" (總薪資)，除非明確提到時薪或別的指標。

【回傳規範】你必須嚴格遵守 JSON Schema 格式回傳，不得包含任何額外的 Markdown 標籤或 markdown 區塊包裹。`;

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
            description: "對應的官方行業別代碼，例如 I006。若無法識別則填 UNKNOWN" 
          },
          industry_name: { 
            type: "string", 
            description: "該代碼對應的標準官方名稱，例如 製造業" 
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
