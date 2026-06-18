\# Roadmap



Version: v1.1



---



\# Current Status



目前已完成：



✓ Industry Taxonomy



✓ Education Taxonomy



✓ Gender Taxonomy



✓ Age Taxonomy



✓ Synonym Repository v0.1



✓ Taxonomy Repository



✓ Canonical Query Draft



✓ Architecture Design



✓ ADR Foundation



---



\# Phase 1 - Knowledge Foundation



Status: In Progress



目標：



建立可運作的知識層。



Deliverables：



\- taxonomy.csv

\- synonyms.csv

\- test\_queries.json



成功條件：



能夠從 Query 找出 Canonical IDs。



---



\# Phase 2 - Query Parser



Status: Planned



目標：



建立第一版 Query Translation Engine。



流程：



Query



↓



Synonym Matching



↓



Taxonomy Resolution



↓



Canonical Query



成功條件：



輸出合法 Canonical Query。



---



\# Phase 3 - Earnings Adapter



Status: Planned



目標：



串接薪情探索。



流程：



Canonical Query



↓



Earnings Adapter



↓



Website Request



↓



Structured Result



成功條件：



取得真實資料。



---



\# Phase 4 - Retrieval Optimization



Status: Future



目標：



提升查詢覆蓋率。



可能方案：



\- Synonym Expansion

\- Alias Normalization

\- Fuzzy Matching



注意：



此階段仍不引入 LLM。



---



\# Phase 5 - Full DGBAS Taxonomy



Status: Future



目標：



導入主計總處完整分類。



資料來源：



行政院主計總處



行業標準分類（第11次修訂）



策略：



保留 PoC Taxonomy



↓



建立 Mapping



↓



逐步切換



---



\# Phase 6 - Multi-Dataset Platform



Status: Future



新增：



\- manpower adapter

\- labor adapter

\- census adapter



成功條件：



同一 Canonical Query 可查詢多個資料來源。



---



\# Phase 7 - Semantic Understanding



Status: Future



處理：



\- 趨勢

\- 排名

\- 比較

\- 時間範圍



範例：



近五年金融業薪資



科技業薪資排名



金融業與科技業比較



---



\# Guiding Principle



Knowledge First



Retrieval Second



AI Third



不要過早優化。



先驗證核心價值。

