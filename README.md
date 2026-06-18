# EarningsQuery

EarningsQuery 是一個概念驗證（PoC）專案，目標是將自然語言查詢轉換為結構化查詢（Canonical Query），並串接台灣政府公開統計資料平台。

---

## 專案願景

目前查詢政府統計資料時，使用者通常需要：

1. 找到正確的網站
2. 理解網站分類方式
3. 手動設定查詢條件
4. 解讀查詢結果

EarningsQuery 希望讓使用者直接輸入自然語言，例如：

* GG碩士男生薪資
* 金融業女性月薪
* 銀行業與保險業薪資比較
* 近五年科技業薪資趨勢

系統自動解析查詢意圖並轉換成可執行的查詢。

---

## 第一階段目標

驗證以下流程是否可行：

```text
自然語言
↓
同義詞比對
↓
Taxonomy 分類解析
↓
Canonical Query
```

第一階段不追求：

* AI Agent
* LLM 推理
* Vector Database
* Embedding
* 自然語言生成

而是先驗證核心知識模型。

---

## 目前目標資料來源

### 薪情探索

https://earnings.dgbas.gov.tw

原因：

* 分類清楚
* 資料公開
* 查詢條件結構化
* 適合作為第一個 Adapter

---

## 系統架構

```text
Natural Language Query
↓
Synonym Repository
↓
Taxonomy Repository
↓
Canonical Query
↓
Dataset Adapter
↓
Government Dataset
↓
Structured Result
```

---

## Repository 結構

```text
docs/
  01_Project_Overview.md
  02_Architecture.md
  03_Canonical_Query_Spec.md
  04_Taxonomy_Design.md
  05_Site_Adapters.md
  06_Roadmap.md
  07_Decisions_Log.md
  08_Test_Strategy.md

knowledge/
  taxonomy.csv
  synonyms.csv

tests/
  test_queries.json

src/
  parser.ts
```

---

## 核心概念

### Taxonomy Repository

用來儲存標準化分類。

目前規劃：

* industry（產業別）
* education（教育程度）
* gender（性別）
* age（年齡）

範例：

```text
I024 → 電子零組件製造業
E005 → 碩士
G001 → 男性
```

---

### Synonym Repository

將自然語言映射至 Taxonomy。

範例：

```text
GG → I024
研究所 → E005
男生 → G001
```

---

### Canonical Query

系統內部統一使用的查詢格式。

範例：

輸入：

```text
GG碩士男生薪資
```

輸出：

```json
{
  "dataset": "earnings",
  "filters": {
    "industry": ["I024"],
    "education": ["E005"],
    "gender": ["G001"]
  }
}
```

---

## 開發路線圖

### Phase 1：Knowledge Foundation

完成：

* taxonomy.csv
* synonyms.csv
* test_queries.json

---

### Phase 2：Query Parser

目標：

建立 parser.ts

完成：

```text
自然語言
↓
Canonical Query
```

---

### Phase 3：Earnings Adapter

目標：

串接薪情探索

完成：

```text
Canonical Query
↓
薪情探索查詢
↓
結構化結果
```

---

### Phase 4：多資料來源整合

預計：

* 就業與失業觀測站
* 勞動部統計
* 人口普查資料

---

### Phase 5：語意理解

支援：

* 比較
* 排名
* 趨勢
* 時間區間

---

## 設計原則

1. Knowledge First
2. Retrieval Second
3. AI Third

先驗證知識模型，再優化 Retrieval，最後才導入 AI。

---

## 目前狀態

已完成：

* Taxonomy Repository
* Synonym Repository
* Documentation Pack v1.1

進行中：

* Query Translation Engine（parser.ts）

下一個里程碑：

```text
Natural Language
↓
Canonical Query
```

