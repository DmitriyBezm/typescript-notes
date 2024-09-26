// // Type declaration
// type Food = {
//   calories: number
//   tasty: boolean
// }
// type Sushi = Food & {
//   salty: boolean
// }
// type Cake = Food & {
//   sweet: boolean
// }
//
// // Interface declaration
// interface IFood {
//   calories: number
//   tasty: boolean
// }
// interface ISushi extends IFood {
//   salty: boolean
// }
// interface ICake extends IFood {
//   sweet: boolean
// }
//
// // Interface declaration
// interface IA {
//   good(x: number): string
//   bad(x: number): string
// }
//
// /* Error  Interface 'IB' incorrectly extends interface 'IA'.
// Types of property 'bad' are incompatible.
//   Type '(x: string) => string' is not assignable to type '(x: number) => string'.
//     Types of parameters 'x' and 'x' are incompatible.
//       Type 'number' is not assignable to type 'string'.
// */
// interface IB extends IA {
//   good(x: string | number): string
//   bad(x: string): string
// }
//
// // Type declaration
// type A = {
//   good(x: number): string
//   bad(x: number): string
// }
//
// type B = A & {
//   good(x: string | number): string
//   // TS compile overloaded "bad" method signature
//   bad(x: string): string
// }
