/**
 * コンピュータのプレイヤー
 *
 * @author asada
 */
export default class Cpu {
    constructor(playerId) {
        this.playerId = playerId;
    }

    selectByCpu() {
        throw new Error('You have to implement the method doSomething!');
    }
}