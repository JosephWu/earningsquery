\# Decisions Log



Version: v1.1



---



\# ADR-001



Title



Use Canonical Query as Intermediate Representation



Status



Accepted



Decision



所有 Query 必須先轉換成 Canonical Query。



Reason



避免 Parser 與 Adapter 耦合。



---



\# ADR-002



Title



Introduce Taxonomy Repository



Status



Accepted



Decision



建立獨立 Taxonomy Repository。



Reason



集中管理知識模型。



---



\# ADR-003



Title



Use Single Taxonomy Table



Status



Accepted



Decision



所有 Taxonomy 共用 taxonomy.csv。



Reason



降低維護成本。



---



\# ADR-004



Title



Add Domain Column



Status



Accepted



Decision



增加 domain 欄位。



Reason



支援多個分類體系。



---



\# ADR-005



Title



Use Earnings Taxonomy for PoC



Status



Accepted



Decision



PoC 階段採用薪情探索實際分類。



Reason



降低導入成本。



---



\# ADR-006



Title



Delay Full DGBAS Taxonomy



Status



Accepted



Decision



暫不導入第11次修訂完整分類。



Reason



PoC 不需要。



---



\# ADR-007



Title



Use Synonym Repository



Status



Accepted



Decision



建立 Synonym Repository。



Reason



支援自然語言輸入。



---



\# ADR-008



Title



Synonyms Are Dataset Independent



Status



Accepted



Decision



Synonym 不包含 adapter\_id。



Reason



屬於語言知識。



不是網站知識。



---



\# ADR-009



Title



Support Multi-Select Filters



Status



Accepted



Decision



所有 Filter 使用 Array。



Reason



支援多選。



---



\# ADR-010



Title



Start with Synonym Repository v0.1



Status



Accepted



Decision



每個 Taxonomy 先建立有限 Synonyms。



Reason



先驗證架構。



---



\# ADR-011



Title



Retrieval Before Taxonomy Expansion



Status



Accepted



Decision



先做 Retrieval。



再擴充 Taxonomy。



Reason



避免過早優化。



---



\# ADR-012



Title



Use Google Sheets as Authoring Tool



Status



Accepted



Decision



使用 Google Sheets 維護知識庫。



CSV 為正式格式。



---



\# ADR-013



Title



Prefer Industry Classification for Ambiguous Terms



Status



Accepted



Decision



當詞彙同時可能代表職業與產業時，



PoC 優先映射至 Industry Taxonomy。



Example



保全



Reason



目前資料來源以產業別為主。



---



\# ADR-014



Title



Use CSV as Initial Knowledge Storage



Status



Accepted



Decision



PoC 使用 CSV。



不導入 Database。



Reason



資料量極小。



維護成本最低。



---



\# ADR-015



Title



Use Exact Match Retrieval First



Status



Accepted



Decision



第一版使用 Exact Match。



Example



query.includes(keyword)



Reason



先驗證知識模型。



再優化 Retrieval。

