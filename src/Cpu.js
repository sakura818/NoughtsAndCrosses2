import {board} from './app';

/**
 * コンピュータのプレイヤー
 *
 * @author asada
 */
const defaultScore = -1;

class Cpu {
    constructor(playerId) {
        this.playerId = playerId;
    }

    /**
     * CPUがボードに何を置くか決めるメソッド
     */
    selectByCpu() {
        throw Error('不正なCPUが呼ばれました。');
    }
}

/**
 * 弱いCPU
 *
 * @author asada
 */
export class EasyCpu extends Cpu {
    constructor(playerId) {
        super(playerId);
    }

    selectByCpu() {
        let boardId;
        do {
            boardId = Math.floor(Math.random() * board.getOneSideLength() * board.getOneSideLength());
        } while (board.isAlreadyPut(boardId));
        board.put(boardId, this.playerId);
    }
}

export class TestCpu extends Cpu {
    constructor(playerId) {
        super(playerId);
    }
}

/**
 * 普通の強さのCPU
 *
 * @author asada
 */
export class NormalCpu extends Cpu {
    constructor(playerId) {
        super(playerId);
    }

    selectByCpu() {
        const gameBoardArray = board.copyGameBoardArray();

        const checkHorizontal = () => {
            let choice = defaultScore;

            for (let x = 0; x < gameBoardArray.length; x++) {

                let mine = 0;
                let notMine = 0;

                for (let y = 0; y < gameBoardArray[x].length; y++) {
                    if (gameBoardArray[x][y] === this.playerId) {
                        mine++;
                    } else if (gameBoardArray[x][y] !== board.DEFAULT) {
                        notMine++;
                    }

                    //自分がリーチ
                    if (mine === board.terminationCondition - 1) {
                        for (let i = 0; i < gameBoardArray[x].length; i++) {
                            if (gameBoardArray[x][i] === board.DEFAULT) {
                                return (x * gameBoardArray.length) + i;
                            }
                        }
                    }

                    //自分以外がリーチ
                    if (notMine === board.terminationCondition - 1) {
                        for (let i = 0; i < gameBoardArray[x].length; i++) {
                            if (gameBoardArray[x][i] === board.DEFAULT) {
                                choice = (x * gameBoardArray.length) + i;
                            }
                        }
                    }
                }
            }
            return choice;
        };

        const checkVertical = () => {
            let choice = defaultScore;

            for (let y = 0; y < 3; y++) {

                let mine = 0;
                let notMine = 0;

                for (let x = 0; x < 3; x++) {
                    if (gameBoardArray[x][y] === this.playerId) {
                        mine++;
                    } else if (gameBoardArray[x][y] !== board.DEFAULT) {
                        notMine++;
                    }

                    //自分がリーチ
                    if (mine === board.terminationCondition - 1) {
                        for (let i = 0; i < 3; i++) {
                            if (gameBoardArray[i][y] === board.DEFAULT) {
                                return (i * 3) + y;
                            }
                        }
                    }

                    //自分以外がリーチ
                    if (notMine === board.terminationCondition - 1) {
                        for (let i = 0; i < 3; i++) {
                            if (gameBoardArray[i][y] === board.DEFAULT) {
                                choice = (i * 3) + y;
                            }
                        }
                    }
                }
            }
            return choice;
        };

        const checkSlanting = () => {
            if (isDefault(1, 1)) {
                return 4;

            } else if (gameBoardArray[1][1] === this.playerId) {
                //中央を自分が取っている場合は積極的に隅をとる
                if (isDefault(0, 0)) {
                    return 0;

                } else if (isDefault(2, 2)) {
                    return 8;

                } else if (isDefault(0, 2)) {
                    return 2;

                } else if (isDefault(2, 0)) {
                    return 6;
                }

            } else {
                //自分以外が中央を取っている場合は邪魔をする

                //相手のリーチを確認
                if (isNotMineAndNotDefault(this.playerId, 0, 0)) {
                    if (isDefault(2, 2)) {
                        return 8;
                    }
                }
                if (isNotMineAndNotDefault(this.playerId, 2, 2)) {
                    if (isDefault(0, 0)) {
                        return 0;
                    }
                }
                if (isNotMineAndNotDefault(this.playerId, 0, 2)) {
                    if (isDefault(2, 0)) {
                        return 6;
                    }
                }
                if (isNotMineAndNotDefault(this.playerId, 2, 0)) {
                    if (isDefault(0, 2)) {
                        return 2;
                    }
                }
                //隅をとる
                if (isDefault(0, 0)) {
                    return 0;

                } else if (isDefault(0, 2)) {
                    return 2;

                } else if (isDefault(2, 0)) {
                    return 6;

                } else if (isDefault(2, 2)) {
                    return 8;
                }
            }
            return defaultScore;

            function isDefault(x, y) {
                return gameBoardArray[x][y] === board.DEFAULT;
            }

            function isNotMineAndNotDefault(playerId, x, y) {
                return gameBoardArray[x][y] !== board.DEFAULT && gameBoardArray[x][y] !== playerId;
            }
        };

        let choice = checkHorizontal();
        if (choice !== defaultScore) {
            board.put(choice, this.playerId);
            return;
        }
        choice = checkVertical();
        if (choice !== defaultScore) {
            board.put(choice, this.playerId);
            return;
        }
        choice = checkSlanting();
        if (choice !== defaultScore) {
            board.put(choice, this.playerId);
            return;
        }

        let boardId;
        do {
            boardId = Math.floor(Math.random() * board.getOneSideLength() * board.getOneSideLength());
        } while (board.isAlreadyPut(boardId));
        board.put(boardId, this.playerId);
    }
}