// Представляет игру в шахматы
class Game {
  private pieces = Game.makePieces()

  private static makePieces() {
    return [
      // Короли
      new King('White', 'E', 1),
      new King('Black', 'E', 8),

      // Ферзи
      new Queen('White', 'D', 1),
      new Queen('Black', 'D', 8),

      // Слоны
      new Bishop('White', 'C', 1),
      new Bishop('White', 'F', 1),
      new Bishop('Black', 'C', 8),
      new Bishop('Black', 'F', 8),
    ]
  }
}