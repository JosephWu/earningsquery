import {
  SynonymRow,
  CanonicalQuery
} from "./types";

export class QueryParser {

  constructor(
    private synonyms: SynonymRow[]
  ) {

    this.synonyms.sort(

      (a, b) =>
        b.keyword.length -
        a.keyword.length

    );

  }

  parse(
    query: string
  ): CanonicalQuery {

    const filters = {
      industry: new Set<string>(),
      education: new Set<string>(),
      gender: new Set<string>(),
      age: new Set<string>()
    };

    const matchedKeywords =
      new Set<string>();

    for (
      const synonym
      of this.synonyms
    ) {

      if (
        query.includes(
          synonym.keyword
        )
      ) {

        matchedKeywords.add(
          synonym.keyword
        );

        switch (
          synonym.domain
        ) {

          case "industry":

            filters.industry.add(
              synonym.target_id
            );

            break;

          case "education":

            filters.education.add(
              synonym.target_id
            );

            break;

          case "gender":

            filters.gender.add(
              synonym.target_id
            );

            break;

          case "age":

            filters.age.add(
              synonym.target_id
            );

            break;
        }
      }
    }

    return {

      dataset: "earnings",

      filters: {

        industry: [
          ...filters.industry
        ],

        education: [
          ...filters.education
        ],

        gender: [
          ...filters.gender
        ],

        age: [
          ...filters.age
        ]
      },

      unresolved_terms:
        this.extractUnresolvedTerms(
          query,
          matchedKeywords
        )
    };
  }

  private extractUnresolvedTerms(
    query: string,
    matchedKeywords: Set<string>
  ): string[] {

    let remaining =
      query;

    for (
      const keyword
      of matchedKeywords
    ) {

      remaining =
        remaining.replaceAll(
          keyword,
          " "
        );
    }

    return remaining
      .split(/\s+/)
      .map(x => x.trim())
      .filter(Boolean);
  }
}