import { mapLimit } from "./map-limit";

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function main() {
  const results = await mapLimit([1, 2, 3, 4, 5, 6, 7, 8, 9], 2, async (value, index) => {
    const delay = Math.floor(Math.random() * 10_001);

    console.log(`START  | index=${index} | value=${value} | delay=${delay}ms`);

    await sleep(delay);

    console.log(`FINISH | index=${index} | value=${value} | delay=${delay}ms`);

    return value * 2;
  });

  console.log("Final results:", results);
}

main();
