type State = {
  [key: string]: string
}

class StringDatabase {
  state: State = {}
  get(key: string): string | null {
    return key in this.state ? this.state[key] : null
  }
  set(key: string, value: string): void {
    this.state[key] = value
  }
  static from(state: State) {
    const db = new StringDatabase()
    // tslint:disable-next-line:forin
    for (const key in state) {
      db.set(key, state[key])
    }
    return db;
  }
}

/**
 * Класс StringDatabase генерирует не только
 * выражения на уровнях типов и значений,
 * но и два выражения на уровне типов:
 * одно в виде интерфейса экземпляра класса,
 * другое в виде интерфейса конструктора класса.
 * Пример сгенерированного интерфейса экземпляра ниже:
 */
interface StringDatabase {
  state: State
  get(key: string): string | null
  set(key: string, value: string): void
}

/**
 * Конструктор класса StringDatabase доступен с помощью оператора typeof
 * пример такого типа, который будет сгенерирован ниже:
 */
interface StringDatabaseConstructor {
  new(state?: State): StringDatabase
  from(state?: State): StringDatabase
}