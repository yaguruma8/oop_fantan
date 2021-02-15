import { Game } from '@app/Game';
import { Table } from '@app/Table';
import { Player } from '@app/Player';
import { CardCollection } from '@app/CardCollection';
import { Card } from '@app/Card';
import { View } from '@view/View';
const readlineSync = require('readline-sync');

export class App {
    mount(playerNames: string[]) {
        const table = new Table();
        const view = new View();
        const game = new Game(table, view);

        // プレイヤーの登録
        for (const name of playerNames) {
            game.addPlayer(new Player(name));
        }
        // ゲームの準備
        game.prepareGame(createDeck());
        // ゲーム開始
        while (!game.isEnd()) {
            const question: string = readlineSync.question(
                '続行[Enter or Y] | 中断[AnyKey] > ',
                { defaultInput: 'y' }
            );
            if (question.toLowerCase() === 'y') {
                game.startRound();
            } else {
                console.log('ゲームを中断します');
                break;
            }
        }
        // ゲーム終了
        game.endGame();
    }
}

// トランプ1セット作成
function createDeck(): CardCollection {
    const deck = new CardCollection();
    for (let i = 0; i < 52; i++) {
        const card = new Card(i);
        deck.add(card);
    }
    return deck;
}