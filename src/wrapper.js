import React, {Component} from 'react';

        
 export default  class Wrapper extends Component {
        constructor(props) {
            super(props)
            this.getRect = this.getRect.bind(this);
            this.resizeContainer = this.resizeContainer.bind(this);
        }
        state = {}
        debounceResizeContainer = null

        componentDidMount() {
            this.getRect(this.wrapper);
            window.addEventListener('resize', this.resizeContainer);
        }

        componentWillUnmount() {
            window.removeEventListener('resize', this.resizeContainer);
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

            const childrenWithProps = React.Children
                .map(this.props.children,
                (child) => React.cloneElement(child, {dims})
                );

            return (
                <div 
                    className="manip-wrapper" 
                    ref={ref => this.wrapper = ref}  >

                        {childrenWithProps}
                </div>

            );
        }
    }

