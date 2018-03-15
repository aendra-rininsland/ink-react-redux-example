/**
 * @file
 * Redux actions
 */

import { Story } from "inkjs";
import storyContent from "../cyberian-bot-farmer.json";
// import storyContent from "../basic.json";

export const ink = new Story(storyContent);

export const MAKE_CHOICE = "MAKE_CHOICE";

export const makeChoice = choiceIdx => {
  ink.ChooseChoiceIndex(choiceIdx);

  try {
    const gameData = gameLoop();
    return {
      type: MAKE_CHOICE,
      ...gameData
    };
  } catch (e) {
    if (e instanceof GameOverError && e.reason === "no more choices") {
      return {
        type: MAKE_CHOICE,
        ending: true
      };
    }

    throw e;
  }
};

export const gameLoop = () => {
  const sceneText = [];
  let currentTags = [];

  while (ink.canContinue) {
    sceneText.push(ink.Continue());
    currentTags = currentTags.concat(ink.currentTags);
  }

  const { currentChoices, variablesState } = ink;

  if (!ink.canContinue && !currentChoices.length)
    throw new GameOverError("no more choices");

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

// Babel really doesn't like custom errors
function GameOverError(reason = "", ...rest) {
  var instance = new Error(`Game Over, ${reason}`, ...rest);
  instance.reason = reason;
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, GameOverError);
  }
  return instance;
}

GameOverError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true
  }
});

if (Object.setPrototypeOf) {
  Object.setPrototypeOf(GameOverError, Error);
} else {
  GameOverError.__proto__ = Error;
}
