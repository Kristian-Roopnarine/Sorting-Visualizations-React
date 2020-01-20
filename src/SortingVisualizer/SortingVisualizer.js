import React from 'react'
import "./SortingVisualizer.css"
import quickSort from "./quicksort.js"
import insertionSort from "./insertionsort.js"
import bubbleSort from "./bubblesort.js"
import SortingButtons from "./SortingButtons.js"
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'

const DEFAULT_COLOR = 'white'
export default class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);
    }   

    render() {
        return (
            <div className ="bg-dark">
                <div className ="container border border-dark">
                    {this.props.array.map((value,idx) => <div className="array-bar" key={idx} style={{height:`${value}px`,backgroundColor:DEFAULT_COLOR}}></div>)}
                </div>
            </div>
            
        );
    }
}


