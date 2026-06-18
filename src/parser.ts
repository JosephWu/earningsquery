/**
 * EarningsQuery Parser
 *
 * PoC v0.1
 *
 * 功能：
 * 1. 讀取 synonyms.csv
 * 2. Query 關鍵字比對
 * 3. 轉換成 Canonical Query
 * 4. 支援 Multi-Select
 * 5. 支援 unresolved_terms
 *
 * 不做：
 * - AI
 * - Embedding
 * - Database
 * - Fuzzy Match
 */

import fs from "fs";

/**
 * synonym.csv 每一列
 */
type SynonymRow = {
  id: string;
  domain: string;
  keyword: string;
  target_id: string;
};

/**
 * 系統內部統一格式
 */
type CanonicalQuery = {
  dataset: string;

  filters: {
    industry: string[];
    education: string[];
    gender: string[];
    age: string[];
  };

  unresolved_terms: string[];
};

/**
 * 讀 CSV
 *
 * PoC 版本直接 split(",")
 * 之後若有複雜 CSV 再升級
 */
function loadSynonyms(
  filePath: string
): SynonymRow[] {

  const csv =
    fs.readFileSync(
      filePath,
      "utf8"
    );

  const rows =
    csv
      .trim()
      .split(/\r?\n/);

  const result: SynonymRow[] = [];

  for (const row of rows.slice(1)) {

    const [
      id,
      domain,
      keyword,
      target_id
    ] = row.split(",");

    result.push({
      id,
      domain,
      keyword,
      target_id
    });
  }

  /**
   * Longest Match First
   *
   * 金融及保險業
   * 金融業
   * 金融
   *
   * 優先匹配較長關鍵字
   */
  result.sort(
    (a, b) =>
      b.keyword.length -
      a.keyword.length
  );

  return result;
}

/**
 * 核心 Parser
 */
function parseQuery(
  query: string,
  synonyms: SynonymRow[]
): CanonicalQuery {

  const industry =
    new Set<string>();

  const education =
    new Set<string>();

  const gender =
    new Set<string>();

  const age =
    new Set<string>();

  /**
   * 記錄已匹配關鍵字
   * 用來推導 unresolved_terms
   */
  const matchedKeywords =
    new Set<string>();

  for (
    const synonym
    of synonyms
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

          industry.add(
            synonym.target_id
          );

          break;

        case "education":

          education.add(
            synonym.target_id
          );

          break;

        case "gender":

          gender.add(
            synonym.target_id
          );

          break;

        case "age":

          age.add(
            synonym.target_id
          );

          break;
      }
    }
  }

  /**
   * 產生 unresolved_terms
   *
   * 例如：
   *
   * GG碩士男生薪資
   *
   * GG
   * 碩士
   * 男生
   *
   * 已解析
   *
   * 剩：
   * 薪資
   */
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

  const unresolvedTerms =
    remaining
      .split(/\s+/)
      .map(x => x.trim())
      .filter(Boolean);

  return {

    dataset: "earnings",

    filters: {

      industry: [
        ...industry
      ],

      education: [
        ...education
      ],

      gender: [
        ...gender
      ],

      age: [
        ...age
      ]
    },

    unresolved_terms:
      unresolvedTerms
  };
}

/**
 * 測試入口
 *
 * node parser.js
 */
function main() {

  const synonyms =
    loadSynonyms(
      "./knowledge/synonyms.csv"
    );

  const testQueries =
    JSON.parse(

      fs.readFileSync(
        "./tests/test_queries.json",
        "utf8"
      )

    );

  let passed = 0;

  for (
    const test
    of testQueries
  ) {

    const result =
      parseQuery(
        test.query,
        synonyms
      );

    let ok = true;

    if (
      test.expected
    ) {

      for (
        const key
        of Object.keys(
          test.expected
        )
      ) {

        const actual =
          result.filters[
            key as keyof typeof result.filters
          ];

        const expected =
          test.expected[
            key
          ];

        if (
          JSON.stringify(
            actual.sort()
          ) !==
          JSON.stringify(
            expected.sort()
          )
        ) {

          ok = false;
          break;
        }
      }
    }

    if (ok) {

      passed++;

      console.log(
        `✓ ${test.query}`
      );

    } else {

      console.log(
        `✗ ${test.query}`
      );

      console.log(
        JSON.stringify(
          result,
          null,
          2
        )
      );
    }
  }

  console.log(
    `\nPassed ${passed}/${testQueries.length}`
  );
}

main();
