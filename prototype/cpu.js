/**
 * CPUに関するものを集める
 *
 * @author asada
 */
function selectByCpu() {
    let boardId;
    do {
        const random = Math.floor(Math.random() * 9);
        /*
         乱数を
         0 1 2
         3 4 5
         6 7 8

         ゲームボードIDに変換する
         11 12 13
         21 22 23
         31 32 33
         */
        if (random === 0 || random === 1 || random === 2) {
            boardId = random + 11;
            //11,12,13
        }
        if (random === 3 || random === 4 || random === 5) {
            boardId = random + 18;
            //21,22,23
        }
        if (random === 6 || random === 7 || random === 8) {
            boardId = random + 25;
            //31,32,33
        }
    } while (isAlreadyPut(boardId));
    put(boardId, CROSSES);
}
