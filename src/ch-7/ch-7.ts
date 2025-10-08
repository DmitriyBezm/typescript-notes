// function ask() {
//   return prompt('When is your birthday?')
// }

function isValidDate(date: Date) {
  return Object.prototype.toString.call(date) === '[object Date]' && !Number.isNaN(date.getTime())
}

// function parse(birthday: string): Date {
//   const date = new Date(birthday);

//   if (!isValidDate(date)) {
//     throw new RangeError('Enter a date in the form YYYY/MM/DD');
//   }

//   return date;
// }

// try {
//   let date = parse(ask())
//   console.info('Date is: ', date.toISOString())
// } catch(e) {
//   if (e instanceof RangeError) {
//     console.error(e.message)
//   } else {
//     throw e
//   }
// }

// Maybe тип
interface OptionPattern<T> {
  flatMap<U>(f: (value: T) => None): None
  flatMap<U>(f: (value: T) => OptionPattern<U>): OptionPattern<U>
  getOrElse(value: T): T
}

class Some<T> implements OptionPattern<T> {
  constructor(private value: T) {}
  flatMap<U>(f: (value: T) => None): None
  flatMap<U>(f: (value: T) => Some<U>): Some<U>
  flatMap<U>(f: (value: T) => OptionPattern<U>): OptionPattern<U> {
    return f(this.value);
  }
  getOrElse(): T {
    return this.value;
  }
}

class None implements OptionPattern<never> {
  flatMap(): None {
    return this;
  }
  getOrElse<U>(value: U): U {
    return value;
  }
}

function OptionPattern<T>(value: null | undefined): None
function OptionPattern<T>(value: T): Some<T>
function OptionPattern<T>(value: T): OptionPattern<T> {
  if (value == null) {
    return new None;
  }

  return new Some(value);
}

// let result = OptionPattern(6)
//   .flatMap(n => OptionPattern(n * 3))
//   .flatMap(n => new None)
//   .getOrElse(7)

function ask() {
  let result = prompt('When is your birthday?');
  if (result === null) {
    return OptionPattern([]);
  }

  return [result];
}

function parse(birthday: string) {
  const date = new Date(birthday);

  if (!isValidDate(date)) {
    return [];
  }

  return [date];
}

ask()
  .flatMap(parse)
  .flatMap(date => new Some(date.toISOString()))
  .flatMap(date => new Some('Date is ' + date))
  .getOrElse('Error parsing date for some reason')
