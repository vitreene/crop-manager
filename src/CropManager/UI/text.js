import React from 'react';

const Text = (props) => (
    <p style={  {
        color: props.color || 'currentcolor', 
        fontSize: props.small ? 10 : 14 ,
        marginTop: '0.25rem',
        lineHeight: 0
        } }>
        {props.children}
        </p>
);

export default Text;