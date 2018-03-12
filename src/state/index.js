/**
 * @file
 * Redux store
 */

import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import inkGame, { INITIAL_STATE } from "./reducers";

export default createStore(inkGame, INITIAL_STATE, devToolsEnhancer());
