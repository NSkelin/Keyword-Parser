import type {Display} from "@/components/KeywordDisplayCollection";
import {generateMockKeywords, getMockKeywords} from "./keywords";

/**
 * Gets mock displays for use.
 *
 * @param batches The amount of displays to get.
 */
export function getMockDisplays(batches: number) {
  const displays = [];

  for (let i = 0; i < batches; i++) {
    displays.push(createMockDisplay(`Display ${i}`, "lightblue", getMockKeywords));
  }

  return displays;
}

/**
 * Similar to getMockDisplays but the displays are generated based on the parameters to create easily testable displays.
 *
 * @param batches The amount of displays to generate.
 * @param keywordsPerBatch The amount of keywords inside each display.
 */
export function generateMockDisplays(batches: number, keywordsPerBatch = 5) {
  const displays = [];

  for (let i = 1; i <= batches; i++) {
    displays.push(createMockDisplay(`Display ${i}`, "lightblue", () => generateMockKeywords(i, keywordsPerBatch)));
  }

  return displays;
}

function createMockDisplay(
  title: Display["title"],
  highlightColor: Display["highlightColor"],
  getKeywords: () => Display["keywords"],
) {
  const display: Display = {
    title,
    highlightColor,
    keywords: getKeywords(),
  };
  return display;
}
