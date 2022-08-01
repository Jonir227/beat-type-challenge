import { $ } from 'zx';
import fs from 'fs';
import path from 'path';

const TYPE_CHALLENGE_URL = 'https://github.com/type-challenges/type-challenges';
const ASSETS_FOLDER = 'assets';
const QUESTION_FOLDER = 'questions';

const updateAssets = async () => {
  if (fs.existsSync(path.join('./', ASSETS_FOLDER))) {
    await $`cd ${ASSETS_FOLDER} && git pull`;
  } else {
    await $`git clone ${TYPE_CHALLENGE_URL} ./${ASSETS_FOLDER}`;
  }
};

export const getResource = async () => {
  await updateAssets();
  return fs.readdirSync(path.join('./', ASSETS_FOLDER, QUESTION_FOLDER));
};
