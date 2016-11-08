"use strict";

import React, {PureComponent, PropTypes} from 'react';

export default class InputFields extends PureComponent {

    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        type: PropTypes.string,
        error: PropTypes.string,
        active: PropTypes.bool.isRequired,
        touched: PropTypes.bool.isRequired,
        handleFocus: PropTypes.func.isRequired,
        handleBlur: PropTypes.func.isRequired,
        handleChange: PropTypes.func.isRequired,
    };

    static defaultProps = {
        type: 'text'
    };

    constructor(...args) {
        super(...args);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        event.preventDefault();
        this.props.handleChange(event.target.value);
    }

    render() {
        const {id, label, error, active, touched, handleFocus, handleBlur, ...rest} = this.props;
        delete rest.handleChange;

        let className = 'form-group';
        if (active) {
            className += ' active';
        } else if (touched) {
            className += error ? ' invalid' : ' valid';
        }

        return (
            <div className={className}>
                <label className="control-label" htmlFor={id}>{label}</label>
                <input
                    id={id}
                    className="form-control"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={this.handleChange}
                    {...rest}
                />
                {error && !active && touched ? <span className="help-block">{error}</span> : null}
            </div>
        );
    }
}
