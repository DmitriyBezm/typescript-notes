// Набор координат шахматной фигуры
class Position {
  constructor(
    // координаты по горизонтали
    private file: File,
    // координаты по вертикали
    private rank: Rank,
  ) {}

  distanceFrom(position: Position) {
    return {
      rank: Math.abs(position.rank - this.rank),
      file: Math.abs(
        position.file.charCodeAt(0) - this.file.charCodeAt(0)
      )
    }
  }
}