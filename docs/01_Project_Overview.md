\# EarningsQuery



Version: v1.1  

Status: PoC Development  

Owner: Joseph Wu



---



\# 1. Project Vision



EarningsQuery aims to become an AI-powered query engine for Taiwan government statistics websites.



Instead of requiring users to navigate multiple government portals and manually configure filters, users should be able to ask questions in natural language:



Examples:



\- GG碩士男生薪資

\- 金融業女性月薪

\- 近五年科技業薪資趨勢

\- 銀行業與保險業薪資比較



The system translates these queries into a canonical representation and retrieves data from one or more government statistical websites.



---



\# 2. Problem Statement



Government statistical platforms expose valuable data but have several limitations:



\- Different websites use different taxonomies

\- Users must understand classification systems

\- Query interfaces are inconsistent

\- Cross-dataset comparison is difficult

\- Natural language search is not supported



The goal of EarningsQuery is to create a unified semantic layer on top of multiple government datasets.



---



\# 3. Initial Target Dataset



Phase 1 focuses on:



薪情探索



https://earnings.dgbas.gov.tw



Reasons:



\- Structured filters

\- Publicly accessible

\- Salary-related data

\- Useful for validating taxonomy design



---



\# 4. Future Dataset Targets



Potential future integrations:



\## Employment \& Unemployment Observatory



就業與失業統計平台



\## Labor Statistics



勞動部相關統計



\## Census Datasets



人口與住宅普查



\## Industry Statistics



產業經濟統計



---



\# 5. High-Level Concept



User Query



↓



Taxonomy Resolution



↓



Canonical Query



↓



Dataset Adapter



↓



Government Website



↓



Structured Result



---



\# 6. Current PoC Goal



Validate the following architecture:



Natural Language



→ Synonym Repository



→ Taxonomy Repository



→ Canonical Query



PoC success does NOT require:



\- LLM reasoning

\- Embeddings

\- Vector database

\- Agent workflows



---



\# 7. Success Criteria



The first PoC is considered successful when:



1\. User query can be parsed

2\. Taxonomy terms can be identified

3\. Canonical Query can be generated

4\. Dataset-specific adapters can consume Canonical Query



Example:



Input:



GG碩士男生薪資



Output:



{

&nbsp; "dataset": "earnings",

&nbsp; "filters": {

&nbsp;   "industry": \["I024"],

&nbsp;   "education": \["E005"],

&nbsp;   "gender": \["G001"]

&nbsp; }

}



---



\# 8. Non-Goals



Not in PoC scope:



\- AI Copilot

\- Semantic ranking

\- Vector search

\- Knowledge graph

\- Multi-agent systems

\- Automatic taxonomy generation



These may be explored after PoC validation.



---



\# 9. Repository



GitHub Repository



https://github.com/JosephWu/earningsquery



Deployment Target



Vercel



---



\# 10. Guiding Principle



Prefer simple and deterministic solutions first.



Validate knowledge modeling before optimizing retrieval.



Validate retrieval before introducing AI.

