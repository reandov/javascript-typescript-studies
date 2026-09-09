type Callback<Args extends unknown[]> = (...args: Args) => void;

export function debounce<Args extends unknown[]>(
  callback: Callback<Args>,
  delay = 1000,
): Callback<Args> {
  let timeoutId: number | undefined;

  return (...args) => {
    if (timeoutId !== undefined) {
      window.clearTimeout(timeoutId);
    }

    timeoutId = window.setTimeout(() => callback(...args), delay);
  };
}

export function throttle<Args extends unknown[]>(
  callback: Callback<Args>,
  delay = 1000,
): Callback<Args> {
  let shouldWait = false;
  let trailingArgs: Args | null = null;

  function release(): void {
    if (trailingArgs === null) {
      shouldWait = false;
      return;
    }

    const args = trailingArgs;
    trailingArgs = null;
    callback(...args);
    window.setTimeout(release, delay);
  }

  return (...args) => {
    if (shouldWait) {
      trailingArgs = args;
      return;
    }

    callback(...args);
    shouldWait = true;
    window.setTimeout(release, delay);
  };
}
