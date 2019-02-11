import React, { Component } from 'react';
import PropTypes from 'proptypes'
import styles from './Letter.module.scss'

class Letter extends Component {
    
    render(){
        return (
            this.props.guessed ? <div className={styles.letter}>{this.props.letter}</div> : <div className={styles.blank}></div>
       )
    }
}

Letter.propTypes = {
    letter: PropTypes.string, 
    guessed: PropTypes.bool,
}
Letter.defaultProps = {
    guessed: false,
}

export default Letter