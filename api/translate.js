// api/translate.js
export default async function handler(req, res) {
  // ==========================================
  // 【第一步：設定 CORS Headers，處理預檢請求】
  // ==========================================
  
  // 1. 允許你的 GitHub Pages 跨網域存取
  res.setHeader('Access-Control-Allow-Origin', 'https://josephwu.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // 2. 處理瀏覽器的預檢請求 (Preflight / OPTIONS)
  // 必須在檢查 POST 之前處理，否則預檢請求會被 405 擋掉
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // ==========================================
  // 【第二步：你原本的商業邏輯與防呆機制】
  // ==========================================

  // 3. 限制只能用 POST 請求 (這時候來的就只會是真正的 POST 了)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 4. 從環境變數中讀取 API Key
  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    return res.status(500).json({ error: '後端未設定 GEMINI_API_KEY 環境變數' });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt in request body' });
  }

  const SYSTEM_PROMPT = `你是薪情平台的查詢轉譯助理。薪情平台是台灣主計總處的官方薪資統計查詢系統。
你的任務是將使用者的自然語言輸入，轉譯成薪情平台可能對應的查詢條件，以繁體中文回覆。

請嚴格以以下格式回覆：
【轉譯結果】
行業別：...
職業別：...
性別：...
年份：...
統計指標：...
學歷：...
空間範圍：...

【備註】
簡短說明轉譯邏輯或不確定之處（1-2句話）`;

  try {
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
    
    // 把 System Prompt 和使用者輸入在後端組合
    const combinedPrompt = `${SYSTEM_PROMPT}\n\n====================\n\n現在請轉譯這句話：\n${prompt}`;

    const googleResponse = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: combinedPrompt }] }]
      })
    });

    const data = await googleResponse.json();

    if (!googleResponse.ok) {
      return res.status(googleResponse.status).json({ error: 'Google API Error', details: data });
    }

    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || '未獲得預期回覆';
    
    // 成功回傳給前端
    return res.status(200).json({ result: aiText });

  } catch (error) {
    // 萬一發生異常，也依然確保用 JSON 格式回傳，不會噴 HTML
    return res.status(500).json({ error: '後端執行 Exception', message: error.message });
  }
}
