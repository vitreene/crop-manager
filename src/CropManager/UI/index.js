// Icon
import React  from 'react';
import './index.css'

export function IconAccroche(props) {
  const {classe='', hasCircle=true} = props ;
  const cercle = iconCircle(hasCircle) ;

  return (
    <svg className={'icon icon-accroche ' + classe} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43 43" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" aria-labelledby="title">
      <title id="title">Accroche</title>
      {cercle}
      <path className='icon-plain icon-path-accroche' d="M17.23 15.57c0 .93-.75 1.7-1.68 1.7-.94 0-1.7-.77-1.7-1.7 0-.94.76-1.7 1.7-1.7.93 0 1.68.76 1.68 1.7zm14.07 7.6c0-.45-.18-.9-.48-1.2l-9.43-9.42c-.7-.67-1.98-1.2-2.9-1.2H13c-.9 0-1.67.76-1.67 1.7v5.47c0 .94.52 2.22 1.2 2.88l9.43 9.44c.3.3.73.5 1.18.5.45 0 .88-.2 1.2-.5l6.48-6.5c.3-.3.48-.73.48-1.17z"/>
    </svg>
)}

export function IconMessage(props) {
  const {classe='', hasCircle=true} = props ;
  const cercle = iconCircle(hasCircle) ;

  return (
    <svg className={'icon icon-message ' + classe} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43 43" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" aria-labelledby="title">
      <title id="title">Message</title>
      {cercle}
      <path className='icon-plain icon-path-message' d="M33.1 27.54c0-.46-.38-.84-.84-.84H10.32c-.47 0-.85.38-.85.84v1.7c0 .45.38.83.85.83h21.94c.46 0 .85-.38.85-.84v-1.7zm-5.06-5.06c0-.46-.38-.85-.84-.85H10.32c-.47 0-.85.4-.85.85v1.7c0 .45.38.83.85.83H27.2c.46 0 .84-.34.84-.8v-1.7zm3.38-5.07c0-.42-.38-.8-.85-.8H10.32c-.47 0-.85.38-.85.84v1.7c0 .46.38.84.85.84h20.25c.47 0 .85-.38.85-.84v-1.7zm-5.07-5.02c0-.46-.38-.85-.84-.85H10.36c-.47 0-.85.4-.85.86v1.7c0 .44.37.82.84.82h15.2c.45 0 .83-.4.83-.84v-1.7z"/>
    </svg>
)}

export function IconVisuel(props) {
  const {classe='', hasCircle=true} = props ;
  const cercle = iconCircle(hasCircle) ;
  return (
    <svg className={'icon icon-visuel ' + classe} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43 43" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" aria-labelledby="title">
      <title id="title">Visuel</title>
      {cercle}
      <path className="icon-plain icon-path-visuel" d="M21.26 18.68c-2.1 0-3.8 1.7-3.8 3.8 0 2.1 1.7 3.8 3.8 3.8 2.1 0 3.8-1.7 3.8-3.8 0-2.1-1.7-3.8-3.8-3.8zm9.28-5.5H27.6l-.68-1.78c-.33-.87-1.36-1.58-2.3-1.58H17.9c-.92 0-1.95.7-2.28 1.58l-.67 1.8H12c-1.87 0-3.38 1.5-3.38 3.37V28.4c0 1.85 1.5 3.36 3.37 3.36h18.55c1.86 0 3.38-1.5 3.38-3.37V16.54c0-1.86-1.52-3.38-3.38-3.38zm-9.28 15.2c-3.26 0-5.9-2.65-5.9-5.9 0-3.26 2.64-5.9 5.9-5.9 3.26 0 5.9 2.64 5.9 5.9 0 3.25-2.64 5.9-5.9 5.9z"/>
    </svg>
)}


function iconCircle(hasCircle){
  const bgCircle = 'icon-circle ' + (
    ( typeof(hasCircle) === 'boolean' ) ? '' : hasCircle
  );
  return (hasCircle)
    ? <circle className={bgCircle} cx="21.26" cy="21.26" r="21.01"/>
    : '' ;
}


export function MiroirH(props) {
  const {classe='', checked} = props ;
  const isChecked = (checked) ? '-inverse' : '' ;
  return (
    <svg className={'icon-small icon-modifier-visuel icon-miroir-h ' + classe}  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 26 19"   fillRule="evenodd" strokeMiterlimit="1.41" clipRule="evenodd" strokeLinecap="round" strokeLinejoin="round" aria-labelledby="title">
      <title id="title">MiroirH</title>
        <path className={'icon-checked' + isChecked} d="M25.7 2.8c0-1.5-1.2-2.73-2.7-2.73H2.73C1.23.07 0 1.3 0 2.8v13.42c0 1.5 1.22 2.73 2.73 2.73h20.25c1.5 0 2.73-1.22 2.73-2.73V2.8z"/>
        <path className={'icon-miroir-sombre' + isChecked} d="M3.36 14c0 .66.53 1.2 1.2 1.2h3.6c.67 0 1.2-.54 1.2-1.2V4.38c0-.66-.53-1.2-1.2-1.2h-3.6c-.67 0-1.2.54-1.2 1.2V14z"/>
        <path className={'icon-miroir-clair' + isChecked} d="M16.36 13.95c0 .68.55 1.24 1.24 1.24h3.52c.68 0 1.24-.58 1.24-1.26v-9.5c0-.7-.56-1.25-1.24-1.25H17.6c-.7 0-1.24.53-1.24 1.22v9.52z"/>
        <path className="icon-miroir-filet" d="M12.86 1v17"/>
    </svg>
  )}

export function MiroirV(props) {
  const {classe='', checked} = props ;
  const isChecked = (checked) ? '-inverse' : '' ;
  return (
    <svg className={'icon-small icon-modifier-visuel icon-miroir-v ' + classe}  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 26 19"   fillRule="evenodd" strokeMiterlimit="1.41" clipRule="evenodd" strokeLinecap="round" strokeLinejoin="round" aria-labelledby="title">
      <title id="title">MiroirV</title>
      <path className={'icon-checked' + isChecked}  d="M25.7 2.8c0-1.53-1.2-2.75-2.7-2.75H2.73C1.23.05 0 1.28 0 2.8v13.4c0 1.52 1.22 2.74 2.73 2.74h20.25c1.5 0 2.73-1.22 2.73-2.73V2.8z"/>
        <path className={'icon-miroir-sombre' + isChecked}  d="M17.36 19c.65 0 1.18-.53 1.18-1.2v-3.6c0-.67-.53-1.2-1.18-1.2H7.73c-.65 0-1.2.53-1.2 1.2v3.6c0 .67.55 1.2 1.2 1.2h9.63z"/>
        <path className={'icon-miroir-clair' + isChecked} d="M17.3 6c.7 0 1.24-.56 1.24-1.24V1.24C18.54.56 18 0 17.3 0H7.8c-.7 0-1.26.56-1.26 1.24v3.52C6.54 5.44 7.1 6 7.8 6h9.52z"/>
        <path className="icon-miroir-filet" d="M4.36 9.5h17"/>
    </svg>
  )}

export function Cover(props) {
  const {classe='', checked} = props ;
  const isChecked = (checked) ? '-inverse' : '' ;
  return (
    <svg className={'icon-small icon-modifier-visuel icon-miroir-v ' + classe}  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 26 19"   fillRule="evenodd" strokeMiterlimit="1.41" clipRule="evenodd" strokeLinecap="round" strokeLinejoin="round" aria-labelledby="title">
      <title id="title">Cover</title>
      <path className={'icon-cov-fond icon-checked' + isChecked}  d="M25.7 2.8c0-1.53-1.2-2.75-2.7-2.75H2.73C1.23.05 0 1.28 0 2.8v13.4c0 1.52 1.22 2.74 2.73 2.74h20.25c1.5 0 2.73-1.22 2.73-2.73V2.8z"/>
        <path className="icon-miroir-filet" d="M.5.5l22.8 16.02M23.3.5L.5 16.52"/>
    </svg>
  )}

export function Contains(props) {
  const {classe='', checked} = props ;
  const isChecked = (checked) ? '-inverse' : '' ;
  return (
    <svg className={'icon-small icon-modifier-visuel icon-miroir-v ' + classe}  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 26 19"   fillRule="evenodd" strokeMiterlimit="1.41" clipRule="evenodd" strokeLinecap="round" strokeLinejoin="round" aria-labelledby="title">
      <title id="title">Contains</title>
        <path className={'icon-cov-fond icon-checked' + isChecked} d="M25.7 2.73C25.7 1.23 24.5 0 23 0H2.73C1.23 0 0 1.22 0 2.73v13.42c0 1.5 1.22 2.74 2.73 2.74l20.25-.04c1.5 0 2.73-1.22 2.73-2.73V2.73z"/>
        <path  className={'icon-cov-sombre' + isChecked}  d="M7.26 1.82h11.2v15.25H7.26z"/>
        <path className="icon-miroir-filet" d="M7.47 1.82l10.98 15.25m0-15.25L7.47 17.07"/>
    </svg>
  )}


///////////////
// icones de position du message
///////////////

export function BlocBas(props) {
  const {classe='', checked} = props ;
  const isChecked = (checked) ? '-inverse' : '' ;
    const bloc = blocCoinsArrondis(isChecked) ;
  return (
    <svg className={'icon-svg icon-small icon-bloc-message icon-bloc-message-bas ' + classe}  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 27 20"   aria-labelledby="title">
      <title id="title">Bloc message bas</title>
      {bloc}
      <path className={'icon-bloc-message-pave' + isChecked}
        d="M4.25 12.17h17.92v4.17H4.25z"/>
    </svg>
  )}

export function BlocHaut(props) {
  const {classe='', checked} = props ;
  const isChecked = (checked) ? '-inverse' : '' ;
  const bloc = blocCoinsArrondis(isChecked) ;
  return (
    <svg className={'icon-svg icon-small icon-bloc-message icon-bloc-message-bas ' + classe}  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 27 20"   aria-labelledby="title">
      <title id="title">Bloc message haut</title>
      {bloc}
      <path className={'icon-bloc-message-pave' + isChecked}
        d="M4.25 3.42h17.92V7.6H4.25z"/>
    </svg>
  )}

export function BlocGauche(props) {
  const {classe='', checked} = props ;
  const isChecked = (checked) ? '-inverse' : '' ;
  const bloc = blocCoinsArrondis(isChecked) ;
  return (
    <svg className={'icon-svg icon-small icon-bloc-message icon-bloc-message-bas ' + classe}  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 27 20"   aria-labelledby="title">
      <title id="title">Bloc message gauche</title>
      {bloc}
      <path className={'icon-bloc-message-pave' + isChecked}
        d="M2.96 3h9.17v13.34H2.96z"/>
    </svg>
  )}

export function BlocDroite(props) {
  const {classe='', checked} = props ;
  const isChecked = (checked) ? '-inverse' : '' ;
    const bloc = blocCoinsArrondis(isChecked) ;
  return (
    <svg className={'icon-svg icon-small icon-bloc-message icon-bloc-message-bas ' + classe}  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 27 20"   aria-labelledby="title">
      <title id="title">Bloc message droite</title>
      {bloc}
      <path className={'icon-bloc-message-pave' + isChecked}
        d="M13.76 3h9.17v13.34h-9.17z"/>
    </svg>
  )}


function blocCoinsArrondis(isChecked) {
  return (
    <path className={'icon-bloc-message' + isChecked}  d="M25.5 3.13C25.5 1.68 24.33.5 22.88.5H3.13C1.68.5.5 1.68.5 3.13v13.5c0 1.45 1.18 2.62 2.63 2.62h19.75c1.45 0 2.62-1.17 2.62-2.62V3.13z"/>
  )
}


export function LienMessage(props) {
  const {classe='', checked} = props ;

  const lienOuvert = (  <path d="M5.88 17.02c.16-.17.16-.44 0-.6-.18-.17-.44-.17-.62 0l-3.42 3.4c-.17.2-.17.46 0 .63.1.08.2.12.3.12.1 0 .22-.04.3-.12l3.44-3.43zm2.26.55c0-.24-.2-.43-.43-.43-.2 0-.4.2-.4.43v4.3c0 .23.2.42.4.42.3 0 .5-.2.5-.5v-4.3zm-3-3c0-.24-.2-.43-.43-.43H.5c-.24 0-.43.2-.43.43 0 .24.2.43.44.43h4.2c.3 0 .5-.2.5-.43zm16.93 1.72c0-1.1-.4-2-1.12-2.8L16.45 9c-.23-.2-.5-.4-.75-.55l-.25 3.2 3.67 3.67c.25.25.38.57.38.92 0 .32-.13.64-.38.88l-1.96 1.96c-.5.5-1.34.47-1.83 0l-3.65-3.7-3.2.26c.16.26.33.52.56.75l4.47 4.5c.8.7 1.7 1.1 2.8 1.1 1.1 0 2-.4 2.7-1.1l2-1.9c.8-.8 1.2-1.7 1.2-2.7zM13.8 6.6c-.15-.28-.33-.53-.55-.76l-4.48-4.5C8.05.64 7.07.22 6.04.22s-2 .4-2.72 1.13L1.35 3.28C.62 4 .2 4.98.2 6c0 1.03.42 2 1.14 2.73l4.5 4.5c.23.23.48.4.75.56l.2-3.3-3.7-3.6c-.3-.3-.4-.6-.4-.9 0-.4.1-.7.3-.9l2-2c.22-.27.54-.4.9-.4s.7.1.9.3l3.67 3.7 3.2-.25zm8.5 1.1c0-.23-.2-.4-.44-.4h-4.3c-.23 0-.42.17-.42.4 0 .25.2.44.43.44h4.3c.23 0 .42-.2.42-.43zM15 .44c0-.24-.2-.43-.43-.43-.24 0-.43.2-.43.5v4.2c0 .3.2.5.43.5.24 0 .43-.2.43-.4V.5zm5.45 2.02c.16-.17.16-.44 0-.62-.17-.16-.44-.16-.62 0L16.4 5.27c-.14.18-.14.44 0 .62.1 0 .2.1.3.1.13 0 .24-.1.33-.1l3.43-3.5z"/>
    )
  const lienFerme = (<path d="M19.5 16.3c0 .32-.13.64-.38.88l-1.96 1.96c-.25.23-.58.35-.9.35-.35 0-.68-.2-.93-.4l-2.75-2.8c-.25-.3-.38-.6-.38-.9 0-.4.16-.7.44-1 .44.4.82 1 1.5 1 .7 0 1.3-.6 1.3-1.3 0-.7-.53-1.1-.98-1.5.27-.3.58-.4.97-.4.33 0 .67.1.9.4l2.8 2.7c.24.2.37.5.37.9zm-9.4-9.46c0 .4-.18.7-.46.98-.44-.44-.8-.96-1.5-.96s-1.28.57-1.28 1.28c0 .7.52 1.06.96 1.5-.27.28-.57.42-.96.42-.34 0-.67-.12-.9-.36l-2.8-2.8c-.24-.23-.37-.55-.37-.9 0-.34.1-.66.3-.9l2-1.95c.2-.23.6-.36.9-.36.3 0 .7.1.9.3l2.8 2.8c.2.2.4.5.4.9zm11.97 9.45c0-1.1-.4-2-1.12-2.8l-2.8-2.8c-.7-.7-1.7-1.2-2.72-1.2-1.06 0-2.05.4-2.8 1.2l-1.17-1.2c.75-.77 1.18-1.78 1.18-2.8 0-1-.4-2-1.1-2.7L8.77 1.3C8.05.62 7.07.22 6.04.22c-1.02 0-2 .4-2.72 1.13L1.35 3.28C.63 3.98.2 4.98.2 6c0 1.03.4 2 1.14 2.73l2.8 2.8c.7.7 1.7 1.1 2.72 1.1 1.06 0 2.05-.42 2.78-1.17l1.18 1.18c-.75.74-1.18 1.74-1.18 2.8 0 1.02.4 2 1.1 2.72l2.77 2.77c.8.74 1.7 1.14 2.8 1.14 1 0 2-.4 2.7-1.1L21 19c.73-.7 1.14-1.7 1.14-2.7z"/>)

  const lien = (checked) ? lienFerme : lienOuvert ;


  return (
    <svg className={'icon-svg icon-small icon-bloc-message-lien ' + classe}  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 23 23"   aria-labelledby="title">
      <title id="title">lien titre-description</title>
      {lien}
    </svg>
  )}

export function Oeil(props) {
  // const {classe='', checked, hasCircle=true} = props ;
  const {classe='', checked} = props ;
  // const cercle = iconCircle(hasCircle) ;

  const oeilOuvert = (  <path className="icon-oeil " d="M30.54 21.5c-2.25 3.48-5.9 5.9-10.13 5.9-4.2 0-7.8-2.42-10.1-5.9 1.3-1.94 3-3.6 5-4.66-.5.9-.8 1.93-.8 2.97 0 3.2 2.7 5.9 5.9 5.9 3.3 0 6-2.7 6-5.9 0-1.1-.2-2.1-.8-3 2.1 1 3.8 2.7 5 4.6zm-9.5-5.07c0 .4-.28.7-.63.7-1.5 0-2.7 1.3-2.7 2.8 0 .4-.3.7-.6.7s-.6-.3-.6-.63c0-2.2 1.8-4.03 4-4.03.4 0 .7.3.7.63zm11.2 5.1c0-.3-.1-.6-.27-.9-2.43-4-6.87-6.7-11.56-6.7-4.6 0-9.1 2.7-11.5 6.7-.1.3-.2.6-.2.9 0 .4.1.7.3.9 2.48 4 6.9 6.7 11.6 6.7 4.7 0 9.14-2.7 11.57-6.7.17-.2.27-.5.27-.9z"/>)

  const oeilFerme = (
  <path className="icon-oeil " d="M15.92 25.5c-2.32-1.04-4.26-2.82-5.63-4.94 1.2-1.94 2.9-3.6 5-4.66-.6.9-.8 1.93-.8 2.97 0 1.8.9 3.6 2.4 4.7l-1 1.9zm5.13-10c0 .34-.3.63-.64.63-1.5 0-2.7 1.22-2.7 2.74 0 .3-.3.6-.6.6s-.6-.3-.6-.7c0-2.2 1.8-4 4-4 .4 0 .7.3.7.6zm4.8-2.53c-.02-.2-.1-.3-.23-.4-.27-.2-1.5-1-1.75-1-.16 0-.3.1-.37.2l-.7 1.3c-.8-.18-1.6-.26-2.4-.26-4.85 0-8.93 2.7-11.54 6.7-.17.25-.26.6-.26.9 0 .33.1.64.26.9 1.52 2.4 3.67 4.36 6.23 5.52-.2.2-.6.92-.6 1.13 0 .15.1.3.2.36.2.15 1.5.92 1.7.92.1 0 .3-.1.3-.2l.64-1.2c2.8-4.96 5.55-9.96 8.32-14.9v-.1zm.47 5.9c0-.4-.04-.8-.1-1.2l-3.7 6.6c2.3-.9 3.8-3.1 3.8-5.5zm5.9 1.6c0-.4-.08-.6-.25-.9-1.03-1.7-2.68-3.4-4.3-4.5l-.85 1.5c1.5 1 2.75 2.3 3.72 3.82-2.05 3.2-5.3 5.52-9.15 5.85l-1 1.74c3.9 0 7.5-1.8 10.1-4.76.5-.6 1-1.27 1.4-1.9.1-.3.2-.6.2-.95z"/>)

  const lien = (checked) ? oeilOuvert : oeilFerme ;


  return (
    <svg className={'icon-svg icon-small icon-card-vue-oeil ' + classe}  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 43 43"    aria-labelledby="title">
      <title id="title">afficher ou masquer la vue</title>
      <circle cx="21.26" cy="21.26" r="21.01"/>
      {lien}
    </svg>
  )}

export function Plus(props) {
  const {classe='', hasCircle=true} = props ;
  const cercle = iconCircle(hasCircle) ;

  return (
    <svg className={'icon-svg icon-small icon-card-vue-plus ' + classe}  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 43 43"    aria-labelledby="title">
      <title id="title">ajouter une vue</title>
      {cercle}
      <path  d="M30.54 20c0-.7-.56-1.27-1.26-1.27h-5.5v-5.5c0-.7-.56-1.26-1.26-1.26H20c-.7 0-1.27.57-1.27 1.27v5.5h-5.5c-.7 0-1.26.55-1.26 1.25v2.5c0 .7.57 1.27 1.27 1.27h5.5v5.48c0 .7.55 1.26 1.25 1.26h2.5c.7 0 1.27-.55 1.27-1.25v-5.5h5.48c.7 0 1.26-.56 1.26-1.26V20z"/>
    </svg>
  )}


  export function Grip(props) {
    const {classe=''} = props ;
    const row = "8.75c0-0.414-0.336-0.75-0.75-0.75l-1.5 0c-0.414 0-0.75 0.336-0.75 0.75l0 1.5c0 0.414 0.336 0.75 0.75 0.75l1.5 0c0.414 0 0.75-0.336 0.75-0.75l0-1.5Zm0-4c0-0.414-0.336-0.75-0.75-0.75l-1.5 0c-0.414 0-0.75 0.336-0.75 0.75l0 1.5c0 0.414 0.336 0.75 0.75 0.75l1.5 0c0.414 0 0.75-0.336 0.75-0.75l0-1.5Zm0-4c0-0.414-0.336-0.75-0.75-0.75l-1.5 0c-0.414 0-0.75 0.336-0.75 0.75l0 1.5c0 0.414 0.336 0.75 0.75 0.75l1.5 0c0.414 0 0.75-0.336 0.75-0.75l0-1.5Z" ;
    const row1 = 'M3 ' + row ;
    const row2 = 'M7 ' + row ;
    const row3 = 'M11 ' + row ;
  return (
    <svg className={'icon-svg icon-x-small icon-card-vue-grip ' + classe}  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 11 12"   aria-labelledby="title">
      <title id="title">deplacer la diapo </title>
      <g className="icon-grip" >
        <path d={row1} />
        <path d={row2} />
        <path d={row3} />
      </g>
    </svg>
  )}



  export function Expand(props) {
    const {classe=''} = props ;
  return (
    <svg className={'icon-svg icon-x-small icon-card-vue-expand ' + classe}  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 11 12"   aria-labelledby="title">
      <title id="title">Accès à l’éditeur</title>
      <path className="icon-expand"  d="M5.9 7.25c0-0.06-0.03-0.13-0.08-0.18l-0.89-0.89c-0.05-0.05-0.12-0.08-0.18-0.08 -0.06 0-0.13 0.03-0.18 0.08l-2.59 2.59 -1.12-1.12c-0.09-0.09-0.22-0.15-0.35-0.15 -0.27 0-0.5 0.23-0.5 0.5l0 3.5c0 0.27 0.23 0.5 0.5 0.5l3.5 0c0.27 0 0.5-0.23 0.5-0.5 0-0.13-0.05-0.26-0.15-0.35l-1.12-1.12 2.59-2.59c0.05-0.05 0.08-0.12 0.08-0.18Zm6.1-6.75c0-0.27-0.23-0.5-0.5-0.5l-3.5 0c-0.27 0-0.5 0.23-0.5 0.5 0 0.13 0.06 0.26 0.15 0.35l1.13 1.13 -2.59 2.59c-0.05 0.05-0.08 0.12-0.08 0.18 0 0.06 0.03 0.13 0.08 0.18l0.89 0.89c0.05 0.05 0.12 0.08 0.18 0.08 0.06 0 0.13-0.03 0.18-0.08l2.59-2.59 1.13 1.13c0.09 0.09 0.22 0.15 0.35 0.15 0.27 0 0.5-0.23 0.5-0.5l0-3.5Z" />
    </svg>
  )}
