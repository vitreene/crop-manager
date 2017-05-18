import React from "react"

import styles from "./index.css"

const Loading = () => (
  <div>
    <div className={ styles.loader }>
      <div className={ styles.spinner } />
    </div>
  </div>
)

export default Loading
