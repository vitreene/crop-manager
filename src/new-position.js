/*
met à jour la position de l'image
entrees :
- transform:
    - translate (x,y)
    - scale(s)
    -rotate(r)
- ancienne position :
    - translate (x,y)
    - scale(s)
    -rotate(r)

*/

export default function({prevTransform, newTransform}) {
    const newTranslate = newTransform; //.translate;
    const prevTranslate = prevTransform.translate;

    const translate = {
        dX: prevTranslate.dX + newTranslate.dX,
        dY: prevTranslate.dY + newTranslate.dY,
    };
    // console.log('newTranslate', newTranslate.dX, newTranslate.dY);
    // console.log('prevTranslate', prevTranslate.dX, prevTranslate.dY);
    // console.log('translate', translate.dX, translate.dY);
    
    return {...newTransform, translate};
}