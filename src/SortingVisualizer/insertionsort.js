export default function insertionSort(arr,animations){
    const length = arr.length;
    for (let i = 1; i < length;i++){
        let key = arr[i];
        let j = i-1;
        while (j >= 0 && arr[j] > key){
            arr[j+1] = arr[j]
            j = j-1;
            //arr[j+1]= key;
            animations.push([j+1,j+2])
            animations.push([j+1,j+2])
        }
        arr[j+1]= key;
        
    }
    return animations;
}

function swap(arr,a,b){
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}