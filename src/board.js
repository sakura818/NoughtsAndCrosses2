/**
 * boardクラス
 *
 * @author asada
 */
export default class board {
    constructor() {
        this.gameBoard = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
    }

    init() {
        this.gameBoard = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
    }

    print(){
        let printData = '';
        for(let i = 0; i < this.gameBoard.length; i++){
            printData += '<p>';

            if(this.gameBoard[i] === -1){
                printData += '[ ]';

            }else if(this.gameBoard[i] === 0){
                printData += '[○]';

            }else if(this.gameBoard[i] === 1){
                printData += '[×]';
            }

            if(i === 2){
                printData += '</p>';
            }else if(i === 5){
                printData += '</p>';
            }
        }
        printData += '</p>';
        return printData;
    }
}