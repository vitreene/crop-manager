import React from 'react';

const fond = (classe) => (
    <path className={'icon-fond ' + classe} d="M1 1h50v50.2H1z"/>
);


const icones = {
  pivotH: (
    <g fill="none" stroke="currentcolor"  strokeWidth="3">
      <path  d="M20.1 17.98c-1.44-.83-3.06-1.26-4.7-1.26-5.2 0-9.4 4.2-9.4 9.4 0 5.18 4.2 9.4 9.4 9.4 1.64 0 3.26-.45 4.7-1.27V17.98z"/>
      <path fill="currentcolor" d="M31.9 34.25c1.44.82 3.06 1.26 4.7 1.26 5.2 0 9.4-4.2 9.4-9.4 0-5.16-4.2-9.37-9.4-9.37-1.64 0-3.26.43-4.7 1.25v16.28z"/>
      <path d="M26 5.7v40"/>
  </g>
  ),
  pivotV: (
    <g fill="none" stroke="currentcolor"  strokeWidth="3">
      <path  d="M18.4 31.6c-.84 1.43-1.27 3.05-1.27 4.7 0 5.18 4.2 9.4 9.4 9.4 5.18 0 9.4-4.22 9.4-9.4 0-1.65-.45-3.27-1.27-4.7H18.4z"/>
      <path fill="currentcolor" d="M34.66 19.8c.82-1.45 1.26-3.07 1.26-4.7 0-5.2-4.22-9.4-9.4-9.4-5.18 0-9.4 4.2-9.4 9.4 0 1.63.44 3.25 1.26 4.7l16.28-.03z"/>
      <path  d="M6.1 25.7h40"/>
  </g>
  ),
  rotate90: (
     <g fill="none" stroke="currentcolor" >
        <path strokeWidth="2" d="M10.84 20.4h30.32v19.55H10.84z"/>
        <path strokeWidth="4" d="M20.4 10.2s11.92-6.16 19.73 3.37m2.73-6.4l-1.64 8.3-7.44.1"/>
  </g>
  ), 
  contains:(
     <g fill="none" stroke="currentcolor"  strokeWidth="3">
        <path strokeDasharray="2"  d="M8 8.1h36v36H8z" />
        <path fill="currentcolor" d="M17 11.94h18v27.82H17z"/>
  </g>
  ),
  cover: (
     <g fill="none" stroke="currentcolor"  strokeWidth="4">
      <path fill="currentcolor" d="M8.07 11.85h36v28h-36z"/>
      <path strokeDasharray="2" stroke="#fff"  d="M16.07 16.1h20v20h-20z"/>
  </g>
  )

}

export default function Icon(props) {
  const {name, classe='', checked=false} = props ;
  const iconClassName = `icon-${name}`
  return(
<svg className={'icon-small ' + iconClassName} xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" strokeMiterlimit="1.5" viewBox="0 0 52 53" clipRule="evenodd" strokeLinejoin="round"  >

    {checked && fond(classe)}
    {icones[name]}

</svg>

)}

