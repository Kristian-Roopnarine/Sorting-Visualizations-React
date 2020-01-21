import React from 'react'
import "./SortingVisualizer.css"

const DEFAULT_COLOR = 'blue'
export default class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);
    }    
    
    render() {
        return (
            <div>
                <div className ="container mt-5">
                    {this.props.array.map((value,idx) => <div className="array-bar bg-info" key={idx} style={{height:`${value}px`}}></div>)}
                </div>
            </div>
            
        );
    }
}


