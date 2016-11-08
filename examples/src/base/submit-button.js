"use strict";

import React, {PureComponent, PropTypes} from 'react';

export default class SubmitButton extends PureComponent {

    static propTypes = {
        label: PropTypes.string.isRequired,
        valid: PropTypes.bool.isRequired,
        handleValidate: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired
    };

    constructor(...args) {
        super(...args);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        if (this.props.valid) {
            this.props.handleSubmit();
        } else {
            this.props.handleValidate();
        }
    }

    render() {
        return (
            <button type="submit" className="btn btn-primary" onClick={this.handleClick}>
                {this.props.label}
            </button>
        );
    }
}
