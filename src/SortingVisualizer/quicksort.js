export default function quickSort(arr,start,end){
    const animations = []
    const middleArray = arr.slice()
    quickSort2(middleArray,0,middleArray.length-1,animations)
    return animations
}

function quickSort2(arr,start,end,animations){
    if (start >= end) {
        return;
    }
    let index = partition(arr,start,end,animations);
    quickSort2(arr,start,index-1,animations);
    quickSort2(arr,index+1,end,animations);
}

function partition(arr,start,end,animations){
    let pivotIndex = start;
    let pivotValue = arr[end];
    for (let i = start ; i < end;i++){

        //end is the current pivotIndexValue
        //i returns the index of element being compared.
        // 0 if being compared, 1 if comparison and pivot are being swapped
        //animations.push([pivotIndex,end,i,0])
        //animations.push([pivotIndex,end,i,0])
        animations.push([pivotIndex,i,0])
        animations.push([pivotIndex,i,0])
        if (arr[i] < pivotValue){
            swap(arr,i,pivotIndex);
            animations.push([pivotIndex,i,1]);
            animations.push([pivotIndex,i,1]);
            pivotIndex++;
        }
    }
    swap(arr,pivotIndex,end);
    animations.push([pivotIndex,end,1])
    animations.push([pivotIndex,end,1])
    return pivotIndex;
}

function swap(arr,a,b){
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

