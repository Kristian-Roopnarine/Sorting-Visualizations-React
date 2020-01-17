import React from 'react'
import "./SortingVisualizer.css"

export default class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);
        // State of this parent will be an array. When the array is changed then the DOM will re-render.
        // Might cause performance issues later.
        // I want this array to be populated when the page is loaded.
        // The array will be filled with 200 bars, of random values.
        // Need to setState after array is populated.
        this.state = {
            array : []
        }
        // binds the onclick to a variable
        this.createNewArray=this.createNewArray.bind(this)
    }
    // when the page loads and DOM is inserted then the array will be populated.
    componentDidMount(){
        this.resetArray();
    }
    // when button clicked, will create new array
    createNewArray(){
        this.resetArray()
    }
    //helper function to generate array.
    resetArray(){
        const array = [];
        //generate new number and push into array
        for (let i = 0; i < 300 ; i++){
            array.push(randomIntFromInterval(5,400))
        };
        this.setState({array:array});
    }

    render() {
        const array = this.state.array;
        //turn each of the array elements into a dom element
        return (
            <div className="array-container">
                {array.map((value,idx) => <div className="array-bar" key={idx} style={{height:`${value}px`}}></div>)}
                <div>
                    <button class="qs-button" type="Submit">Start Quicksort!</button>
                    <button class="qs-button" type="Submit" onClick={this.createNewArray}>Create New Array!</button>
                </div>
                
            </div> 
        );
    }
}


// Generates random integers between min and max value.
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }