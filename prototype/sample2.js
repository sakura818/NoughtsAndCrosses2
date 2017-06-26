/**
 * Created by yusuke-pc on 2017/06/23.
 */
//高階関数
/*
 function higherOrder(values, fnc) {
 for (let val in values) {
 fnc(values[val]);
 }
 }
 higherOrder([1, 3, 5], function (val) {
 console.log(val);
 });
 */

/*
 スコープチェーン
 javascriptがどんな順序で変数やプロパティを参照するか。。を取り決めたルール
 Callオブジェクト、、、関数を呼び出す度に内部的に生成されるオブジェクトで、関数内のローカル変数を管理するもの
 通常は意識する必要はないもの。
 スコープチェーンとは、GlobalオブジェクトとCallオブジェクトを、生成した順に連結したリストのようなモノ。
 一番最初に生成されるGlobalオブジェクトを末端とし、Callオブジェクトが生成される度にその先端に紐づけている。
 javascriptの変数解決（変数を見つける作業）はこのリストの先頭から順に辿り、最初に見つけた値を使用する。
 */
/*
 let x = 'Global';
 let y = 'Global';
 function outerFunc() {
 let x = 'Local Outer';

 function innerFunc() {
 let x = 'Local Inner';

 //Local Inner
 console.log(x); //Local Inner

 //Global
 console.log(y); //Global

 //undefined
 //console.log(z); //undefined
 }

 console.log(x); //Local Outer
 innerFunc();
 }
 console.log(x); //Global
 outerFunc();
 */

/*
 クロージャ
 ローカル変数を参照している、関数の中に定義している関数のこと
 グローバル変数の代わりとして利用できる
 メンバに加える処理がシンプルなオブジェクトの代わりとして

 */
/*
 function closure(initVal) {
 let count = initVal;

 let innerFunc = function () {
 return ++count;
 };

 //例えばここで
 //return innerFunc()とすると毎回101と返すようになる
 return innerFunc;
 }

 //本来、countはローカル変数なので、毎回101となるはずだが、
 let myClosure = closure(100);
 console.log(myClosure());
 console.log(myClosure());
 */

//アローファンクション
/*
 let func = val => {
 console.log(val);
 };
 let func2 = (val1, val2) => val1 + val2;
 */

//thisについてのあれこれ
/*
 let obj3 = {
 val: 'hoge',
 checkThis: function () {
 console.log(this);
 this.val = 'fuga';
 }
 };
 obj3.checkThis();
 console.log(obj3.val);

 let obj4 = {
 val: 'hoge',
 checkThis: function () {
 console.log(this.val);
 this.val = 'fuga';

 function innerCheckThis() {
 //ここのthisはグローバルオジェクトを指している
 //関数とメソッドは違うということ
 console.log(this.val);
 }

 innerCheckThis();
 }
 };
 obj4.checkThis();
 console.log(obj4.val);

 let obj5 = {
 val: 'hoge',
 checkThis: function () {
 let self = this;
 console.log(self.val);

 (function innerCheckThis() {
 console.log(self.val);
 })();
 },
 };
 obj5.checkThis();
 */
//アロー関数を使えば、関数定義時のコンテキストのthisを常に参照するようになるのでthisの退避をしなくてもよくなる

//安全なコンストラクタ
//new をつけないでコンストラクタを呼び出すと、「ただの関数呼び出し」となるので注意する必要がある。
//しかし、instanceofを使ってnew を強制してやれば問題なく動く
//ObjectやArrayといったオブジェクトもこのような作りになっている。
/*
 function Phone(number) {
 if (this instanceof Phone) {
 this.number = number;
 } else {
 return new Phone(number);
 }
 }

 Phone.prototype.getNumber = function () {
 return this.number;
 };

 let myPhone1 = new Phone('xxx');
 let myPhone2 = Phone('yyy');

 console.log(myPhone1.getNumber());
 console.log(myPhone2.getNumber());

 console.log(myPhone1 instanceof Phone);
 console.log(myPhone2 instanceof Phone);
 */

//オーバーロード
//基本は、同じ名前の関数が定義されている場合は、「後に定義したものが優先される」
//しかし、argumentsオブジェクトを使用すれば、関数に渡された引数によって、内部の処理を変える（擬似的なオーバーロードが可能）
// function func(val) {
//     if (arguments.length === 0) {
//         console.log('hoge');
//     }
// }

//javascriptは動的なオブジェクトなので、目的のプロパティが存在するか確認したい時が来る。
//そんな時は、in演算子か、hasOwnProperty()メソッドを使う。

/*
 動的であるというのは危険なこと。javascriptには「オブジェクトの保護」の機能が存在する
 一つ目が「拡張の禁止」
 拡張を禁止されたオブジェクトは、それ以降はプロバティの追加ができなくなり、元に戻すことも出来なくなる。
 追加のみの禁止なので、削除や読み書きには影響がない。
 */
/*
 let human = {
 name: 'igarashi',
 };

 console.log(Object.isExtensible(human));

 Object.preventExtensions(human);

 console.log(Object.isExtensible(human));

 //プロパティの追加はできない
 human.sex = 'M';
 console.log('sex' in human);
 */

/*
 二つ目が「オブジェクトの封印」
 プロパティの追加の他にも、削除と属性変更ができなくなるため、結果として、プロパティの読み書きのみが許可された状態となる。
 */
/*
 let human = {
 name: 'igarashi',
 };

 console.log(Object.isSealed(human)); //false

 human.sex = 'M';
 human.age = 35;

 console.log('sex' in human); //true
 console.log('age' in human); //true

 delete human.sex;

 console.log('sex' in human); //false

 //オブジェクトを封印する
 Object.seal(human);

 console.log(Object.isSealed(human)); //true

 delete human.age;

 console.log('age' in human); //true
 */

/*
 最後が、「オブジェクトの凍結」
 凍結されたオブジェクトは、読み取り専用となる。
 */
/*
 let human = {
 name: 'igarashi',
 };

 console.log(Object.isFrozen(human)); //false

 human.name = 'tarama';

 console.log(human.name); //tarama

 Object.freeze(human);

 console.log(Object.isFrozen(human)); //true

 human.name = 'masaru';

 console.log(human.name); //tarama
 */






































