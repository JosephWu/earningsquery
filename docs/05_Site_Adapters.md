\# Site Adapters



Version: v1.1



---



\# 1. Purpose



Adapter 負責將 Canonical Query 轉換成各資料來源所需要的查詢參數。



Adapter 是系統與外部網站之間的轉換層。



其主要責任：



\- 理解目標網站的查詢介面

\- 將 Canonical Query 映射成網站參數

\- 隔離網站變動對核心系統的影響



---



\# 2. Design Principle



核心原則：



Taxonomy 與 Canonical Query 不應依賴任何特定網站。



網站差異應由 Adapter 處理。



---



\# 3. Current Adapter



\## earnings



資料來源：



https://earnings.dgbas.gov.tw



用途：



薪資相關查詢



目前狀態：



Planned



---



\# 4. Future Adapters



\## manpower



資料來源：



就業與失業觀測站



用途：



就業人口

失業率

勞動參與率



---



\## labor



資料來源：



勞動部統計資料



用途：



勞動市場相關統計



---



\## census



資料來源：



人口普查



用途：



人口結構分析



---



\# 5. Adapter Mapping



未來預計新增：



adapter\_mapping.csv



用途：



將網站實際使用的分類值映射至 Canonical Taxonomy。



範例：



| adapter | source\_value | taxonomy\_id |

|----------|----------|----------|

| earnings | 電子零組件製造業 | I024 |

| earnings | 金融及保險業 | I080 |



---



\# 6. Why Separate Mapping?



不要將網站值直接存入 Taxonomy。



原因：



網站分類可能改版。



Canonical Taxonomy 應保持穩定。



---



\# 7. Adapter Responsibilities



Adapter 應負責：



✓ 參數轉換



✓ 分類映射



✓ 網站相容性



Adapter 不應負責：



✗ Query Parsing



✗ Synonym Resolution



✗ Taxonomy Maintenance



---



\# 8. Future Vision



未來新增網站時：



不需要修改 Parser。



只需新增：



\- Adapter

\- Mapping



即可支援新資料來源。



這是 Canonical Query 存在的核心價值。

