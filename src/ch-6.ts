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