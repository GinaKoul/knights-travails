export const KnightMoves = function (start, end) {
  let graph = Array(8);
  for (let i = 0; i < graph.length; i++) {
    graph[i] = Array(8);
  }

  const getMoves = function ([i, j], [x, y]) {
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
  };

  const hasPosition = function (i, j, queue, positions) {
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
  };

  const init = function ([i, j], [x, y], queue = [[i, j]], positions = []) {
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
    let path = init(queue[0], [x, y], queue, positions);

    if (path) return path;
  };

  const getPath = function ([i, j], [x, y], count = 0) {
    if (i === x && j === y) {
      if (count === 0) {
        return [[i, j]];
      } else {
        let path = Array(count - 1);
        path[count] = [i, j];
        return path;
      }
    }
    let nextMoves = graph[i][j];
    if (!nextMoves) return;
    if (nextMoves?.length <= 0) return;
    count++;
    for (let index = 0; index < nextMoves.length; index++) {
      let nextPath = getPath(nextMoves[index], [x, y], count);
      if (nextPath) {
        nextPath[count - 1] = [i, j];
        return nextPath;
      }
    }
  };

  const printMoves = function (path) {
    console.log(`KnightMoves([${start[0]},${start[1]}],[${end[0]},${end[1]}])`);
    console.log(`You made it in ${path.length - 1} moves`);
    path.forEach((position) => {
      console.log(position);
    });
  };

  init(start, end);
  let path = getPath(start, end);
  printMoves(path);
};
