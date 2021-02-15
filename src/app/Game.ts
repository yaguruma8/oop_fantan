import { Player } from '@app/Player';
import { CardCollection } from './CardCollection';
import { Table } from './Table';
import { View } from '@view/View';

export class Game {
    #playersList: { inPlay: Player[]; endPlay: Player[] } = {
        inPlay: [],
        endPlay: [],
    };
    #table: Table;
    #view: View;

    constructor(table: Table, view: View) {
        this.#table = table;
        this.#view = view;
    }

    // プレイヤーの追加
    addPlayer(player: Player) {
        this.#playersList.inPlay.push(player);
    }

    // ゲームの準備処理
    prepareGame(deck: CardCollection) {
        // カードをプレイヤーに順番に配る
        let index = 0;
        while (!deck.isEmpty()) {
            deck.shuffle();
            const card = deck.cards.pop();
            if (card) {
                const player = this.#playersList.inPlay[index];
                player.draw(card, this.#table);
            }
            index = (index + 1) % this.#playersList.inPlay.length;
        }
        // 準備完了したら描画
        this.#view.render(this.#playersList, this.#table);
    }

    // ゲーム中の処理（一周）
    startRound() {
        // プレイ中のプレイヤーのターンを回す
        for (const player of this.#playersList.inPlay) {
            player.startTurn(this.#table);
        }
        // 一周終わったら描画
        this.#view.render(this.#playersList, this.#table);
        // #playersListの更新
        this.updateplayersList();
    }

    // #playersListの更新
    private updateplayersList() {
        // statusがfinishedとretiredのプレイヤーをinPlay -> endPlayに移動
        const RemainingPlayers: Player[] = [];
        const endPlayers: Player[] = [];
        this.#playersList.inPlay.forEach((player) => {
            if (player.isFinished() || player.isRetired()) {
                endPlayers.push(player);
            } else {
                RemainingPlayers.push(player);
            }
        });
        this.#playersList.endPlay = [
            ...this.#playersList.endPlay,
            ...endPlayers,
        ];
        this.#playersList.inPlay = RemainingPlayers
    }

    // ゲームの終了判定
    isEnd() {
        // プレイ中の人がいなくなったら終了
        return this.#playersList.inPlay.length === 0;
    }

    // ゲームの終了処理
    endGame() {
        // 終了の描画
        console.log('[ゲーム終了]\n');
    }
}
