import React from 'react'
import "./SortingVisualizer.css"
import quickSort from "./quicksort.js"

const DEFAULT_COLOR = 'blue'
const PIVOT_COLOR = 'red'
const COMPARISON_COLOR = 'yellow'
const MOVING_PIVOT = '#A3E4D7'

export default class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);
        // State of this parent will be an array. When the array is changed then the DOM will re-render.
        // Might cause performance issues later.
        // I want this array to be populated when the page is loaded.
        // The array will be filled with 200 bars, of random values.
        // Need to setState after array is populated.
        this.state = {
            array : [],
            animations :[],
            sorted: false,
        }
        // binds the onclick to a variable
        this.createNewArray = this.createNewArray.bind(this)
        this.startQuickSort = this.startQuickSort.bind(this)
    }   

    //this should sort the current array
    //it then updates the state to re render the page
    startQuickSort(){
        if (this.state.sorted == false){
            let sortedArray = quickSort(this.state.array,0,this.state.array.length-1,this.state.animations)
            for (let i = 0;i < sortedArray.length-1;i++){
                const arrayBar = document.getElementsByClassName('array-bar');
                const [pivotIndex,pivotValueIndex,comparison,swap] = sortedArray[i];
                const pivotValue = arrayBar[pivotValueIndex];
                const comparisonValue = arrayBar[comparison];
                const pivotIndexValue = arrayBar[pivotIndex];

                setTimeout(()=>{
                    // Changes bar colors to correct color
                    comparisonValue.style.backgroundColor = COMPARISON_COLOR;
                    pivotIndexValue.style.backgroundColor = MOVING_PIVOT;

                    if (swap === 1){
                        // if swapping pivot index and comparison (if arr[i] < pivotValue)
                        const barOneHeight = pivotIndexValue.style.height;
                        const barTwoHeight = comparisonValue.style.height;
                        pivotIndexValue.style.height = `${barTwoHeight}`;
                        comparisonValue.style.height = `${barOneHeight}`;
    
                    } else if (swap === 2){
                        // swap pivot value and pivot index (ending for loop in partition)
                        const barOneHeight = pivotValue.style.height;
                        const barTwoHeight = pivotIndexValue.style.height;
                        pivotValue.style.height = `${barTwoHeight}`;
                        pivotIndexValue.style.height = `${barOneHeight}`;
                    }
                    setTimeout(()=>{
                        //change the bars back to original color
                        comparisonValue.style.backgroundColor = DEFAULT_COLOR;
                        pivotIndexValue.style.backgroundColor = DEFAULT_COLOR;
                    },50);
                },i*1.5);
            }
            
        this.setState({sorted:true});
        } else {
            return; 
        }
        
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
        this.setState({array:array,animations:[]});
        this.setState({sorted:false})
    }

    render() {
        const array = this.state.array;
        //turn each of the array elements into a dom element
        return (
            <div className="array-container">
                {array.map((value,idx) => <div className="array-bar" key={idx} style={{height:`${value}px`,backgroundColor:DEFAULT_COLOR}}></div>)}
                <div>
                    <button className="qs-button" type="Submit" onClick ={this.startQuickSort}>Start Quicksort!</button>
                    <button className="qs-button" type="Submit" onClick={this.createNewArray}>Create New Array!</button>
                </div>
                
            </div> 
        );
    }
}


// Generates random integers between min and max value.
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

function swap2(a,b){
    let temp = a;
    a = b;
    b = temp;
    return a,b
}