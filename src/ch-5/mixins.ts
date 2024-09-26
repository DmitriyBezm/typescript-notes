// class User {
//
// }
//
// User.debug()

type ClassConstructor = new (...args: any) => {}

function withEZDebug<C extends ClassConstructor>(Class: C) {
  return class extends Class {
    constructor(...args: any[]) {
      super(...args);
    }
  }
}
