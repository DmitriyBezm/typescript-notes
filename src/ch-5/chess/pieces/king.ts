class King extends Piece {
  canMoveTo(position: Position): boolean {
    const distance = this.position.distanceFrom(position)
    return distance.rank < 2 && distance.file < 2
  }
}
