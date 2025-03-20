const KnightMoves = function (start, end) {
  let graph = Array(7);
  for (let i = 0; i < graph.length; i++) {
    graph[i] = Array(7);
  }

  // console.log(graph);

  function getMoves([i, j], [x, y]) {
    if (i <= x && j <= y) {
      if (x - i >= y - j || j === y) {
        return [
          [i + 2, j + 1],
          [i + 1, j + 2],
          [i + 2, j - 1],
          [i + 1, j - 2],
          [i - 1, j + 2],
          [i - 1, j - 2],
          [i - 2, j + 1],
          [i - 2, j - 1],
        ];
      } else {
        return [
          [i + 1, j + 2],
          [i + 2, j + 1],
          [i - 1, j + 2],
          [i - 2, j + 1],
          [i + 2, j - 1],
          [i - 2, j - 1],
          [i + 1, j - 2],
          [i - 1, j - 2],
        ];
      }
    } else if (i <= x && j >= y) {
      if (x - i >= y - j || j === y) {
        return [
          [i + 2, j - 1],
          [i + 1, j - 2],
          [i + 2, j + 1],
          [i + 1, j + 2],
          [i - 1, j - 2],
          [i - 1, j + 2],
          [i - 2, j - 1],
          [i - 2, j + 1],
        ];
      } else {
        return [
          [i + 1, j - 2],
          [i + 2, j - 1],
          [i - 1, j - 2],
          [i - 2, j - 1],
          [i + 2, j + 1],
          [i - 2, j + 1],
          [i + 1, j + 2],
          [i - 1, j + 2],
        ];
      }
    } else if (i >= x && j >= y) {
      if (x - i >= y - j || j === y) {
        return [
          [i - 2, j - 1],
          [i - 2, j + 1],
          [i - 1, j - 2],
          [i - 1, j + 2],
          [i + 1, j - 2],
          [i + 1, j + 2],
          [i + 2, j - 1],
          [i + 2, j + 1],
        ];
      } else {
        return [
          [i - 1, j - 2],
          [i - 2, j - 1],
          [i + 1, j - 2],
          [i + 2, j - 1],
          [i - 2, j + 1],
          [i + 2, j + 1],
          [i - 1, j + 2],
          [i + 1, j + 2],
        ];
      }
    } else if (i >= x && j <= y) {
      if (x - i >= y - j || j === y) {
        return [
          [i - 2, j + 1],
          [i - 1, j + 2],
          [i - 2, j - 1],
          [i - 1, j - 2],
          [i + 1, j + 2],
          [i + 1, j - 2],
          [i + 2, j + 1],
          [i + 2, j - 1],
        ];
      } else {
        return [
          [i - 1, j + 2],
          [i - 2, j + 1],
          [i + 1, j + 2],
          [i + 2, j + 1],
          [i - 2, j - 1],
          [i + 2, j - 1],
          [i - 1, j - 2],
          [i + 1, j - 2],
        ];
      }
    }
  }

  function hasPosition(i, j, queue, positions) {
    let hasPosition = false;
    for (let index = 0; index < positions.length; index++) {
      if (positions[index][0] === i && positions[index][1] === j) {
        hasPosition = true;
        break;
      }
    }
    for (let index = 1; index < queue.length; index++) {
      if (queue[index][0] === i && queue[index][1] === j) {
        hasPosition = true;
        break;
      }
    }
    return hasPosition;
  }

  function init([i, j], [x, y], queue = [[i, j]], positions = []) {
    positions.push([i, j]);
    if (queue.length <= 0) return;
    let possibleMoves = getMoves([i, j], [x, y]);
    const step = [i, j];
    let currentPosition = graph[i][j] ? graph[i][j] : [];
    for (let index = 0; index < possibleMoves.length; index++) {
      const move = possibleMoves[index];
      const i = move[0];
      const j = move[1];
      if (i >= 0 && i <= 7 && j >= 0 && j <= 7) {
        if (i === x && j === y) {
          currentPosition.push([i, j]);
          graph[step[0]][step[1]] = currentPosition;
          positions.push([i, j]);
          return positions;
        } else {
          let stop = hasPosition(i, j, queue, positions);
          if (!stop) {
            currentPosition.push([i, j]);
            queue.push([i, j]);
          }
        }
      }
    }
    graph[i][j] = currentPosition;
    queue.shift();
    let path = getPath(queue[0], [x, y], queue, positions);

    if (path) return path;
  }

  function getPath([i, j], [x, y], count = 0) {
    count++;
    if (i === x && j === y) {
      let path = Array(count - 1);
      path[count] = [i, j];
      return path;
    }
    let nextMoves = graph[i][j];
    if (nextMoves.length <= 0) return;
    let path = getPath(nextMoves, [x, y], count);
    for (let index = 1; index < nextMoves.length; index++) {
      let nextPath = getPath(nextMoves, [x, y], count);
      if (nextPath) {
      }
    }
  }

  init(start, end);
  return getPath(start, end);
};

console.log(KnightMoves([0, 0], [3, 3]));
