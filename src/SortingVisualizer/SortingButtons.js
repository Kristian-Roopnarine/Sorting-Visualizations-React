import React from 'react'
import "./SortingVisualizer.css"
import Button from '@material-ui/core/Button'


export default class SortingButtons extends React.Component {
    constructor(props){
        super(props); 
    }

    render() {
        return (
                <div className = "navbar bg-dark py-3">

                    <div class="col text-center">
                        <button  type="button" className = "btn btn-info" onClick ={this.props.newArray}>Create a new Array!</button>
                    </div>

                    <div class="col text-center">
                        <button  type="button" className = "btn btn-info" onClick ={this.props.startQS}>Start Quicksort!</button>
                        
                    </div>

                    <div class="col text-center">
                        <button  type="button" className = "btn btn-info" onClick ={this.props.startIS}>Start Insertion sort!</button>
                        
                    </div>

                    <div class="col text-center">
                        <button  type="button" className = "btn btn-info" onClick ={this.props.startBS}>Start Bubble sort!</button>
                        
                    </div>

        
                </div>
        )
    }
}