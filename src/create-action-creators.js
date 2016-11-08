"use strict";

import * as actionTypes from './action-types';

export default formType => ({
    focusField: fieldName => ({
        type: actionTypes.FORM_FOCUS_FIELD,
        formType,
        fieldName
    }),
    blurField: fieldName => ({
        type: actionTypes.FORM_BLUR_FIELD,
        formType,
        fieldName
    }),
    changeField: (fieldName, value) => ({
        type: actionTypes.FORM_CHANGE_FIELD,
        formType,
        fieldName,
        value
    }),
    loadValues: values => ({
        type: actionTypes.FORM_LOAD_VALUES,
        formType,
        values
    }),
    validate: () => ({
        type: actionTypes.FORM_VALIDATE,
        formType
    }),
    reset: () => ({
        type: actionTypes.FORM_RESET,
        formType
    })
});
