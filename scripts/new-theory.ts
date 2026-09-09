import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toTitle(slug: string): string {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

async function createTheoryNote(): Promise<void> {
  const name = process.argv.slice(2).join(" ");
  const slug = slugify(name);

  if (!slug) {
    throw new Error('Provide a theory topic, for example: npm run new-theory -- "Sliding Window"');
  }

  const title = toTitle(slug);
  const directory = path.join(process.cwd(), "studies", "dsa", "theory", slug);
  const notePath = path.join(directory, "README.md");

  await mkdir(directory, { recursive: false });

  const note = `# ${title}

## Mental Model

TODO: Explain the concept in practical terms.

## When To Use It

TODO: List problem signals that suggest this topic.

## Common Pitfalls

TODO: Capture mistakes to avoid.

## Complexity Notes

TODO: Explain typical time and space tradeoffs.

## Related Code

TODO: Link algorithms, data structures, and solved problems in this repository.
`;

  await writeFile(notePath, note, { flag: "wx" });

  console.log(`Created studies/dsa/theory/${slug}/README.md`);
}

createTheoryNote().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Could not create theory note: ${message}`);
  process.exitCode = 1;
});
