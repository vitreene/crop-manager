import {tourneEtDecale as tD} from './transformer-origin'
const tourneEtDecale = tD();
/*
function tourneEtDecale(cx, cy, x, y, tx, ty, angle, scale) {
    // cx, cy : point d'axe,
    // x,y : point à tourner
    // tx, ty : decalage à ajouter
    // angle : angle de otation
    // scale : facteurd'échelle
*/

describe( 'fonction tourneEtDecale', () => {
    console.log('tourneEtDecale.tourne',  typeof tourneEtDecale.tourne);
    
    it('la fonction est reciproque avec des valeurs à 0', () => {
     const centre = {dX: 0, dY: 0};
     const point = {dX: 0, dY: 0};
     const angle = 0;
     const scale = 1;

     const res1 = tourneEtDecale.tourne(centre, point, angle, scale);
     console.log('res1', res1);
     
     const res2 = tourneEtDecale.tourne(point, centre, angle, scale);
     console.log('res2', res2);
     
    expect(res1.dX).toBeCloseTo(res2.dX, 2);
    });

    it('la fonction est reciproque avec la translation', () => {
     const centre = {dX: 50, dY: 40};
     const point = {dX: 200, dY: 100};
     const translate = {dX: 10, dY: 10};
     const tx = 10;
     const ty = 10;
     const angle = 45;
     const scale = 1.4;

     const res1 = tourneEtDecale.decale(point, translate, 1);
     console.log('res1', res1);
     
     const res2 = tourneEtDecale.decale(res1, translate, -1);
     console.log('res2', res2);
     
    expect(point.dX).toBeCloseTo(res2.dX, 2);
    expect(point.dY).toBeCloseTo(res2.dY, 2);
    });

    it('la fonction est reciproque avec l’angle  et l’echelle', () => {
        
     const centre = {dX: 50, dY: 40};
     const point = {dX: 200, dY: 100};
     const angle = 45;
     const scale = 1.4;

     const res1 = tourneEtDecale.tourne(centre, point, angle, scale);
     console.log('res1', res1);
     
     const res2 = tourneEtDecale.reTourne(centre, res1, angle, scale);
     console.log('res2', res2);
     
    expect(point.dX).toBeCloseTo(res2.dX, 2);
    expect(point.dY).toBeCloseTo(res2.dY, 2);
    });

    it('la fonction est reciproque avec l’angle, l’echelle et la translation', () => {
        
     const centre = {dX: -50, dY: -40};
     const point = {dX: 0, dY: 0};
     const translate = {dX: 50, dY: 40};
     const angle = 45;
     const scale = 1.4;

     const res1 = tourneEtDecale.decale(point,translate, 1);
     const res11 = tourneEtDecale.tourne(centre, res1, angle, scale)
     
     const res2 = tourneEtDecale.reTourne(centre, res11, angle, scale);
     const res22 = tourneEtDecale.decale(res2, translate, -1);
     
    expect(point.dX).toBeCloseTo(res22.dX, 2);
    expect(point.dY).toBeCloseTo(res22.dY, 2);
    });
/*
    it('test sur resultat', () => {
        
     const centre = {dX: 0, dY: 0};
     const point = {dX: 0, dY: 0};
     const translate = {dX: 50, dY: 40};
     const angle = 45;
     const scale = 1;

const resultat = {dX: -111.83365594322922, dY: -23.368734483078125};

     const res1 = tourneEtDecale.decale(centre,translate, -1);
     const res22 = tourneEtDecale.decale(res1, translate, 1);

     const res11 = tourneEtDecale.tourne(res1, point, angle, scale)
     const res2 = tourneEtDecale.reTourne(res1, res11, angle, scale);
     
    expect(resultat.dX).toBeCloseTo(res11.dX, 2);
    expect(resultat.dY).toBeCloseTo(res11.dY, 2);
    expect(res2.dX).toBeCloseTo(point.dX, 2);
    expect(res2.dY).toBeCloseTo(point.dY, 2);
    expect(res22.dX).toBeCloseTo(centre.dX, 2);
    expect(res22.dY).toBeCloseTo(centre.dY, 2);
    });
*/
    it('2e test sur resultat', () => {
        
    //  const centre = {dX: 0, dY: 0};
    //  const point = {dX: -50, dY: -40};

     const origin =  {dX: 50, dY: 40};
     const point = {dX: 0, dY: 0};
     const translate = {dX: 50, dY: 40};
     const angle = 25;
     const scale = 1;

const resultat = {dX: 71.58, dY: 22.61};

    // const tourne = ted.tourne({dX: 50,dY: 40}, {dX: 0, dY: 0}, 25, 1);
     const res1 = tourneEtDecale.tourne(origin, point, angle, scale);

    // const compense = ted.decale(tourne, {dX: 50,dY: 40}, 1)
     const res2 = tourneEtDecale.decale(res1, translate, 1);
     console.log('2e test sur resultat', resultat, '----> ',res1, res2);

    expect(res2.dX).toBeCloseTo(resultat.dX, 1);
    expect(res2.dY).toBeCloseTo(resultat.dY, 1);
});

})

