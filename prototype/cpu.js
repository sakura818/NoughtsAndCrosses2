/**
 * CPUに関するものを集める
 *
 * @author asada
 */
const selectByCpu = () => {
    let boardId;
    do {
        const boardIdArray = [11, 12, 13, 21, 22, 23, 31, 32, 33];
        boardId = boardIdArray[Math.floor(Math.random() * 9)];
    } while (isAlreadyPut(boardId));
    put(boardId, CROSSES);
}
