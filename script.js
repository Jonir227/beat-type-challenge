import { join } from "path";

import without from "lodash/without.js";

import {
  getOrCreate,
  findRandomExtinctItems,
  writeSolvedFiles,
  printQuestion,
} from "./utils.js";
import { getResource } from "./assets.js";

export const main = async () => {
  const SOLVED_FILE_PATH = join("./", "data.json");

  const solved = JSON.parse(getOrCreate(SOLVED_FILE_PATH));

  const questions = await getResource();

  const remain = without(questions, ...solved);

  const targets = findRandomExtinctItems(remain, 3);

  targets.forEach(printQuestion);

  writeSolvedFiles(SOLVED_FILE_PATH, solved, targets);

  return targets;
};
