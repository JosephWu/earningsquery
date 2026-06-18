import fs from "fs";

export function parseCsv(
  path: string
): string[][] {

  const content =
    fs.readFileSync(
      path,
      "utf8"
    );

  return content
    .trim()
    .split(/\r?\n/)
    .map(row => row.split(","));
}
