import React from 'react';
import './Form2Preview.css';

class Form2Preview extends React.Component {

    render() {
        return ( 
            <div dangerouslySetInnerHTML={{ __html: this.props.content }} />                  
        );
    }
}

export default Form2Preview;