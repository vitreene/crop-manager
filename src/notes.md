
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

rappel : formule pour exprimer le rapport entre le crop et l'image.
- Entrées
    - dimensions de l'image originale,
    - dimensions du crop.
la référence est la diagonale de l'image; les dimensions et la position de crop eont exprimés en pourcentages de cette valeur.
Les point d'origine des transformations est le point central de l'image

- Contraintes : ratios fixes. 
    - le ratio de l'image est fixe, mais ses dimensions naturelles peuvent changer.
    - le ratio du crop est fixe, mais peut changer (dans une prochaine évolution). Si les dimensions changent, il faut se baser sur le rapport ancien - nouveau pour refixer les dimensions relatives.
    s'il y a changement de dimensions du crop, elles se font de facon relatives au absolues
    - absolues : appliquer le rapport entre les anciennes et les nouvelles dimensions.
    - relatives : garder une surface identique
    

    a : aire = l : largeur x h : hauteur
    ratio = r

    soit deux rectangles R1(l1, h1, a1) et R2(l2,h2, a2)
    modifier l'échelle de R2 d'un facteur x pour que a1 = a2 


    https://math.stackexchange.com/questions/10905/calculate-width-and-height-of-rectangle-containing-given-area-and-conforming-to
    

- trois étapes.
    - fixer le rapport image / crop ;
    - fixer le rapport crop -> crop présenté à l'ecran (responsive). Adapter à l'image. Revoir si resize.
    - appliquer les modifications enregistrées, appliquer celles saisies.

