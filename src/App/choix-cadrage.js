import React from 'react';

import Icon from './UI/icones'
/*
3 champs :
- une liste des presets,
- champs w et h
en placeholder, le calcul selon le ratio.
si  les valeurs w et h sont renseignes, et leur ratio n'existe pas en preset, afficher la valeur "libre"
*/

export default function ChoixCadrage(props) { 
    const {cadre, getInputs, validateInput} = props;
    const {selected} = cadre.select;
    const {placeholder} = cadre;

    function handleCheck(e) {
        getInputs({name: e.target.name, value: e.target.value});
    }
    function handleSelect(e) {
        getInputs({name: 'select', value: e.target.value});
    }

    function handlePermute(){
        getInputs({name: 'permute', value: null});
    }
    function selectOptions() {
        const {presets} = cadre.select;
        return presets.map( preset => {
            const value = preset.ratio;
            const label = preset.name;
            const key = label + value;
            return (<option {...{key, value, label}}>{label}</option>)
        });
    }

    return (
            <div className="gestion-crop">

                <label className="crop-label"  
                htmlFor="cadrage-presets">
                <span className="crop-label-info"> aspect </span>
                    <select 
                    className="crop-presets"
                    id="cadrage-presets"
                    value={selected}
                    onChange={handleSelect}>
                        {selectOptions()}
                    </select>
                 </label>

                <div className="gestion-crop-size">

                    <label className="crop-label label-px" 
                    htmlFor="crop-width">
                    <span className="crop-label-info"> L </span>
                    <input
                        className="crop-size-input"
                        name="width"
                        id="crop-width"
                        type="number"
                        value={cadre.width}
                        placeholder={placeholder.width}
                        step="1"
                        onChange={handleCheck}
                        onBlur={validateInput}
                    /> 
                    </label>

                    <span className="crop-size-permute" 
                    onClick={handlePermute}> 
                    <Icon name="permuter"/>
                    </span> 

                    <label className="crop-label label-px" 
                    htmlFor="crop-height">
                    <span className="crop-label-info"> H </span>
                    <input
                        className="crop-size-input"
                        name="height"
                        id="crop-height"
                        type="number"
                        value={cadre.height}
                        placeholder={placeholder.height}
                        step="1"
                        onChange={handleCheck}
                        onBlur={validateInput}
                    /> 
                    </label>            
                </div>
            </div>
        );
    }