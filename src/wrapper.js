import React, {Component, PropTypes} from 'react';
import Loading from './Loading'

const isClient = typeof window !== "undefined";
        
export default  class Wrapper extends Component {
     static propTypes = {
        onConteneurResize: PropTypes.func,
     }
    constructor(props) {
        super(props)
        this.getRect = this.getRect.bind(this);
        this.resizeContainer = this.resizeContainer.bind(this);
    }
    state = { isLoading: true}

    debounceResizeContainer = null

    componentDidMount() {
        this.getRect(this.wrapper);
        isClient && window.addEventListener('resize', this.resizeContainer);
    }

    componentWillUnmount() {
        isClient && window.removeEventListener('resize', this.resizeContainer);
    }

    resizeContainer() {
        const {wrapper, getRect} = this;
        let {debounceResizeContainer} = this;

        clearTimeout(debounceResizeContainer);
        debounceResizeContainer = setTimeout(() => {
            getRect(wrapper);
        }, 250)
    }

    getRect(el) {
        if (isClient && el) {
            const {onConteneurResize} = this.props;
            const {width, height, left, top} = el.getBoundingClientRect();

            const contDX = left + window.scrollX;
            const contDY = top + window.scrollY;

            onConteneurResize({
                containerSize: {width, height},
                containerPos: {contDX, contDY},
            })
            // console.log('containerSize', width, height);
            
            this.setState({isLoading: false});
        }
    }

    render() {
        const {isLoading} = this.state;
        const {children} = this.props;

        return (
            <div 
                className="manip-wrapper" 
                ref={ref => this.wrapper = ref}  >

                    { isLoading 
                        ? <Loading/>
                        : children
                    }
            </div>

        );
    }
}

