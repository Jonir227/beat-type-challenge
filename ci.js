import { main } from "./script.js";
import { getQuestionUrl } from "./utils.js";

export const createIssue = async ({ github, context }) => {
  const questions = await main();
  const assignees = ["Godsenal", "Jonir227"];

  return github.rest.issues.create({
    owner: context.repo.owner,
    repo: context.repo.repo,
    assignees,
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

### 아래 템플릿을 복사하여 사용하세요.
\`\`\`
${questions
  .map((question, i) => `${i + 1}. [${question}](링크입력)`)
  .join("\n")}
\`\`\`
  `,
  });
};
