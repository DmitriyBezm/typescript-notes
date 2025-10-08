// делаем из файла модуль
export {}

// Форма для случая, когда значение есть
interface Some<T> {
  _tag: 'Some';
  value: T;
}

// Форма для случая, когда значения нет
interface None {
  _tag: 'None';
}

// Объединяем их в один тип Option
type Option<T> = Some<T> | None;

type User = {
  id: number;
  name: string;
}

const users: User[] = [{ id: 1, name: "Alice" }];

// Вспомогательные функции для удобного создания
const some = <T>(value: T): Option<T> => ({ _tag: 'Some', value });
const none = (): Option<never> => ({ _tag: 'None' });

// Новая версия возвращает: Option<User>
function findUserById(id: number, users: User[]): Option<User> {
  const user = users.find(u => u.id === id);
  
  // Если пользователь найден, заворачиваем его в `some`. Иначе возвращаем `none`.
  return user ? some(user) : none();
}

const getUserById = (id: number) => {
  const result = findUserById(1, users);
  if (result._tag === 'Some') {
  // TypeScript теперь ЗНАЕТ, что здесь есть свойство `value`
   return result.value.name;
  } else {
    // А здесь он знает, что это `None`
    return 'User not found'
  }
}
