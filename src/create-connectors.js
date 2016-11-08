"use strict";

import {createStructuredSelector} from 'reselect';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const createMapStateToPropsForField = (fieldName, selectors) => createStructuredSelector({
    value: selectors.fieldValueSelector(fieldName),
    touched: selectors.fieldTouchedSelector(fieldName),
    active: selectors.fieldActiveSelector(fieldName),
    error: selectors.fieldErrorSelector(fieldName)
});

const createActionCreatorsForField = (fieldName, actionCreators) => ({
    handleFocus: actionCreators.focusField.bind(undefined, fieldName),
    handleBlur: actionCreators.blurField.bind(undefined, fieldName),
    handleChange: actionCreators.changeField.bind(undefined, fieldName)
});

const createMapDispatchToPropsForField = (fieldName, actionCreators) => fieldName ?
    createActionCreatorsForField(fieldName, actionCreators) :
    (dispatch, ownProps) => bindActionCreators(
        createActionCreatorsForField(ownProps.fieldName, actionCreators),
        dispatch
    );

const createMapStateToPropsForValidator = selectors => createStructuredSelector({
    valid: selectors.formValidSelector
});

const createMapDispatchToPropsForValidator = actionCreators => ({
    handleValidate: actionCreators.validate
});

export default (selectors, actionCreators) => ({
    field: fieldName => connect(
        createMapStateToPropsForField(fieldName, selectors),
        createMapDispatchToPropsForField(fieldName, actionCreators)
    ),
    validator: connect(
        createMapStateToPropsForValidator(selectors),
        createMapDispatchToPropsForValidator(actionCreators)
    )

});