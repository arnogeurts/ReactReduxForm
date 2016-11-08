"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import createStore from '../base/create-store';
import AuthForm from './auth-form';
import Layout from './layout';

ReactDOM.render(
    <Provider store={createStore(AuthForm.reducer)}>
        <Layout/>
    </Provider>,
    document.getElementById('app')
);
