// eslint-disable-next-line
import React, {Component, PropTypes} from 'react';
import Loading from './Loading'
const isClient = typeof window !== "undefined";
        
 export default  class Wrapper extends Component {
     static propTypes = {

     }
    constructor(props) {
        super(props)
        this.getRect = this.getRect.bind(this);
        this.resizeContainer = this.resizeContainer.bind(this);
    }
    state = {
        isLoading: true
    }
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
            const {width, height, left, top} = el.getBoundingClientRect();
            const ratio = (height === 0)
                ? 1
                : width / height;
            const cote = Math.min(width, height);

            const contDX = left + window.scrollX;
            const contDY = top + window.scrollY;
                
            // const midX = Math.round( (width * 0.5) );
            // const midY = Math.round( (height * 0.5) );                
            // const midX = Math.round( contDX + (width * 0.5) );
            // const midY = Math.round( contDY + (height * 0.5) );                

            this.setState({
                containerSize: {width, height},
                containerPos: {contDX, contDY},
                // middle: {midX, midY},
                ratio, // deprecie ?
                cote, // deprecie ?
                isLoading: false
            });
        }
    }

    render() {
        const {/*middle, */ isLoading, containerSize, containerPos} = this.state;

        const childrenWithProps = React.Children
            .map(this.props.children,
            (child) => React.cloneElement(child, {/*middle, */ containerSize, containerPos})
            );

        return (
            <div 
                className="manip-wrapper" 
                ref={ref => this.wrapper = ref}  >

                   { isLoading 
                   ? <Loading/>
                   : childrenWithProps
                   }
            </div>

        );
    }
}

