import React, {PureComponent, PropTypes} from 'react';

import{presets, cadreDefaults} from './config/initial'
import Icon from './UI/icones'
/*
3 champs :
- une liste des presets,
- champs w et h
en placeholder, le calcul selon le ratio.
si  les valeurs w et h sont renseignes, et leur ratio n'existe pas en preset, afficher la valeur "libre"

*/
export default class ChoixCadrage extends PureComponent {
    static propTypes = {
         getCadre: PropTypes.func,
         seCadre: PropTypes.func,
    }
    constructor(props){
        super(props);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handlePermute = this.handlePermute.bind(this);
    }
    state = { 
        width: cadreDefaults.width,
        // height: cadreDefaults.height,
        height: '',
        ratio: cadreDefaults.ratio
     }
     
     componentWillReceiveProps(nextProps) {
         this.setState(nextProps);
     }
     componentDidUpdate() {
        const cadre = {
            width: Math.round(
                this.state.width || 
                this.state.height * this.state.ratio || 
                cadreDefaults.width
                ),
            height: Math.round(
                this.state.height || 
                this.state.width / this.state.ratio || 
                cadreDefaults.height
                ),
            ratio: (
                this.state.width && this.state.height && 
                this.state.width / this.state.height
                ) || this.state.ratio 
        };
        this.props.getCadre(cadre);
     }

    handleCheck(e) {
        console.log('handleCheck', e.target.name, e.target.value);
        this.setState({[e.target.name]: e.target.value})
    }
    handleSelect(e) {
        this.setState({ratio: e.target.value})
    }
    handlePermute(){
        const {width, height, ratio} = this.state;
        this.setState({
            width: height,
            height: width,
            ratio: 1 / ratio
        })
    }

    get selectOptions() {
        return Object.keys(presets).map( key => {
            const value = presets[key].ratio;
            const label = presets[key].name;
            return (<option {...{key, value, label}}/>)
        });
    }

    get placeholder() {
        return {
            width: Math.round(this.state.height * this.state.ratio),
            height: Math.round(this.state.width / this.state.ratio)
        }
    }
    render() {
        return (
            <div className="gestion-crop">

                <label className="crop-label"  
                htmlFor="cadrage-presets"> aspect </label>
                <select 
                    className="crop-presets"
                    id="cadrage-presets"
                    onChange={this.handleSelect}>
                    {this.selectOptions}
                </select>

                <div className="gestion-crop-size">

                    <label className="crop-label" 
                    htmlFor="crop-width"> L </label>
                    <input
                        className="crop-size-input"
                        name="width"
                        id="crop-width"
                        type="number"
                        value={this.state.width}
                        placeholder={this.placeholder['width']}
                        step="1"
                        onChange={this.handleCheck}
                    /> 

                    <span className="crop-size-permute" 
                    onClick={this.handlePermute}> 
                    <Icon name="permuter"/>
                    </span> 

                    <label className="crop-label" 
                    htmlFor="crop-width"> H </label>            
                    <input
                        className="crop-size-input"
                        name="height"
                        id="crop-height"
                        type="number"
                        value={this.state.height}
                        placeholder={this.placeholder['height']}
                        step="1"
                        onChange={this.handleCheck}
                    />  
                </div>
            </div>
        );
    }
}