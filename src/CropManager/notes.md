
## Layer Crop
Le crop possede des dimensions fixes, l x h. A l'écran, il sera affiché en relative ou en absolu.
- relative, le crop occupe la place maximum qui lui est proposé,  -> conteneur - marge.
- absolu, taille fixée à 100%, se reduit si manque de place.

à partir des dimensions du crop, celles de l'image sont calculées. ces dimensions sont appliquées à la div qui engoble l'img ; l'img est a 100% dedans.

```javascript
img.onload = function() {
    var width  = img.naturalWidth;
    var height = img.naturalHeight;
}
```

rappel :  formule pour exprimer le rapport entre le crop et l'image.
- Entrées
    - dimensions de l'image originale,
    - dimensions du crop.
la référence est la diagonale de l'image; les dimensions et la position de crop eont exprimés en pourcentages de cette valeur.
Les point d'origine des transformations est le point central de l'image

- Contraintes :  ratios fixes. 
    - le ratio de l'image est fixe, mais ses dimensions naturelles peuvent changer.
    - le ratio du crop est fixe, mais peut changer (dans une prochaine évolution). Si les dimensions changent, il faut se baser sur le rapport ancien - nouveau pour refixer les dimensions relatives.
    s'il y a changement de dimensions du crop, elles se font de facon relatives au absolues
    - absolues :  appliquer le rapport entre les anciennes et les nouvelles dimensions.
    - relatives :  garder une surface identique
    

    a :  aire = l :  largeur x h :  hauteur
    ratio = r

    soit deux rectangles R1(l1, h1, a1) et R2(l2,h2, a2)
    modifier l'échelle de R2 d'un facteur x pour que a1 = a2 


    https: //math.stackexchange.com/questions/10905/calculate-width-and-height-of-rectangle-containing-given-area-and-conforming-to
    

- trois étapes.
    - fixer le rapport image / crop ;
    - fixer le rapport crop -> crop présenté à l'ecran (responsive). Adapter à l'image. Revoir si resize.
    - appliquer les modifications enregistrées, appliquer celles saisies.




/*
dimensions : 
x, y pour le top et left de l'élément,
dX, dY :  décalage
w, h :  largeur hauteur de référence
width, height :  dimensions appliquées
*/



    /*
a faire :  
- le schéma d'enregistrement,
- le schéma de lecture
- les formules de transformation.

    décision :  les données seront le plus virtualisées possible.
    -> l'image est le référent. Si l'image change, on repart de zéro.

- image :  dimensions;
- crop :  dimensions;
C:  {x:  0, y:  0}
D:  sqrt( img.x2 + img.y2)
L= D
H = r * L
r = L/H
img transform{
scale :  E,
rotate:  A,
translate:  T{dX,dY}
}


- en export : 
    exprimer le rapport de l'image par rapport au crop.
    en calculant l'hypothenuse de chacun
    h = Math.sqrt( width * width + height * heigth )
    rapport = hypImg / hypCrop
    dx:  translate.dX - cropper.w * 0.5 / cropper.w
    dy:  translate.dy - cropper.wh * 0.5 / cropper.h
    scale:  (scale * hypImg) / hypCrop
    rotation et pivot tels quels.

    ai-je besoin d'une conversion ? j'ai ejà un systeme de conversion à l'échelle dans le rendu qui n'existait pas dans la premiere version.
    seul le passage des pixels à pourcents est clean pour un export.

    j'ai besoin d'une conversion pour le passage du proxy à l'original.
    echelle et decalage sont enregistrés selon le rapport à l'image reelle
    -> rapport = hypImg / hypProx 

tranform et pivot :  mettre à l'echelle, puis appliquer 
    */



rendu: 
{…}
rotate: 
-33
scale: 
{…}
x: 
4.3415
y: 
4.3415
translate: 
{…}
dX: 
52
dY: 
149



transform: 
{…}
rotate: 
-33
scale: 
{…}
x: 
0.7365013861368693
y: 
0.7365013861368693
translate: 
{…}
dX: 
48.27270868221869
dY: 
139.38525217998756


rendu: {…}
    cadre: {…}
        height: 400
        width: 320
    image: HTMLImageElement{…}
    position: {…}
        h: -498.464
        w: -477.06
    transform: {…}
        rotate: 20
        scale: {…}
            x: 0.7449834935437203
            y: 0.7449834935437203
        translate: {…}
            dX: -62.56
            dY: 49.536

    Export
    cadrage: 
        diagonale: 1886.323673180189
        ratio: 0.8

    image:
        height: 1496
        src: "http://localhost:3002/vintage-travel-posters-1-20.jpg"
        width: 1149

    meta: 
        pristine: false

    proxy: 
        height: 1000
        src: "data:image/jpeg;base64,…"
        width: 768

    transform: 
        pivot:
            h: 1
            v: 1
        rotate: 20
        scale: 4.3915
        translate:
            dX: -0.1955
            dY: 0.1548

que doit contenir state dans Controleur ?
- toutes les variables des librairies manip-image et transform-origin,
- à plat, les variables qui entrainent un raffraichissement du composant,
- en objet, les variables intermediaires.
state : 
à plat :
    (translate)
        dX,
        dY,
    (scale)
        sX,
        sY,
    rotate

objets :
    pointers // ou bien
        pointer,
        axe, 

    unit,
    debut,
    arrivee, // garder la derniere position du pointeur

    message,
    action,

    start
        translate,
        rotate,
        scale,
    
    moving
        translation,
        rotation,
        scalation,

    transform // export
        translate, // pourcents
        rotate,
        scale, // valeur
        pivot,

