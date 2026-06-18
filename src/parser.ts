import {
  parseCsv
} from "./csv";

import {
  SynonymRow
} from "./types";

import {
  QueryParser
} from "./query-parser";

function loadSynonyms(
  path: string
): SynonymRow[] {

  const rows =
    parseCsv(path);

  return rows
    .slice(1)
    .map(row => {

      const [
        id,
        domain,
        keyword,
        target_id
      ] = row;

      return {

        id,
        domain,
        keyword,
        target_id

      };
    });
}

export function createParser() {

  const synonyms =
    loadSynonyms(
      "./knowledge/synonym.csv"
    );

  return new QueryParser(
    synonyms
  );
}