import React from 'react';

const Text = (props) => (
    <span style={ { color: props.color, fontSize: props.small ? 10 : 14 } }>
        {props.content}
        </span>
);

export default Text;