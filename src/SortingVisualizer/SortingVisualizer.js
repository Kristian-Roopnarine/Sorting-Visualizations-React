import React from 'react'
import "./SortingVisualizer.css"
import quickSort from "./quicksort.js"
import Button from '@material-ui/core/Button'


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
            
            for (let i = 0; i < sortedArray.length; i++){
                const arrayBar = document.getElementsByClassName('array-bar');
                // sortedArray is a list of lists that contain [currentPivotIndex,currentComparison]
                const [index1,index2,swap] = sortedArray[i];
                const barOne = arrayBar[index1];
                const barTwo = arrayBar[index2];
                // get the style of each
                const barOneStyle = barOne.style;
                const barTwoStyle = barTwo.style;

                // is true every second element
                // change color every second element
                const doSwap = swap === 1
                const colorChange = i % 2 === 1
                if (colorChange === true && doSwap === true){
                    setTimeout(()=>{  
                        barOneStyle.backgroundColor = DEFAULT_COLOR;
                        const barOneHeight = barOneStyle.height
                        const barTwoHeight = barTwoStyle.height
                        barOneStyle.height = `${barTwoHeight}`
                        barTwoStyle.height = `${barOneHeight}`
                    },i*1);
                } else if (colorChange === false){
                    setTimeout(()=>{
                        barOneStyle.backgroundColor = COMPARISON_COLOR;
                    },i*1);
                }
            };
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
            <div className="flex-container">

                <div className="array-container">
                    {array.map((value,idx) => <div className="array-bar" key={idx} style={{height:`${value}px`,backgroundColor:DEFAULT_COLOR}}></div>)}
                </div>

                <div className="flex-container">
                    <Button color="primary" variant ="contained" onClick ={this.createNewArray}>Create a new Array!</Button>
                    <Button color="primary" variant ="contained" onClick ={this.startQuickSort}>Start Quicksort!</Button>
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