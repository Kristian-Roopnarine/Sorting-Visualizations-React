function quickSort(arr,start,end){
    if (start >= end) {
        return;
    }
    let index = partition(arr,start,end);
    quickSort(arr,start,index)
    quickSort(arr,index+1,end)
}

function partition(arr,start,end){
    let pivotIndex = start;
    let pivotValue = arr[end];
    for (let i = start ; i < end;i++){
        if (arr[i] < pivotValue){
            swap(arr,i,pivotIndex);
            pivotIndex++;
        }
    }
    swap(arr,pivotIndex,end);
    return pivotIndex;
}

function swap(arr,a,b){
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

