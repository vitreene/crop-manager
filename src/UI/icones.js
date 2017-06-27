import React from 'react';

const fond = (classe) => (
    <path className={'icon-fond ' + classe} d="M1 1h50v50H1z"/>
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
  ),
  upload:(
    <g fill="currentcolor" stroke="#fff"  strokeWidth="2">
        <path  d="M14 12c0-3.33 2.7-6 6-6h12c3.3 0 6 2.67 6 6h5.5c4.15 0 7.5 3.36 7.5 7.5v15c0 4.13-3.36 7.5-7.5 7.5h-35C4.36 42 1 38.62 1 34.5v-15C1 15.35 4.35 12 8.5 12H14z"/>
        <circle cx="36" cy="27.72" r="10"/>
        <path d="M7.03 17.72h10v5h-10z"/>
        <path fill="#fff" strokeWidth="0" d="M40.92 32.36c2.86-2.57 3.1-6.97.54-9.83-2.57-2.86-6.98-3.1-9.84-.53 1.95.44 4.35 1.72 6.2 3.78 1.86 2.07 2.88 4.6 3.1 6.58z"/>
    </g>
  ),
  permuter: (
    <g fill="none" stroke="currentcolor"  strokeWidth="4">
      <path d="M35.3 14.1l4.6 5.98-4.3 5.03m-25.5-5.5h29.8M14.7 36.1l-4.6-5.97 4.3-5.03m25.5 5.5H10.1"/>
    </g>
  )

}

export default function Icon(props) {
  const {name, classe='', checked=false} = props ;
  const iconClassName = `icon-${name}`
  return(
<svg className={'icon-small ' + iconClassName} xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" strokeMiterlimit="1.5" viewBox="0 0 52 52" clipRule="evenodd" strokeLinejoin="round"  >

    {checked && fond(classe)}
    {icones[name]}

</svg>

)}

