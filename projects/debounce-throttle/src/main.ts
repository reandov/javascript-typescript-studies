import { debounce, throttle } from "./timing";

const input = document.querySelector<HTMLInputElement>("input");
const defaultText = document.getElementById("default");
const debounceText = document.getElementById("debounce");
const throttleText = document.getElementById("throttle");

if (!input || !defaultText || !debounceText || !throttleText) {
  throw new Error("The debouncer demo is missing one or more required elements.");
}

const updateDebounceText = debounce((text: string) => {
  debounceText.textContent = text;
});

const updateThrottleText = throttle((text: string) => {
  throttleText.textContent = text;
});

input.addEventListener("input", () => {
  const text = input.value;

  defaultText.textContent = text;
  updateDebounceText(text);
  updateThrottleText(text);
});
