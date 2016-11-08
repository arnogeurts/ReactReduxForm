"use strict";

import React, {PureComponent, PropTypes} from 'react';
import AuthForm from './auth-form';
import InputField from '../base/input-field';
import BaseSubmitButton from '../base/submit-button';

const UsernameField = AuthForm.connectors.field('username')(InputField);
const PasswordField = AuthForm.connectors.field('password')(InputField);
const SubmitButton = AuthForm.connectors.validator(BaseSubmitButton);

export default class Layout extends PureComponent {

    constructor(...args) {
        super(...args);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        alert('hurray');
    }

    render() {
        return (
            <form>
                <UsernameField id="username" label="Username"/>
                <PasswordField type="password" id="password" label="Password"/>
                <SubmitButton handleSubmit={this.handleSubmit} label="Submit"/>
            </form>
        );
    }

}