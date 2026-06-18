# Canonical Query Specification

Version: v1.1

---

# 1. Purpose

Canonical Query is the intermediate representation between:

User Intent

and

Dataset-Specific Implementations

---

# 2. Design Goals

- Dataset independent
- Adapter friendly
- Multi-select capable
- Explainable
- Serializable

---

# 3. Current Schema

```json
{
  "dataset": "earnings",
  "filters": {
    "industry": [],
    "education": [],
    "gender": [],
    "age": []
  }
}
```

# 4. Filter Rules

All filters are arrays.

Reason:

Some datasets support multi-select.

Example:

```json
{
  "industry": [
    "I080",
    "I024"
  ]
}
```

# 5. Unresolved Terms

PoC supports unresolved_terms.

Example:

Input:

近五年金融業薪資

Output:

```json
{
  "filters": {
    "industry": ["I080"]
  },
  "unresolved_terms": [
    "近五年"
  ]
}
```

# 6. Future Extensions

Future schema may include:

```json
{
  "analysis": {},
  "comparison": {},
  "time_range": {}
}
```

Example:

```json
{
  "time_range": {
    "last_n_years": 5
  }
}
```

# 7. Canonical Query Lifecycle

User Query

↓

Taxonomy Resolution

↓

Canonical Query

↓

Adapter

↓

Dataset Request

Canonical Query should never contain:

- Website-specific values
- HTML selectors
- Dataset internal codes

Those belong to adapters.

# 8. Example Queries

Example A

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

Example B

```json
{
  "dataset": "earnings",
  "filters": {
    "industry": [
      "I024",
      "I080"
    ]
  }
}
```

# 9. Design Principle

Canonical Query is the contract between:

Parser

and

Adapter

Both sides evolve independently.