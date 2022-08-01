import fs from "fs";
import chalk from "chalk";
import lodash from "lodash";

const { groupBy, mapValues, sampleSize } = lodash;

const readFileSync = (path) => fs.readFileSync(path, { encoding: "utf-8" });

export const getOrCreate = (path) => {
  try {
    return readFileSync(path);
  } catch (e) {
    fs.writeFileSync(path, "[]");
    return readFileSync(path);
  }
};

export const writeSolvedFiles = (path, prevSolvedArray, currSolvedArray) => {
  fs.writeFileSync(
    path,
    JSON.stringify([...prevSolvedArray, ...currSolvedArray].sort())
  );
};

const DifficultyColors = {
  warm: "008080",
  easy: "7aad0c",
  medium: "d9901a",
  hard: "de3d37",
  extreme: "b11b8d",
};

export const findRandomExtinctItems = (items, count) => {
  const targets = new Set();
  const levelMap = mapValues(
    groupBy(items, (item) => item.split("-")[1]),
    (items) => sampleSize(items, count)
  );
  const levels = Object.keys(DifficultyColors);

  let levelIdx = 0;

  while (
    targets.size < count &&
    Object.values(levelMap).some((v) => v.length)
  ) {
    const levelQuestions = levelMap[levels[levelIdx]];

    levelQuestions?.length > 0 && targets.add(levelQuestions.shift());

    levelIdx = (levelIdx + 1) % levels.length;
  }

  return Array.from(targets);
};

const getQuestionUrl = (id) => `https://tsch.js.org/${id}/play/ko`;

export const printQuestion = (question) => {
  const [id, difficulty, name] = question.split("-");

  console.log(
    `${chalk.bgHex(DifficultyColors[difficulty])(
      `[${difficulty}]`
    )} ${name} : ${getQuestionUrl(parseInt(id, 10))}`
  );
};
