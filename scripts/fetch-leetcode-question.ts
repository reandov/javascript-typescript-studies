type CodeSnippet = {
  langSlug: string;
  code: string;
};

type Question = {
  questionId: string;
  questionFrontendId: string;
  title: string;
  titleSlug: string;
  content: string;
  exampleTestcases: string;
  codeSnippets: CodeSnippet[];
};

type QuestionResponse = {
  data?: {
    question?: Question | null;
  };
  errors?: Array<{ message: string }>;
};

const input = process.argv[2];

if (!input) {
  throw new Error("Provide a LeetCode problem URL.");
}

const url = new URL(input);
const host = url.hostname.toLowerCase().replace(/^www\./, "");
const slugMatch = url.pathname.match(/^\/problems\/([^/]+)(?:\/|$)/);

if (url.protocol !== "https:" || host !== "leetcode.com" || !slugMatch) {
  throw new Error(
    "Expected an HTTPS LeetCode problem URL, for example https://leetcode.com/problems/two-sum/.",
  );
}

const requestedSlug = slugMatch[1];
const query = `
  query questionEditorData($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
      questionId
      questionFrontendId
      title
      titleSlug
      content
      exampleTestcases
      codeSnippets {
        langSlug
        code
      }
    }
  }
`;

const response = await fetch("https://leetcode.com/graphql/", {
  method: "POST",
  headers: {
    "content-type": "application/json",
  },
  body: JSON.stringify({
    query,
    variables: { titleSlug: requestedSlug },
  }),
});

if (!response.ok) {
  throw new Error(`LeetCode metadata request failed: ${response.status} ${response.statusText}`);
}

const payload = (await response.json()) as QuestionResponse;

if (payload.errors?.length) {
  throw new Error(
    `LeetCode metadata request failed: ${payload.errors.map((error) => error.message).join("; ")}`,
  );
}

const question = payload.data?.question;

if (!question) {
  throw new Error(`LeetCode problem not found: ${requestedSlug}`);
}

const typescriptSnippet = question.codeSnippets.find(
  (snippet) => snippet.langSlug === "typescript",
);

if (!typescriptSnippet) {
  throw new Error(`No TypeScript starter exists for: ${question.titleSlug}`);
}

console.log(
  JSON.stringify(
    {
      questionId: question.questionId,
      frontendId: question.questionFrontendId,
      title: question.title,
      slug: question.titleSlug,
      canonicalUrl: `https://leetcode.com/problems/${question.titleSlug}/`,
      typescriptStarter: typescriptSnippet.code,
      exampleTestcases: question.exampleTestcases,
      content: question.content,
    },
    null,
    2,
  ),
);
