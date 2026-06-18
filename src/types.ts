export type TaxonomyRow = {
  id: string;
  domain: string;
  name: string;
  parent_id?: string;
};

export type SynonymRow = {
  id: string;
  domain: string;
  keyword: string;
  target_id: string;
};

export type CanonicalQuery = {
  dataset: string;

  filters: {
    industry: string[];
    education: string[];
    gender: string[];
    age: string[];
  };

  unresolved_terms: string[];
};