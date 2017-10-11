/* eslint-disable */
import React, {Component, PropTypes} from 'react';

import {UNDO, REDO, DO, RAZ} from '../config/constantes'
import Icon from '../UI/icones'
import Text from '../UI/text'


export default class Controls extends Component {
    static propTypes = {
         pivot: PropTypes.object,
         commandes: PropTypes.object,
         handleCommand: PropTypes.func,
         handleControl: PropTypes.func,
     }    
    state = { 
        h : false,
        v : false
     }
    
    constructor(props){
        super(props);
        this.onPivot = this.onPivot.bind(this);
        this.onCover = this.onCover.bind(this);
        this.onRotate = this.onRotate.bind(this);
        this.onUndo = this.onUndo.bind(this);
        this.onRedo = this.onRedo.bind(this);
    }

    componentWillReceiveProps({pivot}) {
        // si j'utilise les props, je peux retirer state ?

        const {h, v} = this.state;
        // transformer (-1)/(+1) en true/false (true = checked)
        const newPivot = {
            h: (pivot.h === -1),
            v: (pivot.v === -1),
        };
        if ( newPivot.h === h && newPivot.v === v) return;
        this.setState({...newPivot});
    }
    onPivot(e){
        const {checked, name} = e.target;
        const pivot = {
        h : (name==='h') ? checked : this.state.h,
        v : (name==='v') ? checked : this.state.v
        };
        this.setState({[name]:checked});

        this.props.handleControl('pivoter', pivot);
    }

    onCover(e){
        this.props.handleControl('transformPreset', e.target.name);
    }
    
    onRotate(e){
        const sens = (e.shiftKey) ? -1 : 1;
        this.props.handleControl('rotate90', sens);
    }

    onUndo() {
        this.props.handleCommand('undoRedo', UNDO);
    }

    onRedo() {
        this.props.handleCommand('undoRedo', REDO);
    }

    render() {
        const params = {maxScale:2.8, minScale:0.4};
        const {v, h} = this.state;
        const {placement=''} = this.props;
        const {canundo, canredo} = this.props.commandes;
        // console.log('canundo, canredo', canundo, canredo);
        

        return (
            <div className="manip-reglages-icons" >
            <button onClick={this.onUndo} disabled={!canundo}>UNDO</button>
            <button onClick={this.onRedo} disabled={!canredo}>REDO</button>
              <input
                className="input-hidden"
                id="miroir-h"
                name="h"
                type="checkbox"
                checked={this.state.h}
                onChange={this.onPivot}
                />
                <label htmlFor="miroir-h"
                className={['label-reglage', h && 'label-on'].join(' ')}>
                    <Icon name="pivotH" checked={this.state.h} />
                <Text small >Miroir H</Text>
                </label>

                <input
                className="input-hidden"
                id="miroir-v"
                name="v"
                type="checkbox"
                checked={this.state.v}
                onChange={this.onPivot}
                />
                <label htmlFor="miroir-v"
                className={['label-reglage', v && 'label-on'].join(' ')}>
                    <Icon name="pivotV" checked={this.state.v} />
                <Text small >Miroir V</Text>
                </label>
               
                <input
                className="input-hidden"
                id="rotate90"
                name="rotate90"
                type="button"
                onClick={ this.onRotate }
                />
                <label htmlFor="rotate90"
                className="label-reglage">
                    <Icon name="rotate90" />    
                <Text small >Tourner</Text>
                </label>

                <div  className="reglage-separator"/>

                <input
                className="input-hidden"
                name="cover"
                id="visuel-cover"
                value='cover'
                type="radio"
                checked={placement === 'cover'}
                onChange={this.onCover}
                />
                <label 
                htmlFor="visuel-cover"
                className="label-reglage">
                     <Icon name="cover" checked={placement === 'cover'} />
                <Text small >Couvrir</Text>
                </label>

                <input
                className="input-hidden"
                name="contains"
                id="visuel-contains"
                value='contains'
                type="radio"
                checked={placement === 'contains'}
                onChange={this.onCover}
                />
                <label htmlFor="visuel-contains"
                className="label-reglage">
                      <Icon name="contains" checked={placement === 'contains'} />
                <Text small >Contenir</Text>
                </label>

            </div>
        );
    }
}