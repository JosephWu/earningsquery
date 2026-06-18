import fs from "fs";

import {
  createParser
} from "./parser";

const parser =
  createParser();

const tests =
  JSON.parse(

    fs.readFileSync(
      "./tests/test_queries.json",
      "utf8"
    )

  );

let passed = 0;

for (
  const test
  of tests
) {

  const result =
    parser.parse(
      test.query
    );

  const expected =
    test.expected;

  let ok = true;

  for (
    const key
    of Object.keys(expected)
  ) {

    const actual =
      result.filters[
        key as keyof typeof result.filters
      ];

    const expect =
      expected[key];

    if (
      JSON.stringify(
        actual.sort()
      ) !==
      JSON.stringify(
        expect.sort()
      )
    ) {

      ok = false;

      break;
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
      result
    );
  }
}

console.log(
  `\nPassed: ${passed}/${tests.length}`
);