/**
 * @file
 * Redux reducers
 */

import { gameLoop, MAKE_CHOICE } from "./actions";

export const INITIAL_STATE = {
  ending: false,
  ...gameLoop()
};

export default (state = INITIAL_STATE, { type, ...action }) => {
  switch (type) {
    case MAKE_CHOICE:
      return {
        ...state,
        ...action
      };

    default:
      return state;
  }
};
