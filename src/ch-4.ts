function fancyDate(this: Date) {
  return `${this.getDate()}/${this.getMonth()}/${this.getFullYear()}`
}

// fancyDate(); // error
fancyDate.call(new Date())

type Greet = (name: string) => string
type Log = (message: string, userId?: string) => void
type SumVariadicSafe = (...numbers: number[]) => number

let log: Log = (
  message,
  userId = 'Not signed in'
) => {
  const time = new Date().toISOString()
  console.log(time, message, userId)
}

interface Reservation {
  a: string
}

type Reserve = {
  (from: Date, to: Date, destination: string): Reservation
  (from: Date, destination: string): Reservation
  (destination: string): Reservation
}

// Functions
type Filter = <T>(array: T[], f: (item: T) => boolean) => T[]

const filter: Filter = (array, f) => {
  const result = []
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    if (f(item)) {
      result.push(item)
    }
  }
  return result;
}

const names = [
  {
    firstName: 'Alex',
  },
  {
    firstName: 'Bob',
  },
  {
    firstName: 'Martin',
  },
]

filter([1, 2, 3], _ => _ > 2)
filter(['1', '2', '3'],  _ => _ !== 'b')
filter(names, _ => _.firstName.startsWith('b'))

function map<T, U>(array: T[], f: (item: T) => U): U[] {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result[i] = f(array[i])
  }
  return result;
}

map(
  ['a', 'b', 'c'],
  _ => _ === 'a'
)

// Promises
let promise = new Promise<number>((resolve) => resolve(45))
promise.then((res) => res * 4)

// сall
function call<T extends unknown[], R>(
  f: (...args: T) => R,
  ...args: T
): R {
  return f(...args)
}

function fill(length: number, value: string): string[] {
  return Array.from({ length }, () => value)
}

call(fill, 10, 'a');
