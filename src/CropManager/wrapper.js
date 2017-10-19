import React, {Component} from 'react'
import PropTypes from 'prop-types'

// import Loading from './UI/Loading'
import LayerInfo from './Layers/layer-info'

import {isClient} from './config/constantes'
        
export default  class Wrapper extends Component {
    static propTypes = {
        handleControl: PropTypes.func,
     }
    constructor(props) {
        super(props)
        this.getRect = this.getRect.bind(this);
        this.resizeContainer = this.resizeContainer.bind(this);
    }
    ref = null;
    debounceResizeContainer = null;

    componentDidMount() {
        this.getRect(this.ref);
        isClient && window.addEventListener('resize', this.resizeContainer);
    }

    componentWillUnmount() {
        isClient && window.removeEventListener('resize', this.resizeContainer);
    }

    resizeContainer() {
        const {ref, getRect} = this;
        let {debounceResizeContainer} = this;

        clearTimeout(debounceResizeContainer);
        debounceResizeContainer = setTimeout(() => {
            getRect(ref);
        }, 60)
    }

    getRect(el) {
        if (isClient && el) {
            const {width, height, left, top} = el.getBoundingClientRect();
            const contDX = left + window.scrollX;
            const contDY = top + window.scrollY;

            this.props.handleControl(
                'resize',
                {
                    containerSize: {width, height},
                    containerPos: {contDX, contDY}
                }
            )
        }
    }

    get wrapperClass(){ 
        const wrapperClass = "manip-wrapper paves ";
        const dropActif = this.props.dropzoneActive ? "drop-actif" : ''
        return wrapperClass + dropActif;
    }

    render() {
        const {hasSrc} = this.props;
        return (
            <div
            className={this.wrapperClass}
            ref={r => this.ref = r}>
                { hasSrc
                    ? this.props.children 
                    : <LayerInfo/>
                }
            </div>

        );
    }
}
