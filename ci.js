import { main } from "./script.js";
import { getQuestionUrl } from "./utils.js";

export const createIssue = async ({ github, context }) => {
  const questions = await main();

  return github.rest.issues.create({
    owner: context.repo.owner,
    repo: context.repo.repo,
    title: `${new Date().toISOString().split("T")[0]} 문제`,
    body: `
# 오늘의 문제

${questions
  .map((question, i) => {
    const [id, level] = question.split("-");

    return `${i + 1}. ${level.toUpperCase()}: [${question}](${getQuestionUrl(
      Number(id)
    )})`;
  })
  .join("\n")}
    `,
  });
};
