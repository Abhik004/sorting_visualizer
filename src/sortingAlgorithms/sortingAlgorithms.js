export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx=Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray,startIdx, middleIdx,mainArray,animations);
    mergeSortHelper(auxiliaryArray,middleIdx + 1,endIdx,mainArray,animations);
    doMerge(mainArray, startIdx,middleIdx,endIdx,auxiliaryArray,animations);
  }
  
  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k=startIdx;
    let i=startIdx;
    let j=middleIdx+1;
    while (i <= middleIdx && j <= endIdx){
      animations.push([i, j]);
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } 
      else{
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i<=middleIdx){
      animations.push([i, i]);
      animations.push([i, i]);
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      animations.push([j, j]);
      animations.push([j, j]);
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }



  export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
  }
  
  function quickSortHelper(array, low, high, animations) {
    if (low < high) {
      const pivotIdx = partition(array, low, high, animations);
      quickSortHelper(array, low, pivotIdx - 1, animations);
      quickSortHelper(array, pivotIdx + 1, high, animations);
    }
  }
  
  function partition(array, low, high, animations) {
    const pivot = array[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      animations.push([j, high]);
      animations.push([j, high]);
      if (array[j] <= pivot) {
        i++;
        animations.push([i, array[j]]);
        animations.push([j, array[i]]);
        [array[i], array[j]] = [array[j], array[i]];
      } else {
        animations.push([j, array[j]]);
      }
    }
    animations.push([i + 1, array[high]]);
    animations.push([high, array[i + 1]]);
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    return i + 1;
  }

  
  export function getHeapSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    buildMaxHeap(array, animations);
    for (let endIdx = array.length - 1; endIdx > 0; endIdx--) {
      animations.push([0, endIdx]);
      animations.push([0, endIdx]);
      animations.push([endIdx, array[0]]);
      animations.push([0, array[endIdx]]);
      [array[0], array[endIdx]] = [array[endIdx], array[0]];
      heapify(array, 0, endIdx, animations);
    }
    return animations;
  }
  
  function buildMaxHeap(array, animations) {
    const startIdx = Math.floor(array.length / 2 - 1);
    for (let i = startIdx; i >= 0; i--) {
      heapify(array, i, array.length, animations);
    }
  }
  
  function heapify(array, idx, length, animations) {
    let largest = idx;
    const left = 2 * idx + 1;
    const right = 2 * idx + 2;
  
    if (left < length && array[left] > array[largest]) largest = left;
    if (right < length && array[right] > array[largest]) largest = right;
  
    if (largest !== idx) {
      animations.push([idx, largest]);
      animations.push([idx, largest]);
      animations.push([idx, array[largest]]);
      animations.push([largest, array[idx]]);
      [array[idx], array[largest]] = [array[largest], array[idx]];
      heapify(array, largest, length, animations);
    }
  }

  
  export function getBubbleSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        animations.push([j, j + 1]);
        animations.push([j, j + 1]);
        if (array[j] > array[j + 1]) {
          animations.push([j, array[j + 1]]);
          animations.push([j + 1, array[j]]);
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
        } else {
          animations.push([j, array[j]]);
          animations.push([j + 1, array[j + 1]]);
        }
      }
    }
    return animations;
  }
  