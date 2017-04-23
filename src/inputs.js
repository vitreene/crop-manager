import React, {Component} from 'react';

export default class Inputs extends Component {
    constructor(props) {
        super(props)
        this.getRect = this
            .getRect
            .bind(this);
        this.resizeContainer = this
            .resizeContainer
            .bind(this);
    }
    state = {}
    debounceResizeContainer = null

    componentDidMount() {
        this.getRect(this.ref);
        window.addEventListener('resize', this.resizeContainer);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeContainer);
    }

    resizeContainer() {
        const {ref, getRect} = this;
        let {debounceResizeContainer} = this;
        clearTimeout(debounceResizeContainer);
        debounceResizeContainer = setTimeout(() => {
            getRect(ref);
        }, 250)
    }

    getRect(el) {
        if (el) {
            const {width, height, left, top} = el.getBoundingClientRect();
            const ratio = (height === 0)
                ? 1
                : width / height;
            const cote = Math.min(width, height);

            this.setState({
                containerWidth: width,
                containerHeight: height,
                containerDX: left + window.scrollX,
                containerDY: top + window.scrollY,
                ratio,
                cote
            });
        }
    }

    render() {
        const {cote} = this.state;
        const dims = cote
            ? {
                width: cote,
                height: cote
            }
            : null;
        return (
            <div 
            className="manip-inputs" 
            ref={ref => this.ref = ref}
            >
                <div 
                className="manip-edit-conteneur" 
                style={dims}
                >
                    test
                </div>
            </div>
        );
    }
}