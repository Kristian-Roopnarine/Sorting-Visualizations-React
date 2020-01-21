import React from 'react';
import ReactDOM from 'react-dom'
import './App.css';
import SortingVisualizer from "./SortingVisualizer/SortingVisualizer.js"
import "./SortingVisualizer/SortingVisualizer.css"
import quickSort from "./SortingVisualizer/quicksort.js"
import insertionSort from "./SortingVisualizer/insertionsort.js"
import bubbleSort from "./SortingVisualizer/bubblesort.js"
import heapSort from "./SortingVisualizer/heapsort.js"
import SortingButtons from "./SortingVisualizer/SortingButtons.js"

const DEFAULT_COLOR = 'blue'
const COMPARISON_COLOR = 'red'
const MOVING_COLOR = 'blue'
const ARRAY_SIZE = 250

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      // empty array
      array : [],
      // is the array sorted?
      sorted: false,
      // is the array currently being sorted?
      sorting:false,  
    }
    // binds the onclick to a variable
    this.createNewArray = this.createNewArray.bind(this)
    this.startQuickSort = this.startQuickSort.bind(this)
    this.startInsertionSort = this.startInsertionSort.bind(this)
    this.startBubbleSort = this.startBubbleSort.bind(this)
    this.startHeapSort = this.startHeapSort.bind(this)
  }
    //this should sort the current array
    //it then updates the state to re render the page
    startQuickSort=()=>{
      if (this.state.sorted === false && this.state.sorting === false){
          // set the state of the app to currently sorting
          this.setState({sorting:true});
          let sortedArray = quickSort(this.state.array,0,this.state.array.length-1)
          
          for (let i = 0; i < sortedArray.length; i++){
              // get all the array bars being sorted, returns a list of them
              const arrayBar = document.getElementsByClassName('array-bar');

              // sortedArray is a list of lists that contain [currentPivotIndex,currentComparison]
              const [index1,index2,swap] = sortedArray[i];
              // find bar 1 and 2
              const barOne = arrayBar[index1];
              const barTwo = arrayBar[index2];

              // get the style of each
              const barOneStyle = barOne.style;
              const barTwoStyle = barTwo.style;

              
              const doSwap = swap === 1
              const colorChange = i % 2 === 1
              // the way the animation array is set up
              // transitions are pushed twice, so the same bar changes colors twice.
              // one for the swap and the other to revert back to regular color
              if (colorChange === true && doSwap === true){
                  // allows the code to run in the background and swap
                  setTimeout(()=>{  
                      barOneStyle.backgroundColor = DEFAULT_COLOR;
                      const barOneHeight = barOneStyle.height
                      const barTwoHeight = barTwoStyle.height
                      barOneStyle.height = `${barTwoHeight}`
                      barTwoStyle.height = `${barOneHeight}`
                  },i*1);
              } else if (colorChange === false){
                  // switches bar to red color
                  setTimeout(()=>{
                      barOneStyle.backgroundColor = COMPARISON_COLOR;
                  },i*1);
              }
          };
        setTimeout(()=> {
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
                },i*.25)
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

    // heap sort 
    startHeapSort = () => {
      if (this.state.sorted === false && this.state.sorting === false){
        this.setState({sorting:true});
        let sortedArray = heapSort(this.state.array)
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
                  barOneStyle.className = DEFAULT_COLOR;
                  barTwoStyle.className = DEFAULT_COLOR;
                  const barOneHeight = barOneStyle.height
                  const barTwoHeight = barTwoStyle.height
                  barOneStyle.height = `${barTwoHeight}`
                  barTwoStyle.height = `${barOneHeight}`
                },i*10)
            } else if (colorChange === false){
              // switches bar to red color
              setTimeout(()=>{
                  barOneStyle.backgroundColor = COMPARISON_COLOR;
                  barTwoStyle.backgroundColor = MOVING_COLOR;
              },i*10);
          }
        }
        setTimeout(()=>{
          this.setState({sorting:false});
        },10 * sortedArray.length)
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
          startHS = {this.startHeapSort}
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