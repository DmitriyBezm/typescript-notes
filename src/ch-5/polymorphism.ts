/** Обобщенный тип в виде класса */
class MyMapClass<K, V> {
  constructor(initialKey: K, initialValue: V) {
    // ...
  }
  get(key: K): V {
    // ...
  }
  set(key: K, value: V) {
    // ...
  }
  merge<K1, V1>(map: MyMapClass<K1, V1>): MyMapClass<K | K1, V | V1> {
    // ...
  }
  static of<K, V>(k: K, v: V): MyMapClass<K, V> {
    // ...
  }
}

/** Обобщенный тип в виде интерфейса */
interface MyMap<K, V> {
  get(key: K): V
  set(key: K, value: V): void
}

const myMapInstanceA = new MyMapClass<string, number>('k', 1);
const myMapInstanceB = new MyMapClass('k', true);

myMapInstanceA.get('k')
myMapInstanceB.set('k', false)