/**
 * Created by yusuke-pc on 2017/06/23.
 */
"use strict";

//このthisはブラウザ環境だとwindowを指す
console.log(1, this);
(() => {
    console.log(2, this);
})();

class Sample {
    hello() {
        return this;
    }
}

//この時のthisはsample1を指す
const sample1 = new Sample();
sample1.name = "1だよ";
console.log(3, sample1.hello());

//
const sample2 = new Sample();
sample2.name = "2だよ";
//関数を受け渡ししている
sample2.hello = sample1.hello;
console.log(4, sample2.hello());

const obj = {
    hello: sample1.hello(),
};
console.log(5, obj.hello());

const hello = sample1.hello;
console.log(6, hello());
//
// sample2.hello = function () {
//     return this;
// };
// console.log(7, sample2.hello());
//
// sample2.hello = () => {
//     return this;
// };
// console.log(8, sample2.hello());
//
// function addEventListener(name, fn) {
//     console.log(name, fn());
// }
//
// // el.addEventListener("click", 関数);
//
// console.log(9, sample1.hello());
// addEventListener(10, sample1.hello);
// addEventListener(11, () => {
//     return sample1.hello();
// });
//
// function returnThis() {
//     return this;
// }
// console.log(12, returnThis.bind(1)());
// console.log(13, returnThis.apply(1));
// addEventListener(14, sample1.hello.bind(sample1));
//
// class Foo {
//     constructor(name) {
//         this._name = name;
//
//         this.hello = this.hello.bind(this);
//         this.sayHello = this.sayHello.bind(this);
//     }
//
//     get name() {
//         return this._name || "Foo";
//     }
//
//     hello() {
//         return `Hello, ${this.name}`;
//     }
//
//     sayHello() {
//         setTimeout(() => {
//             console.log(this);
//             console.log(16, this.hello());
//         }, 1000);
//     }
// }
//
// console.log(15, new Foo().hello());
// new Foo().sayHello();
//
// const foo = new Foo();
// const fooHello = foo.hello;
// console.log(17, fooHello());