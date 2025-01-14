/** Существующий пользователь, переданный с сервера */
type ExistingUser = {
  id: number;
  name: string;
}

/** Новый пользователь, еще не сохраненный на сервере */
type NewUser = {
  name: string;
}

function deleteUser(user: { id?: number; name: string }) {
  delete user.id;
  return user;
}

const user1: ExistingUser = {
  id: 1,
  name: 'Boruh'
}

const user2: NewUser = {
  name: 'Jhonson'
}

/** Передам более строгий тип */
deleteUser(user2)

type LegacyUser = {
  id?: number | string;
  name: string;
}

const legacyUser: LegacyUser = {
  id: '793331',
  name: 'Xin Yang',
}

/** Пытаемся передать более широкий тип, чем ожидает функция */
deleteUser(legacyUser);

class Animal {}
class Bird extends Animal {
	chirp() {}
}
class Crow extends Bird {
	caw() {}
}

function chirp(bird: Bird): Bird {
  bird.chirp()
  return bird
}

function clone(f: (b: Bird) => Bird): void {
  
}
function birdToBird(b: Bird): Bird {}
function birdToCrow(b: Bird): Crow {}
function birdToAnimal(b: Bird): Animal {}

chirp(new Animal())
chirp(new Bird())
chirp(new Crow())

clone(birdToBird)
clone(birdToCrow)
clone(birdToAnimal)

/** Продвинутые типы объектов */
type FriendList = {
  count: number;
  friends: {
    firstName: string;
    lastName: string;
  }[]
}

type APIResponse = {
  user: {
    userId: string;
    friendList: {
      count: number;
      friends: {
        firstName: string;
        lastName: string;
      }[]
    };
  }
}

function getAPIResponse(): Promise<APIResponse> {}

function renderFriendList(friendList: FriendList) {}

let response = await getAPIResponse();
renderFriendList(response.user.friendList);

type APIResponseKeys = keyof APIResponse['user'];

type Get = {
  <
    O extends object,
    K1 extends keyof O
  >(obj: O, key1: K1): O[K1];
  <
    O extends object,
    K1 extends keyof O,
    K2 extends keyof O[K1]
  >(obj: O, key1: K1, key2: K2): O[K1][K2];
  <
    O extends object,
    K1 extends keyof O,
    K2 extends keyof O[K1],
    K3 extends keyof O[K1][K2]
  >(obj: O, key1: K1, key3: K3): O[K1][K2][K3];
}

/** Пример типобезопасной функции с помощью оператора keyof */ 
let get: Get = (obj: any, keys: string[]) => {
	let result = obj;
  keys.forEach(k => result = result[k]);
  return result;
}

const data = {
  userId: 1,
  exercies: {
    name: 'Awesome name',
    type: 'sprint'
  }
}

get(data, 'userId')
get(data, 'exercies', 'name')
get(data, 'exercies', 'bad')


/** Тип Record */
type Weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'
type Day = Weekday | 'Sat' | 'Sun'

// 1 способ
// let nextDay: Record<Weekday, Day> = {
//   Mon: 'Tue'
// }

// 2 способ
let nextDay: {[K in Weekday]: Day} = {
  Mon: 'Tue'
};

/** Некоторые возможности отображения типов */
type Account = {
  id: number;
  isEmployee: boolean;
  notes: string[];
}

/** Делаем все поля опциональными */
type OptionalAccount = {
  [K in keyof Account]?: Account[K] 
}

/** Сделать все поля, допускающими null */
type NullableAccount = {
  [K in keyof Account]?: Account[K] | null;
}

/** Сделать все поля readonly */
type ReadOnlyAccount = {
  readonly [K in keyof Account]: Account[K];
}

/** Снова все поля записываемыми */
type Account2 = {
  -readonly [K in keyof ReadOnlyAccount]: Account[K];
}

/** Снова все поля обязательными */
type Account3 = {
  readonly [K in keyof OptionalAccount]-?: Account[K];
}

type Currency = {
  unit: 'EUR' | 'GBP' | 'JPY' | 'USD';
  value: number;
}

let Currency = {
  DEFAULT: 'USD',
  from(value: number, unit = Currency.DEFAULT): Currency {
    return {
      unit,
      value
    }
  }
}

// let a = [1, true] as const;

function tuple<T extends unknown[]>(...ts: T) {
  return ts
}
let a = tuple(1, true);

// function isString(a: unknown): a is string {
//   return typeof a === 'string';
// }

// function parseInput(input: string | number) {
//   let formattedInput: string;
//   if (isString(input)) {
//     formattedInput = input.toUpperCase();
//   } else {
//     input.join('123')
//   }
// }

/** Условные типы */
type IsString<T> = T extends string ? true : false;
type A = IsString<number>;
type B = IsString<string>;

type Without<T, U> = T extends U ? never : T;

type C = Without<boolean | number | string, boolean>

type SecondArg<F> = F extends (a: any, b: infer B) => any ? B : never

type SliceTypeSecondArg = SecondArg<typeof Array['prototype']['slice']>

/** Номинальные типы */
type CompanyID = string & {readonly brand: unique symbol}
type OrderID = string & {readonly brand: unique symbol}
type UserID = string & {readonly brand: unique symbol}
type ID = CompanyID | OrderID | UserID

function CompanyID(id: string) {
  return id as CompanyID
}
function OrderID(id: string) {
  return id as OrderID
}
function UserID(id: string) {
  return id as UserID
}

function getQueryForUser(id: UserID) {}

let companyId = CompanyID('8a6076cf')
let orderId = OrderID('9994acc1')
let userId = UserID('d21b1dbf')

getQueryForUser(companyId)

// Задача написать тип, который выделяет уникальные типы
// 1 | 2 | 3, 2 | 3 | 4 -> 1 | 4

type ExclusiveFirst<T, U> = T extends U ? never : T;
// Исключаем общие типы из первого и второго общих типов и затем объединяем исключенные
type Exclusive<T, U> = ExclusiveFirst<T, U> | ExclusiveFirst<U, T>

// Пример работы Exclusive<T, U> для пары 1 | 2 | 3, 2 | 3 | 4

// 1 Сравнение пары U, T
// a. 1 extends 2 | 3 | 4 -> 1;
// b. 2 extends 2 | 3 | 4 -> never;
// c. 3 extends 2 | 3 | 4 -> never;
// d. Выводится тип 1 | never | never

// 2 Сравнение пары T, U
// a. 2 extends 1 | 2 | 3 -> never;
// b. 3 extends 1 | 2 | 3 -> never;
// c. 4 extends 1 | 2 | 3 -> 4;
// d. Выводится тип never | never | 4

// 3 Объединяем результаты двух предыдущих шагов через или
// a. (1 | never | never) | (never | never | 4)
// b. упрощается до 1 | 4

type UP1 = Exclusive<1 | 2 | 3, 2 | 3 | 4>; // 1 | 4
type UP2 = Exclusive<2 | 3 | 4, 1 | 2 | 3>; // 1 | 4
type UP3 = Exclusive<2 | 3 | 4 | 5 | 6 | 7, 1 | 2 | 3>; // 1 | 4 | 5 | 6 | 7
type UP4 = Exclusive<1 | 2 | 3, 2 | 3 | 4 | 5 | 6 | 7>; // 1 | 4 | 5 | 6 | 7

// type Exclusive2<T, U> = T extends U ? Exclusive2<U, T> : never;
