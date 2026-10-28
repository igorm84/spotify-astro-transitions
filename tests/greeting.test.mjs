import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const component = readFileSync(
  new URL("../src/components/GreetingTitle.astro", import.meta.url),
  "utf8",
);
const script = component.match(/<script>([\s\S]*?)<\/script>/)[1];

function createHarness(initialHour) {
  let hour = initialHour;
  let heading = { textContent: "Welcome back" };
  const listeners = new Map();
  vm.runInNewContext(script, {
    document: {
      getElementById: () => heading,
      addEventListener: (name, callback) => listeners.set(name, callback),
    },
    Date: class extends Date {
      getHours() {
        return hour;
      }
    },
  });
  return {
    getHeading: () => heading,
    navigate(nextHour, hasHeading) {
      hour = nextHour;
      heading = hasHeading ? { textContent: "Welcome back" } : null;
      listeners.get("astro:page-load")();
    },
  };
}

test.each([
  [0, "Good night"],
  [4, "Good night"],
  [5, "Good morning"],
  [11, "Good morning"],
  [12, "Good afternoon"],
  [17, "Good afternoon"],
  [18, "Good night"],
  [23, "Good night"],
])("visitor-local hour %i displays %s", (hour, expected) => {
  const harness = createHarness(hour);
  expect(harness.getHeading().textContent).toBe(expected);
});

test("static HTML has a greeting independent of the build time", () => {
  expect(component).toMatch(/<h1[^>]*>\s*Welcome back\s*<\/h1>/);
});

test("home to playlist to home refreshes the visitor-local greeting", () => {
  const harness = createHarness(11);
  expect(harness.getHeading().textContent).toBe("Good morning");
  harness.navigate(12, false);
  expect(harness.getHeading()).toBeNull();
  harness.navigate(12, true);
  expect(harness.getHeading().textContent).toBe("Good afternoon");
});
