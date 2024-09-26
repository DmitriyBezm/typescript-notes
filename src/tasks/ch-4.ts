interface IS {
  <T>(valueA: T, valueB: T): boolean
  <T>(...args: T[][]): boolean
}

const is: IS = <T>(valueA: T, valueB: T) => {
  return valueA === valueB
}

is(10, 11)
is([10, 12], [11, 12], [123, '123'])