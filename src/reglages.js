/* eslint-disable */
import React, {Component, PropTypes} from 'react';

import Icon from './UI/icones'

import Text from './UI/text'


export default class Reglages extends Component {
     static propTypes = {
         pivot: PropTypes.object,
         getPivot: PropTypes.func,
         rotate90: PropTypes.func,
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
    }

    componentWillReceiveProps({pivot}) {
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
        const {getPivot} = this.props;
        const pivot = {
        h : (name==='h') ? checked : this.state.h,
        v : (name==='v') ? checked : this.state.v
        };

        this.setState({[name]:checked});

        getPivot(pivot);
    }

    onCover(e){
        const {transformPreset} = this.props;
        return transformPreset(e.target.name);
    }

    onRotate(){
        this.props.rotate90(1);
    }
    render() {
        const params = {maxScale:2.8, minScale:0.4};
        const miroir = this.state;
        const {placement=''} = this.props;

        return (
            <div className="manip-reglages-icons" >
              <input
                className="input-hidden"
                id="miroir-h"
                name="h"
                type="checkbox"
                checked={this.state.h}
                onChange={this.onPivot}
                />
                <label htmlFor="miroir-h"
                className="label-reglage">
                    <Icon name="pivotH" checked={this.state.h} />
                <Text small color={'white'}>Miroir hztl</Text>
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
                className="label-reglage">
                    <Icon name="pivotV" checked={this.state.v} />
                <Text small color={'white'}>Miroir vtcl</Text>
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
                <Text small color={'white'}>Tourner</Text>
                </label>

                <div style={{margin: 'auto'}}/>

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
                <Text small color={'white'}>Couvrir</Text>
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
                <Text small color={'white'}>Contenir</Text>
                </label>

                </div>
        );
    }
}