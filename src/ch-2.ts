type BlueThings = {
    color: 'blue'
}

type RedThings = {
    color: 'red'
}

type BigThings = {
    size: 'big'
}

type SmallThings = {
    size: 'small'
}

/*
    Тип (Intersection) "&" - пересечение объектов по свойствам.
    Чтобы вещь была маленькой голубой, она должна быть и маленькой и голубой.
    Чем больше указано свойств, тем меньше выборка.
*/
type BlueSmallThings = BlueThings & SmallThings

let b: BlueSmallThings = {
    size: 'small',
    color: 'blue'
}

/*
    Тип (Union) "|" объединение объектов по свойствам.
    Либо маленькие вещи, либо голубые вещи. Либо маленькие голубые вещи.
*/
type BlueOrSmallThings = BlueThings | SmallThings

let c: BlueOrSmallThings = {
    size: 'small',
    color: 'blue'
}

let d: BlueOrSmallThings = b

type RedOrBlueThings = BlueThings & RedThings