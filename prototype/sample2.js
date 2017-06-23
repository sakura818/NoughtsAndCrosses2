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
//{}でくくらない場合は、returnするので注意
/*
 let func = val => {
 console.log(val);
 };
 let func2 = (val1, val2) => val1 + val2;
 */

//thisについてのあれこれ
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

//アロー関数を使えば、関数定義時のコンテキストのthisを常に参照するようになるのでthisの退避をしなくてもよくなる