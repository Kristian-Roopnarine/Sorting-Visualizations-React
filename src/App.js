import React from 'react';
import ReactDOM from 'react-dom'
import './App.css';
import SortingVisualizer from "./SortingVisualizer/SortingVisualizer.js"
import "./SortingVisualizer/SortingVisualizer.css"
import quickSort from "./SortingVisualizer/quicksort.js"
import insertionSort from "./SortingVisualizer/insertionsort.js"
import bubbleSort from "./SortingVisualizer/bubblesort.js"
import SortingButtons from "./SortingVisualizer/SortingButtons.js"

const DEFAULT_COLOR = 'white'
const PIVOT_COLOR = 'red'
const COMPARISON_COLOR = 'red'
const MOVING_PIVOT = '#A3E4D7'
const ARRAY_SIZE = 250

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      array : [],
      sorted: false,
      sorting:false,  
    }
    // binds the onclick to a variable
    this.createNewArray = this.createNewArray.bind(this)
    this.startQuickSort = this.startQuickSort.bind(this)
    this.startInsertionSort = this.startInsertionSort.bind(this)
    this.startBubbleSort = this.startBubbleSort.bind(this)
  }
    //this should sort the current array
    //it then updates the state to re render the page
    startQuickSort=()=>{
      if (this.state.sorted === false && this.state.sorting === false){
          this.setState({sorting:true});
          let sortedArray = quickSort(this.state.array,0,this.state.array.length-1)
          
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
        setTimeout(()=>{
          this.setState({sorting:false});
        },1 * sortedArray.length)
        this.setState({sorted:true});
      } else {
        return; 
      }
  }
    startBubbleSort = () => {
      if(this.state.sorted === false && this.state.sorting === false){
        this.setState({sorting:true});
        let sortedArray = bubbleSort(this.state.array)

        for (let i = 0; i < sortedArray.length; i++){
            const arrayBar = document.getElementsByClassName('array-bar');
            const [index1,index2] = sortedArray[i];
            const barOne = arrayBar[index1];
            const barTwo = arrayBar[index2];
            const barOneStyle = barOne.style;
            const barTwoStyle = barTwo.style;

            const colorChange = i % 2 === 1

            if (colorChange === true){
                setTimeout(()=>{
                    const barOneHeight = barOneStyle.height
                    const barTwoHeight = barTwoStyle.height
                    barOneStyle.height = `${barTwoHeight}`
                    barTwoStyle.height = `${barOneHeight}`
                },i*0.5)
            }
        }
        setTimeout(()=>{
          this.setState({sorting:false});
        },0.5 * sortedArray.length)
        this.setState({sorted:true});
      } else {
        return
      }  
  }

    startInsertionSort = () => {
      if (this.state.sorted === false && this.state.sorting === false){
        this.setState({sorting:true});
        let sortedArray = insertionSort(this.state.array)
        for (let i = 0; i < sortedArray.length;i++){
            const arrayBar = document.getElementsByClassName('array-bar');
            const [index1,index2] = sortedArray[i];
            const barOne = arrayBar[index1];
            const barTwo = arrayBar[index2];
            const barOneStyle = barOne.style;
            const barTwoStyle = barTwo.style;

            const colorChange = i % 2 === 1

            if (colorChange === true){
                setTimeout(()=>{
                    const barOneHeight = barOneStyle.height
                    const barTwoHeight = barTwoStyle.height
                    barOneStyle.height = `${barTwoHeight}`
                    barTwoStyle.height = `${barOneHeight}`
                },i*0.25)
            }
        }
        setTimeout(()=>{
          this.setState({sorting:false});
        },0.25 * sortedArray.length)
        this.setState({sorted:true});
      } else {
        return
      }
    };
    // when the page loads and DOM is inserted then the array will be populated.
    componentDidMount=()=>{
        this.resetArray();
    }
    // when button clicked, will create new array
    createNewArray=()=>{
        this.resetArray()
    }
    //helper function to generate array.
    resetArray=()=>{
      if (this.state.sorting === false){
        const array = [];
        //generate new number and push into array
        for (let i = 0; i < ARRAY_SIZE ; i++){
            array.push(randomIntFromInterval(5,400))
        };
        this.setState({array:array,sorted:false,sorting:false});
      } else {
        return
      }
        
    }

  render(){
    const {array,animations,sorted,sorting} = this.state
    return (
      <div className="App">

        <SortingButtons 
          startQS = {this.startQuickSort} 
          newArray = {this.createNewArray}
          startIS = {this.startInsertionSort}
          startBS = {this.startBubbleSort}
        />
        <SortingVisualizer
          array = {array}
        ></SortingVisualizer>

      </div>
      
    );
  }
  
}

export default App;

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}