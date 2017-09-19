import React, {Component, PropTypes} from 'react';
import Loading from './UI/Loading'

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

    render() {
        const {isLoading, hasSrc} = this.props;
        // loading s'arrette lorsque l'image est prete, mais pas le proxy
        return (
            <div
            className="manip-wrapper" 
            ref={r => this.ref = r}>
                { isLoading
                    ? <Loading/>
                    : hasSrc && this.props.children 
                }
            </div>

        );
    }
}
