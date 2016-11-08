"use strict";

import {applyMiddleware, createStore} from 'redux';
import createLogger from 'redux-logger';

export default rootReducer => createStore(
    rootReducer,
    applyMiddleware(createLogger())
);