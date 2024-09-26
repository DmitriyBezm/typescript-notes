enum Language {
  Spanish,
  English
}

enum Language {
  Russian = 100,
}

// enum Color {
//   Red = '#c10000',
//   Blue = '#007ac1',
//   Pink = 0xc10050,
//   White = 255
// }

enum Flippable {
  Burger = 'Burger',
  Chair = 'Chair',
  Cup = 'Cup',
  Skateboard = 'Skateboard',
  Table = 'Table',
}

function flip(t: Flippable) {
  return 'flipped it'
}

flip(Flippable.Burger)
flip(Flippable.Chair)
