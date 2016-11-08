"use strict";

const defaultValueMap = new Map([
    ['string', ''],
    ['number', 0],
    ['boolean', false]
]);

const createFieldSelector = callback => fieldName => fieldName ?
    state => callback(fieldName, state) : (state, ownProps) => callback(ownProps.fieldName, state);

const doesFieldExist = (formType, fieldName) =>
    Boolean(formType && formType.fields && formType.fields[fieldName] && formType.fields[fieldName]);

const getFieldType = (formType, fieldName) =>
    formType.fields[fieldName].type ? formType.fields[fieldName].type : 'string';

const getFieldValidators = (formType, fieldName) =>
    Array.isArray(formType.fields[fieldName].validators) ? formType.fields[fieldName].validators : [];

const getFieldDefaultValue = (formType, fieldName) => {
    if ('defaultValue' in formType.fields[fieldName]) {
        return formType.fields[fieldName].defaultValue
    } else {
        const fieldType = getFieldType(formType, fieldName);
        return defaultValueMap.has(fieldType) ? defaultValueMap.get(fieldType) : '';
    }
};

const getFieldValue = (formState, fieldName) => formState && formState[fieldName] && formState[fieldName].value;

const getFieldActive = (formState, fieldName) => Boolean(
    formState && formState[fieldName] && formState[fieldName].active
);

const getFieldTouched = (formState, fieldName) => Boolean(
    formState && formState[fieldName] && formState[fieldName].touched
);

const getFieldError = (formType, formState, fieldName) => {
    const value = getFieldValue(formState, fieldName);

    return getFieldValidators(formType, fieldName).reduce(
        (error, validator) => error || validator(value),
        undefined
    );
};

export default formType => ({
    fieldValueSelector: createFieldSelector((fieldName, state) => {
        if (!doesFieldExist(formType, fieldName)) {
            return undefined;
        }
        const value = getFieldValue(formType.selector(state), fieldName);

        return typeof value !== 'undefined' ? value : getFieldDefaultValue(formType, fieldName);
    }),
    fieldTouchedSelector: createFieldSelector((fieldName, state) =>
        Boolean(doesFieldExist(formType, fieldName) && getFieldTouched(formType.selector(state), fieldName))
    ),
    fieldActiveSelector: createFieldSelector((fieldName, state) =>
        Boolean(doesFieldExist(formType, fieldName) && getFieldActive(formType.selector(state), fieldName))
    ),
    fieldErrorSelector: createFieldSelector((fieldName, state) =>
        doesFieldExist(fieldName) ? getFieldError(formType, formType.selector(state), fieldName) : undefined
    ),
    formValidSelector: state => {
        const formState = formType.selector(state);
        return Object.keys(formType.fields).every(fieldName => !getFieldError(formType, formState, fieldName));
    }
});
