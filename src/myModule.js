/**
 * Created by yusuke-pc on 2017/06/20.
 */
export default class myModule {
    constructor() {
        console.log('Hello, I am a module');
    }

    static hello() {
        return 'Hello!';
    }

    static goodbye() {
        return 'GoodBye!';
    }
}