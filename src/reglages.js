/* eslint-disable */
import React, { Component } from 'react';

import {
  MiroirH,
  MiroirV,
  Cover,
  Contains
} from './UI'

import Text from './UI/text'


export default class Reglages extends Component {
    state = { 
        h : false,
        v :false
     }
    
    constructor(props){
        super(props);
        this.onMiroir = this.onMiroir.bind(this);
        this.onCover = this.onCover.bind(this);
        // const {pivX, pivY} = this.props.visuel ;
        // this.state = {
        // h : pivX || false,
        // v : pivY || false
        // };
    }

    onMiroir(e){
        const {checked, name} = e.target;
        const miroir = {
        pivX : (name==='h') ? checked : this.state.h,
        pivY : (name==='v') ? checked : this.state.v
        };

        this.setState({[name]:checked}) ;

        // const transform = Object.assign(
        // {},
        // this.props.visuel,
        // miroir
        // );

        // //console.log('transform', transform);

        // this.props.onMove(transform) ;
    }

    onCover(e){
        // si re-clic sur un bouton radio, la valeur passe à hiddenvalue
        const hiddenValue = 'libre' ;
        const {name, type, value} = e.target ;
        const {zone, placement='', onSaisie} = this.props ;
        const newValue = (placement === value) ? hiddenValue : value ;

        // AJOUTER l'action !

        // const out = {
        // target:{
        //     name,
        //     type,
        //     value:newValue
        // }
        // };
        // onSaisie(out) ;
    }

    render() {
        const params = {maxScale:2.8, minScale:0.4} ;
        const miroir = this.state ;
        const {zone, placement=''} = this.props ;
        const placementPath = `metas.ikono.$[zone:${zone}].placement` ;

        return (
            <div className="manip-reglages-icons">
              <input
                className="input-hidden"
                id="miroir-h"
                name="h"
                type="checkbox"
                checked={this.state.h}
                onChange={this.onMiroir}
                />
                <label htmlFor="miroir-h">
                <MiroirH checked={this.state.h}/>
                <Text small color={'white'}>Miroir hztl</Text>
                </label>

                <input
                className="input-hidden"
                id="miroir-v"
                name="v"
                type="checkbox"
                checked={this.state.v}
                onChange={this.onMiroir}
                />
                <label htmlFor="miroir-v">
                <MiroirV checked={this.state.v} />
                <Text small color={'white'}>Miroir vtcl</Text>
                </label>

                <input
                className="input-hidden"
                name={placementPath}
                id="visuel-cover"
                value='cover'
                type="radio"
                checked={placement === 'cover'}
                onChange={this.onCover}
                />
                <label htmlFor="visuel-cover">
                <Cover  checked={placement === 'cover'} />
                <Text small color={'white'}>Couvrir</Text>
                </label>

                <input
                className="input-hidden"
                name={placementPath}
                id="visuel-contains"
                value='contains'
                type="radio"
                checked={placement === 'contains'}
                onChange={this.onCover}
                />
                <label htmlFor="visuel-contains">
                <Contains  checked={placement === 'contains'} />
                <Text small color={'white'}>Contenir</Text>
                </label>

                </div>
        );
    }
}