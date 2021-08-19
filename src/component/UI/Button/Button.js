import React from 'react';

import classes from './Button.module.css';

const button = (props) => (
    <div className={classes.Button}>
        <button
            id={props.elementId}
            className={[classes[props.btnType]].join(' ')}
            disabled={props.disabled}
            onClick={props.clicked}
        >
            {props.children}
        </button>
    </div>
);

export default button;
