\# Test Strategy



Version: v1.1



---



\# Purpose



驗證：



Query



↓



Synonym Resolution



↓



Taxonomy Resolution



↓



Canonical Query



是否正確運作。



---



\# Category A - Exact Match



預期：



100% 成功。



案例：



\- GG碩士男生薪資

\- 金融業薪資

\- 銀行業女性薪資

\- 半導體薪資

\- 研究所男生薪資



---



\# Category B - Multi-Select



預期：



能解析多個 Taxonomy IDs。



案例：



\- 金融業與科技業薪資

\- 銀行業與保險業薪資

\- 電子業與金融業碩士薪資



---



\# Category C - Intent Not Supported



預期：



Taxonomy 成功解析。



Intent 放入 unresolved\_terms。



案例：



\- 近五年金融業薪資

\- 科技業薪資趨勢

\- 最高薪產業

\- 未來十年金融業



---



\# Category D - False Positive Prevention



預期：



不要誤判。



案例：



科技大學學費



不應解析：



科技業



---



案例：



金融卡遺失



不應解析：



金融業



---



案例：



銀行帳戶開戶



不應解析：



銀行業



---



\# Category E - Ambiguous Terms



預期：



符合 ADR-013。



案例：



女性保全月薪



輸出：



Industry Taxonomy



並保留 Warning。



---



\# Success Metrics



Phase 1



Category A



100%



---



Phase 2



Category B



100%



---



Phase 3



Category C



Taxonomy 正確率 > 95%



---



Phase 4



Category D



False Positive 越低越好



---



\# Regression Testing



每次修改：



\- taxonomy.csv

\- synonyms.csv

\- parser



都應重新執行測試。



避免功能退化。



---



\# Future Test Categories



F. Synonym Expansion



G. Fuzzy Matching



H. Multi-Dataset Query



I. Time-Series Analysis



J. Ranking \& Comparison

