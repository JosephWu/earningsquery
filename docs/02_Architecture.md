\# Architecture



Version: v1.1



---



\# 1. Architecture Overview



The system follows a layered architecture.



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



Government Website



↓



Structured Result



---



\# 2. Core Design Principle



Canonical Query acts as the single source of truth between user intent and dataset implementations.



This prevents dataset-specific logic from leaking into query understanding.



---



\# 3. Component Overview



\## Synonym Repository



Purpose:



Natural language normalization.



Example:



GG

→ 電子零組件製造業



研究所

→ 碩士



銀行業

→ 銀行業



Output:



Canonical Taxonomy IDs



---



\## Taxonomy Repository



Purpose:



Store canonical concepts.



Examples:



Industry

Education

Gender

Age



Taxonomy is dataset-independent.



---



\## Canonical Query



Purpose:



Unified intermediate representation.



Every adapter consumes Canonical Query.



Every parser produces Canonical Query.



---



\## Adapter Layer



Purpose:



Translate Canonical Query into dataset-specific parameters.



Example:



Canonical Query



↓



薪情探索 URL Parameters



---



\# 4. Data Flow Example



Query:



GG碩士男生薪資



Step 1



Find synonyms:



GG

→ I024



碩士

→ E005



男生

→ G001



Step 2



Generate Canonical Query



{

&nbsp; "dataset": "earnings",

&nbsp; "filters": {

&nbsp;   "industry": \["I024"],

&nbsp;   "education": \["E005"],

&nbsp;   "gender": \["G001"]

&nbsp; }

}



Step 3



Adapter Translation



Canonical Query



↓



薪情探索 Query Parameters



---



\# 5. Repository Structure



knowledge/



taxonomy.csv



synonyms.csv



adapter\_mapping.csv (future)



docs/



Architecture



Roadmap



ADR



tests/



test\_queries.json



---



\# 6. Future Architecture



Current:



Exact Match Retrieval



Future:



Natural Language



↓



Keyword Retrieval



↓



Taxonomy Resolution



↓



Canonical Query



↓



LLM Enhancement (Optional)



↓



Adapter



LLM should enhance retrieval.



LLM should not replace canonical knowledge structures.



---



\# 7. Design Philosophy



Knowledge First



Retrieval Second



AI Third



This minimizes complexity and improves explainability.

