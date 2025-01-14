function ask() {
  return prompt('When is your birthday?')
}

function parse(birthday: string): Date {
  return new Date(birthday)
}

let date = parse(ask())
console.info('Date is', date.toISOString())