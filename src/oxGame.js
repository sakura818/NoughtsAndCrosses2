import { PlayerChar, Ui } from "./ui.js";
import { HumanPlayer } from "./humanPlayer.js";
import { EasyCpu } from "./cpu.js";
import { CpuLevel } from "./cpuLevel.js";

export const GameState = Object.freeze({ END: "end", NOT_END: "notEnd", DRAW: "draw" });

/**
 * OXGameクラス
 * 
 * @author asada
 */
export class OXGame {
    constructor(board, players) {
        this.board = board;
        this.players = players;

        const element = createDOM(this);
        document.getElementById("root").appendChild(element);

        this.init();
    }

    /**
     * ゲームの初期化を行う
     */
    init() {
        this.board.init();

        this.nowPlayer = this.players[0];

        //TODO while文にしないと Cpu Vs Cpu の場合に処理がストップすることになる。
        if (!(this.nowPlayer instanceof HumanPlayer)) { // instanceofとはどのコンストラクタ(今回はHumanPlayer)から生成されたのかを示すもの https://developer.mozilla.org/ja/docs/JavaScript/Reference/Operators/instanceof
            this.nowPlayer.select(this.board);
            this.nowPlayer = this.getNextPlayer();
        }
        Ui.printBoard(this.board); // 現在のボードの状況を表示

        //ゲームの状態
        this.state = GameState.NOT_END;
    }

    /**
     * 勝負の結果がついたか判定する
     */
    judge() {
        //TODO ここの処理は二回書いてあるので、一回にしたい。
        this.state = this.board.checkGameEnd(this.nowPlayer.playerId);
        Ui.printBoard(this.board);
        switch (this.state) {
            case GameState.END: { // ゲーム終了と判断したら
                Ui.printResultMessage(GameState.END, this.nowPlayer.playerId); // 終了のフラグとそのときのplayerIDをわたして、勝利のアラートを表示する
                return;
            }
            case GameState.NOT_END: { // ゲームはまだ終了しないと判断したらなにもしないでbreak
                break;
            }
            case GameState.DRAW: { // ゲームひきわけと判断したら
                Ui.printResultMessage(GameState.DRAW); // ひきわけのフラグをわたしてひきわけのアラートを表示する
                return;
            }
            default: // 式の値にマッチするものが存在しない場合に実行する文 https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/switch
                throw new Error("checkGameEndの戻り値が予期されないものでした。");
        }
        this.nowPlayer = this.getNextPlayer();

        //TODO while文にしないとHumanVsCpuVsCpuの場合に処理がストップすることになる。
        if (!(this.nowPlayer instanceof HumanPlayer)) {
            this.nowPlayer.select(this.board);
            this.board.checkGameEnd(this.nowPlayer.playerId);
            Ui.printBoard(this.board);
        }

        //TODO ここの処理は二回書いてあるので、一回にしたい。
        this.state = this.board.checkGameEnd(this.nowPlayer.playerId);
        Ui.printBoard(this.board);
        switch (this.state) {
            case GameState.END: {
                Ui.printResultMessage(GameState.END, this.nowPlayer.playerId);
                return;
            }
            case GameState.NOT_END: {
                break;
            }
            case GameState.DRAW: {
                Ui.printResultMessage(GameState.DRAW);
                return;
            }
            default:
                throw new Error("checkGameEndの戻り値が予期されないものでした。");
        }
        this.nowPlayer = this.getNextPlayer();
    }

    getNextPlayer() {
        return this.players[this.board.times % this.players.length];
    }
}

/**
 * index.htmlのコンテンツを作る。
 *
 * @param oxGame OXGameのオブジェクトを渡す。
 * @returns {Element} index.htmlのコンテンツを返す。
 */
function createDOM(oxGame) {
    const divClassContent = document.createElement("div");
    divClassContent.className = "content";

    divClassContent.appendChild(createTitle());

    divClassContent.appendChild(createCpuLevelSelectBox(oxGame));

    divClassContent.appendChild(createGameBoard(oxGame));

    divClassContent.appendChild(createResetButton(oxGame));

    return divClassContent;
}

function createTitle() { // タイトル作成
    const title = document.createElement("h1"); // h1つくる
    title.innerHTML = "○×ゲーム"; // h1に○×ゲームとかく
    return title;
}

function createCpuLevelSelectBox(oxGame) {
    const pTag = document.createElement("p"); // pTagつくる
    pTag.innerHTML = "CPUの難易度:"; 

    //セレクトボックスを作る
    const select = document.createElement("select");
    select.id = "CpuLevel";
    select.addEventListener("change", () => {
        //TODO CPUが複数いたとして、全部を一度に変更してしまうので注意
        for (let i = 0; i < oxGame.players.length; i++) {
            if (!(oxGame.players[i] instanceof HumanPlayer)) {
                switch (document.getElementById("CpuLevel").value) {
                    case CpuLevel.EASY:
                        oxGame.players[i] = new EasyCpu(2);
                        break;

                    default:
                        throw new Error("存在しないCPUが選択されました。");
                }
            }
        }
        oxGame.init();
    });

    //オプションを作る
    for (let value of Object.keys(CpuLevel)) {
        let option = document.createElement("option");
        option.value = CpuLevel[value];
        option.innerHTML = CpuLevel[value];
        select.appendChild(option);
    }

    pTag.appendChild(select);
    return pTag;
}

function createGameBoard(oxGame) {
    const fragment = document.createDocumentFragment();

    //pタグで段落をつける
    let pTag = document.createElement("p");
    for (let i = 0; i < oxGame.board.verticalLength * oxGame.board.horizontalLength; i++) {
        if (i % oxGame.board.horizontalLength === 0) {
            pTag = document.createElement("p");
        }

        let button = document.createElement("button");
        button.id = `${i}`;
        //buttonの表示でプレイヤーキャラを使う
        button.innerHTML = PlayerChar[0];
        button.addEventListener("click", () => {
            if (oxGame.state === GameState.NOT_END) {
                oxGame.nowPlayer.select(oxGame.board, Ui, Math.floor(i / oxGame.board.verticalLength), i % oxGame.board.verticalLength);
                oxGame.judge();
            }
        });

        pTag.appendChild(button);
        fragment.appendChild(pTag);
    }
    return fragment;
}

function createResetButton(oxGame) {　// リセットボタンを作る
    const resetButton = document.createElement("button"); // buttonというelementをつくる
    resetButton.innerHTML = "リセット"; // ボタンの表示は"リセット"とする
    resetButton.addEventListener("click", () => { // アロー関数(無名関数) このresetButtonを"click"したときにinit()を呼び出す
        oxGame.init();
    });
    return resetButton;
}