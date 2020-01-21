function parent(i){
    return [i/2]
}

function left(i){
    return 2 * i
}

function right(i){
    return (2*i) + 1
}

function maxHeapify(A,i,animations){
    var l = left(i);
    var r = right(i);
    var largest;
    if (l < A.heapSize && A[l] > A[i]){
        largest = l
    } else {
        largest = i
    };
    if (r < A.heapSize && A[r] > A[largest]){
        largest = r
    }
    if (largest !== i){
        swap(A,i,largest)
        if (largest > 0){
            animations.push([i,largest])
            animations.push([i,largest])    
        }
        maxHeapify(A,largest,animations)
    }
}

function buildMaxHeap(A,animations){
    A.heapSize = A.length
    for (let i = A.length/2;0 <= i; i-=1){
        maxHeapify(A,i,animations)
    }
    return A
}

export default function heapSort(A){
    const middleArray = A.slice();
    const animations = [];
    buildMaxHeap(middleArray,animations)
    for (let i = middleArray.length-1;0<i;i--){
        swap(middleArray,i,0)
        animations.push([i,0])
        animations.push([i,0])
        middleArray.heapSize = middleArray.heapSize - 1
        maxHeapify(middleArray,0,animations)
    }
    return animations
}


function swap(arr,a,b){
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}