import fs from 'fs';
import chalk, { Chalk } from 'chalk';

const readFileSync = (path) => fs.readFileSync(path, { encoding: 'utf-8' });

export const getOrCreate = (path) => {
  try {
    return readFileSync(path);
  } catch (e) {
    fs.writeFileSync(path, '[]');
    return readFileSync(path);
  }
};

export const writeSolvedFiles = (path, prevSolvedArray, currSolvedArray) => {
  fs.writeFileSync(
    path,
    JSON.stringify([...prevSolvedArray, ...currSolvedArray].sort())
  );
};

export const findRandomExtinctItems = (items, count) => {
  const targets = new Set();
  while (targets.size < count) {
    const value = items[Math.floor(Math.random() * items.length)];
    targets.has(value) || targets.add(value);
  }
  return Array.from(targets);
};

const getQuestionUrl = (id) => `https://tsch.js.org/${id}/play/ko`;

const DifficultyColors = {
  warm: '008080',
  easy: '7aad0c',
  medium: 'd9901a',
  hard: 'de3d37',
  extreme: 'b11b8d',
};

export const printQuestion = (question) => {
  const [id, difficulty, name] = question.split('-');

  console.log(
    `${chalk.bgHex(DifficultyColors[difficulty])(
      `[${difficulty}]`
    )} ${name} : ${getQuestionUrl(parseInt(id, 10))}`
  );
};
