export {}

interface User {
  name: string
}

interface User {
  age: number
}

// Declaration merging example
const user: User = {
  name: 'John',
  age: 20,
}

interface Animal {
  readonly name: string
  eat(food: string): void
  sleep(hours: number): void
}

interface Feline {
  meow(): void
}

class Cat implements Animal, Feline {
  constructor(readonly name: string) {
  }
  eat(food: string) {
    // tslint:disable-next-line:no-console
    console.info('Ate some', food, '. Mmm!')
  }
  sleep(hours: number) {
    // tslint:disable-next-line:no-console
    console.info('Slept for', hours, 'hours')
  }
  meow() {
    // tslint:disable-next-line:no-console
    console.info('Meow')
  }
}
