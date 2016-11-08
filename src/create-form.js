"use strict";

import createSelectors from './create-selectors';
import createActionCreators from './create-action-creators';
import createConnectors from './create-connectors';
import createReducer from './create-reducer';

export default formType => {
    const selectors = createSelectors(formType);
    const actionCreators = createActionCreators(formType);

    return {
        selectors,
        actionCreators,
        connectors: createConnectors(selectors, actionCreators),
        reducer: createReducer(formType)
    };
};
