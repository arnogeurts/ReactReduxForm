"use strict";

import * as actions from './action-types';

const updateField = (state, fieldName, object) => ({
    ...state,
    [fieldName]: {
        ...state[fieldName],
        ...object
    }
});

const focusField = (state, action) => updateField(state, action.fieldName, {active: true, touched: true});

const blurField = (state, action) => updateField(state, action.fieldName, {active: false, touched: true});

const changeField = (state, action) => updateField(state, action.fieldName, {value: action.value, touched: true});

const loadValues = (state, action) => Object.keys(action.values).reduce(
    (state, fieldName) => {
        state[fieldName] = {
            ...state[fieldName],
            value: action.values[fieldName]
        };

        return state;
    },
    {...state}
);

const validate = (state, action) => Object.keys(action.formType.fields).reduce(
    (state, fieldName) => {
        state[fieldName] = {
            ...state[fieldName],
            touched: true
        };

        return state;
    },
    {...state}
);

const reset = () => ({});

const actionMap = {
    [actions.FORM_FOCUS_FIELD]: focusField,
    [actions.FORM_BLUR_FIELD]: blurField,
    [actions.FORM_CHANGE_FIELD]: changeField,
    [actions.FORM_LOAD_VALUES]: loadValues,
    [actions.FORM_VALIDATE]: validate,
    [actions.FORM_RESET]: reset
};

export default formType => (state = {}, action) => action.type in actionMap && action.formType.name === formType.name ?
    actionMap[action.type](state, action) : state;

