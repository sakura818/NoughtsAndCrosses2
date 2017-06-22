/**
 * CPUに関するものを集める
 *
 * @author asada
 */
function selectByCpu() {
    let random;
    do {
        random = Math.floor(Math.random() * 9);

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
            random += 11;
            //11,12,13
        }
        if (random === 3 || random === 4 || random === 5) {
            random += 18;
            //21,22,23
        }
        if (random === 6 || random === 7 || random === 8) {
            random += 25;
            //31,32,33
        }
    } while (isAlreadyPut(random));
    changeButtonState(random, CROSSES);
}
