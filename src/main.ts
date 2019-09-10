import { Square } from './Square';

const black = new Square([], false);
const white = new Square([], true);

const innerSq1 = new Square([ black, white, white, white ]);
const sq1 = new Square([ black, black, innerSq1, black ] );

const innerSq2 = new Square([ black, white, white, black ]);
const sq2 = new Square([ white, innerSq2, white, black ] );

const res = sq1.merge(sq2);
