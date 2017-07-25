/**
 * コンピュータのプレイヤー
 *
 * @author asada
 */
class Cpu {
    constructor(playerId) { // constructorとは https://www.ibm.com/developerworks/jp/web/library/wa-ecmascript6-neward-p3/
        this.playerId = playerId; // this == global object https://www.ibm.com/developerworks/jp/web/library/wa-ecmascript6-neward-p2/
    }

    /**
     * CPUがボードに何を置くか決めるメソッド
     *
     * @throws {Error} Cpuを継承してselectメソッドを実装しない場合にスローする
     */
    select() {
        //呼ばれない限り例外発生しないのでcatchしなくても良い
        throw Error('不正なCPUが呼ばれました。'); // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/throw
    }
}

export class EasyCpu extends Cpu { // CpuというスーパークラスをEasyCpuが継承する
    constructor(playerId) {
        super(playerId); 
    }

    select(board) {
        let x, y;
        do {
            x = Math.floor(Math.random() * board.verticalLength); // Math.random はランダム Math.floorは引数として与えた数以下の最大の整数を返す  https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/floor
            y = Math.floor(Math.random() * board.horizontalLength);
        } while (board.isAlreadyPut(x, y));
        board.put(x, y, this.playerId);
    }
}