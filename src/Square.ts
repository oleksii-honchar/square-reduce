export class Square {
  isWhiteFill: boolean;
  children: Square [];

  constructor(children?: Square [], isWhite?: boolean) {
    this.children = children;
    this.isWhiteFill = isWhite;
  }

  isWhite() {
    return this.isWhiteFill;
  }

  hasChildren() {
    return this.children.length === 4;
  }

  getChildByIdx(idx): Square {
    // если нет детей - вернуть себя
    return this.children[idx] || this;
  }

  getChildren(): Square [] {
    return this.children;
  }

  merge(square: Square) {
    const noChildren = !this.hasChildren() && !square.hasChildren();
    const isSomeoneWhite = this.isWhite() || square.isWhite();
    if (noChildren || isSomeoneWhite) {
      return new Square([],this.isWhite() || square.isWhite());
    }

    let children = this.hasChildren() ? this.children : square.getChildren();
    children = children.map(
      (childSquare: Square, idx) => childSquare.merge(square.getChildByIdx(idx))
    );

    return new Square(children);
  }
}
