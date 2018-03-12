/**
 * @file
 * Redux actions
 */

import { Story } from "inkjs";
import storyContent from "../cyberian-bot-farmer.json";

export const ink = new Story(storyContent);

export const MAKE_CHOICE = "MAKE_CHOICE";

export const makeChoice = choiceIdx => {
  ink.ChooseChoiceIndex(choiceIdx);

  return {
    type: MAKE_CHOICE,
    ...gameLoop()
  };
};

export const gameLoop = () => {
  const sceneText = [];
  let currentTags = [];

  while (ink.canContinue) {
    sceneText.push(ink.Continue());
    currentTags = currentTags.concat(ink.currentTags);
  }

  const { currentChoices, variablesState } = ink;

  return {
    globals: getGlobalVars(variablesState),
    tags: getTags(currentTags),
    currentChoices,
    sceneText,
    currentTags
  };
};

export const getGlobalVars = variablesState =>
  Object.keys(variablesState._globalVariables).reduce(
    (acc, key) => ({
      ...acc,
      [key]: variablesState[key]
    }),
    {}
  );

export const getTags = tags =>
  tags.reduce(
    (acc, tag) => ({ ...acc, [tag.split(": ")[0]]: tag.split(": ")[1] }),
    {}
  );
