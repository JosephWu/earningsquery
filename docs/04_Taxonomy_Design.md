\# Taxonomy Design



Version: v1.1



---



\# 1. Purpose



Taxonomy Repository stores canonical concepts used across all datasets.



It represents business knowledge rather than dataset-specific implementation details.



---



\# 2. Repository File



taxonomy.csv



---



\# 3. Schema



| Column | Description |

|----------|----------|

| id | Unique taxonomy identifier |

| domain | Taxonomy domain |

| name | Canonical display name |

| parent\_id | Parent taxonomy node |



Example:



| id | domain | name | parent\_id |

|------|------|------|------|

| I001 | industry | 製造業 | |

| I024 | industry | 電子零組件製造業 | I001 |



---



\# 4. Domains



Current domains:



\## Industry



Prefix:



I



Example:



I024



---



\## Education



Prefix:



E



Example:



E005



---



\## Gender



Prefix:



G



Example:



G001



---



\## Age



Prefix:



A



Example:



A003



---



\## Region (Planned)



Prefix:



R



Example:



R001



---



\# 5. Tree Structure



Taxonomy uses a forest structure.



parent\_id references another taxonomy node.



Example:



製造業



└── 電子零組件製造業



└── 金屬製品製造業



Root nodes:



parent\_id = empty



No root\_id column is required.



---



\# 6. Industry Taxonomy Strategy



Current PoC Source:



薪情探索網站實際產業分類



Reason:



\- Faster validation

\- Matches actual dataset

\- Lower implementation complexity



---



\# 7. Future Migration Strategy



Future canonical taxonomy:



行政院主計總處



行業標準分類



第11次修訂



Migration approach:



Phase 1



薪情探索分類



↓



Phase 2



Map to DGBAS Classification



↓



Phase 3



Use DGBAS Classification as Canonical Taxonomy



---



\# 8. Why Not Use Full DGBAS Today?



Reasons:



1\. Larger taxonomy size

2\. More maintenance effort

3\. Not required for PoC

4\. Retrieval already solves scaling concerns



---



\# 9. Retrieval Strategy



Taxonomy is not injected into every prompt.



Instead:



User Query



↓



Retrieval



↓



Relevant Taxonomy Nodes



↓



Parser



This avoids token explosion.



---



\# 10. Taxonomy Governance



Taxonomy should be:



\- Stable

\- Explainable

\- Human editable

\- Version controlled



Google Sheets may be used as authoring tool.



CSV remains the canonical storage format.



---



\# 11. Design Principle



Taxonomy represents knowledge.



Adapters represent implementation.



These concerns should remain separate.

