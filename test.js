import { KnightMoves } from "./main.js";

const Test = function () {
  KnightMoves([0, 0], [3, 3]);
  KnightMoves([3, 3], [0, 0]);
  KnightMoves([0, 0], [7, 7]);
  KnightMoves([5, 3], [0, 6]);
  KnightMoves([4, 7], [2, 1]);
  KnightMoves([3, 4], [7, 1]);
  KnightMoves([6, 4], [0, 6]);
  KnightMoves([6, 6], [6, 6]);
};

Test();
