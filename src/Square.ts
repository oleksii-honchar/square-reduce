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

    // someone white will dominate
    if (noChildren || isSomeoneWhite) {
      return new Square([],this.isWhite() || square.isWhite());
    }

    // someone's children will override simple black
    const isSomeoneBlack = !this.isWhite() || !square.isWhite();
    if (!noChildren && isSomeoneBlack) {
      const children = this.hasChildren() ? this.children : square.getChildren();
      return new Square(children);
    }

    // let's merge
    let children = [];
    let mergeWith = null;
    if (this.hasChildren()) {
      children = this.children;
      mergeWith = square
    } else {
      children = square.getChildren();
      mergeWith = this;
    }

    children = children.map(
      (childSquare: Square, idx) => childSquare.merge(mergeWith.getChildByIdx(idx))
    );

    return new Square(children);
  }
}
