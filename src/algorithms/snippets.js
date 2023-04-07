const snippets = [
  {
    algo: "A*-Algorithm-Manhattan-Distance",
    code: "function aStarAlgorithm(startNode, endNode, nodesGraph) {\r\n  startNode.distanceFromStart = 0;\r\n  startNode.estimatedDistanceToEnd = calculateManhattanDistance(\r\n    startNode,\r\n    endNode\r\n  );\r\n  const nodesToVisit = new MinHeap([startNode]);\r\n\r\n  while (!nodesToVisit.isEmpty()) {\r\n    const currentMinDistanceNode = nodesToVisit.remove();\r\n\r\n    if (currentMinDistanceNode === endNode) break;\r\n\r\n    const neighbors = getNeighbors(currentMinDistanceNode, nodesGraph);\r\n    for (const neighbor of neighbors) {\r\n      if (neighbor.isWall) continue;\r\n\r\n      const tentativeDistanceToNeighbor =\r\n        currentMinDistanceNode.distanceFromStart + neighbor.weight;\r\n\r\n      if (tentativeDistanceToNeighbor >= neighbor.distanceFromStart) continue;\r\n\r\n      neighbor.cameFrom = currentMinDistanceNode;\r\n      neighbor.distanceFromStart = tentativeDistanceToNeighbor;\r\n      neighbor.estimatedDistanceToEnd =\r\n        tentativeDistanceToNeighbor +\r\n        calculateManhattanDistance(neighbor, endNode);\r\n\r\n      if (!nodesToVisit.containsNode(neighbor)) nodesToVisit.insert(neighbor);\r\n      else nodesToVisit.update(neighbor);\r\n    }\r\n  }\r\n  return reconstructPath(endNode);\r\n}\r\n\r\nfunction calculateManhattanDistance(currentNode, endNode) {\r\n  return (\r\n    Math.abs(currentNode.row - endNode.row) +\r\n    Math.abs(currentNode.col - endNode.col)\r\n  );\r\n}\r\n\r\nfunction getNeighbors(node, nodesGraph) {\r\n  const neighbors = [];\r\n  const nodesGraphHeight = nodesGraph.length - 1;\r\n  const nodesGraphWidth = nodesGraph[0].length - 1;\r\n  const { row, col } = node;\r\n\r\n  if (row + 1 <= nodesGraphHeight) neighbors.push(nodesGraph[row + 1][col]);\r\n  if (row - 1 >= 0) neighbors.push(nodesGraph[row - 1][col]);\r\n  if (col + 1 <= nodesGraphWidth) neighbors.push(nodesGraph[row][col + 1]);\r\n  if (col - 1 >= 0) neighbors.push(nodesGraph[row][col - 1]);\r\n\r\n  return neighbors;\r\n}\r\n\r\nfunction reconstructPath(endNode) {\r\n  if (!endNode.cameFrom) return [];\r\n\r\n  const path = [];\r\n  let currentNode = endNode;\r\n  while (currentNode) {\r\n    path.push([currentNode.row, currentNode.col]);\r\n    currentNode = currentNode.cameFrom;\r\n  }\r\n  return path.reverse();\r\n}",
  },
  {
    algo: "A*-Algorithm-Diagonal-Distance",
    code: "function aStarAlgorithm(startNode, endNode, nodesGraph) {\r\n  startNode.distanceFromStart = 0;\r\n  startNode.estimatedDistanceToEnd = calculateDiagonalDistance(startNode, endNode);\r\n  const nodesToVisit = new MinHeap([startNode]);\r\n\r\n  while (!nodesToVisit.isEmpty()) {\r\n    const currentMinDistanceNode = nodesToVisit.remove();\r\n\r\n    if (currentMinDistanceNode === endNode) break;\r\n\r\n    const neighbors = getNeighbors(currentMinDistanceNode, nodesGraph);\r\n    for (const neighbor of neighbors) {\r\n      if (neighbor.isWall) continue;\r\n\r\n      const tentativeDistanceToNeighbor =\r\n        currentMinDistanceNode.distanceFromStart + neighbor.weight;\r\n\r\n      if (tentativeDistanceToNeighbor >= neighbor.distanceFromStart) continue;\r\n\r\n      neighbor.cameFrom = currentMinDistanceNode;\r\n      neighbor.distanceFromStart = tentativeDistanceToNeighbor;\r\n      neighbor.estimatedDistanceToEnd =\r\n        tentativeDistanceToNeighbor + calculateDiagonalDistance(neighbor, endNode);\r\n\r\n      if (!nodesToVisit.containsNode(neighbor)) nodesToVisit.insert(neighbor);\r\n      else nodesToVisit.update(neighbor);\r\n    }\r\n  }\r\n  return reconstructPath(endNode);\r\n}\r\n\r\nfunction calculateDiagonalDistance(currentNode, finishNode) {\r\n  const { row, col } = currentNode;\r\n  const { row: fRow, col: fCol } = finishNode;\r\n\r\n  const NORMAL_COST = 1;\r\n  const DIAGONAL_COST = NORMAL_COST * 1.414;\r\n\r\n  const dMax = Math.max(Math.abs(row - fRow), Math.abs(col - fCol));\r\n  const dMin = Math.min(Math.abs(row - fRow), Math.abs(col - fCol));\r\n\r\n  return DIAGONAL_COST * dMin + NORMAL_COST * (dMax - dMin);\r\n}\r\n\r\nfunction getNeighbors(node, nodesGraph) {\r\n  const neighbors = [];\r\n  const nodesGraphHeight = nodesGraph.length - 1;\r\n  const nodesGraphWidth = nodesGraph[0].length - 1;\r\n  const { row, col } = node;\r\n\r\n  if (row + 1 <= nodesGraphHeight) neighbors.push(nodesGraph[row + 1][col]);\r\n  if (row - 1 >= 0) neighbors.push(nodesGraph[row - 1][col]);\r\n  if (col + 1 <= nodesGraphWidth) neighbors.push(nodesGraph[row][col + 1]);\r\n  if (col - 1 >= 0) neighbors.push(nodesGraph[row][col - 1]);\r\n\r\n  if (row > 0 && col > 0) neighbors.push(nodesGraph[row - 1][col - 1]);\r\n  if (row > 0 && col < nodesGraphWidth) neighbors.push(nodesGraph[row - 1][col + 1]);\r\n  if (row < nodesGraphWidth && col < nodesGraphWidth)\r\n    neighbors.push(nodesGraph[row + 1][col + 1]);\r\n  if (row < nodesGraphWidth && col > 0) neighbors.push(nodesGraph[row + 1][col - 1]);\r\n\r\n  return neighbors;\r\n}\r\n\r\nfunction reconstructPath(endNode) {\r\n  if (!endNode.cameFrom) return [];\r\n\r\n  const path = [];\r\n  let currentNode = endNode;\r\n  while (currentNode) {\r\n    path.push([currentNode.row, currentNode.col]);\r\n    currentNode = currentNode.cameFrom;\r\n  }\r\n  return path.reverse();\r\n}",
  },
  {
    algo: "Dynamic-Path-finding",
    code: "function aStarAlgorithm(startNode, endNode, nodesGraph) {\r\n  startNode.distanceFromStart = 0;\r\n  startNode.estimatedDistanceToEnd = calculateManhattanDistance(\r\n    startNode,\r\n    endNode\r\n  );\r\n  const nodesToVisit = new MinHeap([startNode]);\r\n\r\n  while (!nodesToVisit.isEmpty()) {\r\n    const currentMinDistanceNode = nodesToVisit.remove();\r\n\r\n    if (currentMinDistanceNode === endNode) break;\r\n\r\n    const neighbors = getNeighbors(currentMinDistanceNode, nodesGraph);\r\n    for (const neighbor of neighbors) {\r\n      if (neighbor.isWall) continue;\r\n\r\n      const tentativeDistanceToNeighbor =\r\n        currentMinDistanceNode.distanceFromStart + neighbor.weight;\r\n\r\n      if (tentativeDistanceToNeighbor >= neighbor.distanceFromStart) continue;\r\n\r\n      neighbor.cameFrom = currentMinDistanceNode;\r\n      neighbor.distanceFromStart = tentativeDistanceToNeighbor;\r\n      neighbor.estimatedDistanceToEnd =\r\n        tentativeDistanceToNeighbor +\r\n        calculateManhattanDistance(neighbor, endNode);\r\n\r\n      if (!nodesToVisit.containsNode(neighbor)) nodesToVisit.insert(neighbor);\r\n      else nodesToVisit.update(neighbor);\r\n    }\r\n  }\r\n  return reconstructPath(endNode);\r\n}\r\n\r\nfunction calculateManhattanDistance(currentNode, endNode) {\r\n  return (\r\n    Math.abs(currentNode.row - endNode.row) +\r\n    Math.abs(currentNode.col - endNode.col)\r\n  );\r\n}\r\n\r\nfunction getNeighbors(node, nodesGraph) {\r\n  const neighbors = [];\r\n  const nodesGraphHeight = nodesGraph.length - 1;\r\n  const nodesGraphWidth = nodesGraph[0].length - 1;\r\n  const { row, col } = node;\r\n\r\n  if (row + 1 <= nodesGraphHeight) neighbors.push(nodesGraph[row + 1][col]);\r\n  if (row - 1 >= 0) neighbors.push(nodesGraph[row - 1][col]);\r\n  if (col + 1 <= nodesGraphWidth) neighbors.push(nodesGraph[row][col + 1]);\r\n  if (col - 1 >= 0) neighbors.push(nodesGraph[row][col - 1]);\r\n\r\n  return neighbors;\r\n}\r\n\r\nfunction reconstructPath(endNode) {\r\n  if (!endNode.cameFrom) return [];\r\n\r\n  const path = [];\r\n  let currentNode = endNode;\r\n  while (currentNode) {\r\n    path.push([currentNode.row, currentNode.col]);\r\n    currentNode = currentNode.cameFrom;\r\n  }\r\n  return path.reverse();\r\n}",
  },
  {
    algo: "Dijkstra-Algorithm",
    code: "function dijkstra(startNode, finishNode, nodesGraph) {\r\n  startNode.distanceFromStart = 0;\r\n\r\n  const nodesToVisit = new MinHeap([startNode]);\r\n\r\n  while (!nodesToVisit.isEmpty()) {\r\n    const currentNodeWithMinDistance = nodesToVisit.remove();\r\n\r\n    currentNodeWithMinDistance.visited = true;\r\n\r\n    if (currentNodeWithMinDistance.distanceFromStart === Infinity) break;\r\n\r\n    if (currentNodeWithMinDistance === finishNode) break;\r\n\r\n    const neighbors = getNeighbors(currentNodeWithMinDistance, nodesGraph);\r\n\r\n    for (const neighbor of neighbors) {\r\n      if (neighbor.isWall || neighbor.visited) continue;\r\n\r\n      const neighborTentativeMinDistance =\r\n        currentNodeWithMinDistance.distanceFromStart + neighbor.weight;\r\n\r\n      if (neighborTentativeMinDistance >= neighbor.distanceFromStart) continue;\r\n\r\n      neighbor.distanceFromStart = neighborTentativeMinDistance;\r\n      neighbor.prevNode = currentNodeWithMinDistance;\r\n\r\n      if (!nodesToVisit.containsNode(neighbor)) nodesToVisit.insert(neighbor);\r\n      else nodesToVisit.update(neighbor);\r\n    }\r\n  }\r\n  return reconstructPath(finishNode);\r\n}\r\n\r\nfunction getNeighbors(node, nodesGraph) {\r\n  const neighbors = [];\r\n  const nodesGraphHeight = nodesGraph.length - 1;\r\n  const nodesGraphWidth = nodesGraph[0].length - 1;\r\n  const { row, col } = node;\r\n\r\n  if (row + 1 <= nodesGraphHeight) neighbors.push(nodesGraph[row + 1][col]);\r\n  if (row - 1 >= 0) neighbors.push(nodesGraph[row - 1][col]);\r\n  if (col + 1 <= nodesGraphWidth) neighbors.push(nodesGraph[row][col + 1]);\r\n  if (col - 1 >= 0) neighbors.push(nodesGraph[row][col - 1]);\r\n\r\n  return neighbors;\r\n}\r\n\r\nfunction reconstructPath(endNode) {\r\n  if (!endNode.cameFrom) return [];\r\n\r\n  const path = [];\r\n  let currentNode = endNode;\r\n  while (currentNode) {\r\n    path.push([currentNode.row, currentNode.col]);\r\n    currentNode = currentNode.cameFrom;\r\n  }\r\n  return path.reverse();\r\n}",
  },
  {
    algo: "Depth-First-Search",
    code: "function depthFirstSearch(startNode, finishNode, nodesGraph) {\r\n  const stack = [startNode];\r\n\r\n  startNode.visitedDFS = true;\r\n  startNode.distanceFromStart = 0;\r\n\r\n  let currentNode = startNode;\r\n\r\n  while (stack.length) {\r\n    const nextNode = getNeighbor(currentNode, nodesGraph);\r\n\r\n    if (nextNode) {\r\n      stack.push(nextNode);\r\n\r\n      nextNode.visited = true;\r\n      nextNode.distanceFromStart = currentNode.distanceFromStart + 1;\r\n      nextNode.prevNode = currentNode;\r\n\r\n      if (nextNode === finishNode) break;\r\n\r\n      currentNode = nextNode;\r\n    } else {\r\n      currentNode = stack.pop();\r\n    }\r\n  }\r\n  return reconstructPath(finishNode);\r\n}\r\n\r\nfunction getNeighbor(node, nodesGraph) {\r\n  const { row, col } = node;\r\n\r\n  if (row < nodesGraph.length - 1) {\r\n    const { visited, isWall } = nodesGraph[row + 1][col];\r\n    if (!visited && !isWall) return nodesGraph[row + 1][col];\r\n  }\r\n  if (col < nodesGraph[0].length - 1) {\r\n    const { visited, isWall } = nodesGraph[row][col + 1];\r\n    if (!visited && !isWall) return nodesGraph[row][col + 1];\r\n  }\r\n  if (row > 0) {\r\n    const { visited, isWall } = nodesGraph[row - 1][col];\r\n    if (!visited && !isWall) return nodesGraph[row - 1][col];\r\n  }\r\n  if (col > 0) {\r\n    const { visited, isWall } = nodesGraph[row][col - 1];\r\n    if (!visited && !isWall) return nodesGraph[row][col - 1];\r\n  }\r\n\r\n  return false;\r\n}\r\n\r\nfunction reconstructPath(finishNode) {\r\n  if (!finishNode.prevNode) return [];\r\n\r\n  const pathNodes = [];\r\n  let currentNode = finishNode;\r\n  while (currentNode) {\r\n    pathNodes.push(currentNode);\r\n    currentNode = currentNode.prevNode;\r\n  }\r\n  return pathNodes.reverse();\r\n}",
  },
  {
    algo: "Breadth-First-Search",
    code: "export default function breadthFirstSearch(startNode, finishNode, nodesGraph) {\r\n  let queue = [startNode];\r\n\r\n  startNode.visited = true;\r\n  startNode.distanceFromStart = 0;\r\n\r\n  while (queue.length) {\r\n    const currentNode = queue.shift();\r\n\r\n    const neighbors = getNeighbors(currentNode, nodesGraph);\r\n\r\n    for (const neighbor of neighbors) {\r\n      neighbor.visited = true;\r\n      neighbor.distanceFromStart = currentNode.distanceFromStart + 1;\r\n      neighbor.prevNode = currentNode;\r\n\r\n      if (neighbor === finishNode) break;\r\n      else queue.push(neighbor);\r\n    }\r\n  }\r\n  return reconstructPath(finishNode);\r\n}\r\n\r\nfunction getNeighbors(node, nodesGraph) {\r\n  const neighbors = [];\r\n  const { row, col } = node;\r\n\r\n  if (row < nodesGraph.length - 1) neighbors.push(nodesGraph[row + 1][col]);\r\n  if (col < nodesGraph[0].length - 1) neighbors.push(nodesGraph[row][col + 1]);\r\n  if (row > 0) neighbors.push(nodesGraph[row - 1][col]);\r\n  if (col > 0) neighbors.push(nodesGraph[row][col - 1]);\r\n\r\n  return neighbors.filter(({ visited, isWall }) => !visited && !isWall);\r\n}\r\n\r\nfunction reconstructPath(finishNode) {\r\n  if (!finishNode.prevNode) return [];\r\n  const pathNodes = [];\r\n  let currentNode = finishNode;\r\n  while (currentNode) {\r\n    pathNodes.push(currentNode);\r\n    currentNode = currentNode.prevNode;\r\n  }\r\n  return pathNodes.reverse();\r\n}",
  },
  {
    algo: "Selection-Sort",
    code: "function selectionSort(array) {\r\n  let min = 0;\r\n  for (let i = 0; i < array.length; i++) {\r\n    min = i;\r\n    for (let j = i; j < array.length; j++) {\r\n      if (array[j] < array[min]) min = j;\r\n    }\r\n    swap(array, min, i);\r\n  }\r\n  return array;\r\n}\r\n\r\nfunction swap(array, i, j) {\r\n  [array[i], array[j]] = [array[j], array[i]];\r\n}",
  },
  {
    algo: "Bubble-Sort",
    code: "function bubbleSort(array) {\r\n  let isSorted = false;\r\n  let endIdx = array.length - 1;\r\n\r\n  while (!isSorted) {\r\n    isSorted = true;\r\n    for (let i = 0; i < endIdx; i++) {\r\n      if (array[i] > array[i + 1]) {\r\n        swap(array, i, i + 1);\r\n        isSorted = false;\r\n      }\r\n    }\r\n    endIdx--;\r\n  }\r\n  return array;\r\n}\r\n\r\nfunction swap(array, i, j) {\r\n  [array[i], array[j]] = [array[j], array[i]];\r\n}",
  },
  {
    algo: "Insertion-Sort",
    code: "function insertionSort(array) {\r\n  for (let i = 1; i < array.length; i++) {\r\n    for (let j = i; j > 0; j--) {\r\n      if (array[j] < array[j - 1]) {\r\n        swap(array, j, j - 1);\r\n      }\r\n    }\r\n  }\r\n  return array;\r\n}\r\n\r\nfunction swap(array, i, j) {\r\n  [array[i], array[j]] = [array[j], array[i]];\r\n}",
  },
  {
    algo: "Radix-Sort",
    code: "function radixSort(array) {\r\n  if (array.length <= 1) return array;\r\n\r\n  const maxNumber = Math.max(...array);\r\n  let digit = 0;\r\n  while (maxNumber / 10 ** digit > 0) {\r\n    countingSort(array, digit);\r\n    digit++;\r\n  }\r\n  return array;\r\n}\r\n\r\nfunction countingSort(array, digit) {\r\n  const sortedArray = new Array(array.length).fill(0);\r\n  const countArray = new Array(10).fill(0);\r\n\r\n  const digitColumn = 10 ** digit;\r\n\r\n  for (const num of array) {\r\n    const numAtDigitColumn = Math.floor(num / digitColumn) % 10;\r\n    countArray[numAtDigitColumn]++;\r\n  }\r\n  for (let i = 1; i < 10; i++) {\r\n    countArray[i] += countArray[i - 1];\r\n  }\r\n  for (let i = array.length - 1; i >= 0; i--) {\r\n    let numAtDigitColumn = Math.floor(array[i] / digitColumn) % 10;\r\n    const sortedIdx = --countArray[numAtDigitColumn];\r\n    sortedArray[sortedIdx] = array[i];\r\n  }\r\n  for (let i = 0; i < array.length; i++) {\r\n    array[i] = sortedArray[i];\r\n  }\r\n}",
  },
  {
    algo: "Merge-Sort",
    code: "function mergeSort(array) {\r\n  if (array.length <= 1) return array;\r\n\r\n  let mid = Math.floor(array.length / 2);\r\n  let left = mergeSort(array.slice(0, mid));\r\n  let right = mergeSort(array.slice(mid));\r\n\r\n  return merge(left, right);\r\n}\r\n\r\nfunction merge(array1, array2) {\r\n  let i = 0;\r\n  let j = 0;\r\n  let sorted = [];\r\n\r\n  while (i < array1.length && j < array2.length) {\r\n    if (array2[j].height > array1[i].height) {\r\n      sorted.push(array1[i]++);\r\n    } else {\r\n      sorted.push(array2[j++]);\r\n    }\r\n  }\r\n  while (i < array1.length) {\r\n    sorted.push(array1[i]++);\r\n  }\r\n  while (j < array2.length) {\r\n    sorted.push(array2[j++]);\r\n  }\r\n  return sorted;\r\n}",
  },
  {
    algo: "Quick-Sort",
    code: "function quickSort(array, left, right) {\r\n  let index;\r\n  if (array.length > 1) {\r\n    index = partition(array, left, right);\r\n    if (left < index - 1) {\r\n      quickSort(array, left, index - 1);\r\n    }\r\n    if (index < right) {\r\n      quickSort(array, index, right);\r\n    }\r\n  }\r\n  return array;\r\n}\r\n\r\nfunction partition(array, left, right) {\r\n  let mid = Math.floor((right + left) / 2);\r\n  let i = left;\r\n  let j = right;\r\n\r\n  let pivot = array[mid];\r\n\r\n  while (i <= j) {\r\n    while (array[i] < pivot) i++;\r\n    while (array[j] > pivot) j--;\r\n\r\n    if (i <= j) swap(array, i++, j--);\r\n  }\r\n  return i;\r\n}\r\n\r\nfunction swap(array, i, j) {\r\n  [array[i], array[j]] = [array[j], array[i]];\r\n}",
  },
  {
    algo: "Heap-Sort",
    code: "function heapSort(array) {\r\n  buildMaxHeap(array);\r\n  for (let endIdx = array.length - 1; endIdx >= 1; endIdx--) {\r\n    swap(0, endIdx, array);\r\n    siftDown(0, endIdx - 1, array);\r\n  }\r\n  return array;\r\n}\r\n\r\nfunction buildMaxHeap(array) {\r\n  const firstParentIdx = Math.floor((array.length - 2) / 2);\r\n  for (let i = firstParentIdx; i >= 0; i--)\r\n    siftDown(i, array.length - 1, array);\r\n}\r\n\r\nfunction siftDown(parentIdx, endIdx, heap) {\r\n  let childOneIdx = parentIdx * 2 + 1;\r\n  while (childOneIdx <= endIdx) {\r\n    const childTwoIdx = childOneIdx + 1 <= endIdx && childOneIdx + 1;\r\n    const greaterChildIdx =\r\n      childTwoIdx && heap[childTwoIdx] > heap[childOneIdx]\r\n        ? childTwoIdx\r\n        : childOneIdx;\r\n    if (heap[greaterChildIdx] > heap[parentIdx]) {\r\n      swap(greaterChildIdx, parentIdx, heap);\r\n      parentIdx = greaterChildIdx;\r\n      childOneIdx = parentIdx * 2 + 1;\r\n    } else return;\r\n  }\r\n}\r\n\r\nfunction swap(i, j, array) {\r\n  [array[i], array[j]] = [array[j], array[i]];\r\n}\r\n",
  },
];

export default snippets;