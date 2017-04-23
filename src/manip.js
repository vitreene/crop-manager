import React, {PropTypes} from "react"

import Inputs from './inputs'
import Reglages from './reglages'

// import styles from "./index.css"

const Manip = (props) => {
  return (
    <div id={props.id} className="manip-conteneur">
      <Inputs/>
      <Reglages/>
    </div>
  )
}

Manip.propTypes = {
  children: PropTypes.node
};

Manip.contextTypes = {
  isPortfolio: PropTypes.bool
};

export default Manip
