export default function insertionSort(arr){
    const animations = []
    const length = arr.length;
    const middleArray = arr.slice()
    for (let i = 1; i < length;i++){
        let key = middleArray[i];
        let j = i-1;
        while (j >= 0 && middleArray[j] > key){
            middleArray[j+1] = middleArray[j]
            j = j-1;
            //arr[j+1]= key;
            animations.push([j+1,j+2])
            animations.push([j+1,j+2])
        }
        middleArray[j+1]= key;
        
    }
    return animations;
}

function swap(arr,a,b){
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}