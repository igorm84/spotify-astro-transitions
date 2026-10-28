import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import vm from "node:vm";

// Execute the script shipped by the layout instead of a duplicate implementation.
const layout = readFileSync(
  new URL("../src/layouts/Layout.astro", import.meta.url),
  "utf8",
);
const script = layout.match(/<script>([\s\S]*?)<\/script>/)[1];
const javascript = new Bun.Transpiler({ loader: "ts" }).transformSync(script);

function createHarness() {
  const timers = new Map();
  const documentListeners = new Map();
  let timerId = 0;
  let playlists = [];
  const colors = [];
  const container = {
    dataset: {},
    style: { setProperty: (_name, color) => colors.push(color) },
    setAttribute: (_name, color) => (container.dataset.color = color),
  };
  const document = {
    startViewTransition() {},
    getElementById: () => container,
    querySelectorAll: (selector) =>
      selector === ".playlist-item" ? playlists : [],
    addEventListener: (name, callback) => documentListeners.set(name, callback),
  };
  function createPlaylist(color) {
    const listeners = new Map();
    return {
      dataset: { color },
      listeners,
      addEventListener(name, callback) {
        const callbacks = listeners.get(name) || [];
        callbacks.push(callback);
        listeners.set(name, callbacks);
      },
      fire(name) {
        // Accept the old bubbling events to exercise the pre-fix regression too.
        const legacyName = { mouseenter: "mouseover", mouseleave: "mouseout" }[
          name
        ];
        for (const callback of listeners.get(name) ||
          listeners.get(legacyName) ||
          []) {
          callback();
        }
      },
    };
  }
  playlists = [createPlaylist("A"), createPlaylist("B")];
  vm.runInNewContext(javascript, {
    document,
    window: { addEventListener() {} },
    setTimeout(callback) {
      timers.set(++timerId, callback);
      return timerId;
    },
    clearTimeout: (id) => timers.delete(id),
  });
  return {
    colors,
    playlists,
    timers,
    fireDocument: (name) => documentListeners.get(name)(),
    runTimers() {
      for (const [id, callback] of [...timers]) {
        if (!timers.has(id)) continue;
        timers.delete(id);
        callback();
      }
    },
    replacePlaylists() {
      playlists = [createPlaylist("C")];
      return playlists;
    },
  };
}

test("keyboard focus cancels a pending hover color", () => {
  const harness = createHarness();
  harness.playlists[0].fire("mouseenter");
  harness.playlists[1].fire("focus");
  harness.runTimers();
  expect(harness.colors).toEqual(["B"]);
});

test("only the most recent hover can apply its color", () => {
  const harness = createHarness();
  harness.playlists[0].fire("mouseenter");
  harness.playlists[1].fire("mouseenter");
  expect(harness.timers.size).toBe(1);
  harness.runTimers();
  expect(harness.colors).toEqual(["B"]);
});

test("leaving a playlist cancels its delayed color", () => {
  const harness = createHarness();
  harness.playlists[0].fire("mouseenter");
  harness.playlists[0].fire("mouseleave");
  harness.runTimers();
  expect(harness.colors).toEqual([]);
});

test("navigation cancels delayed colors from the previous page", () => {
  const harness = createHarness();
  harness.playlists[0].fire("mouseenter");
  harness.fireDocument("astro:before-swap");
  harness.runTimers();
  expect(harness.colors).toEqual([]);
});

test("page loads initialize new playlists without duplicating listeners", () => {
  const harness = createHarness();
  harness.fireDocument("astro:page-load");
  expect(harness.playlists[0].listeners.get("mouseenter")).toHaveLength(1);
  expect(harness.playlists[0].listeners.has("mouseover")).toBe(false);
  const [playlist] = harness.replacePlaylists();
  harness.fireDocument("astro:page-load");
  playlist.fire("mouseenter");
  harness.runTimers();
  expect(harness.colors).toEqual(["C"]);
});
