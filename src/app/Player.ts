import { CardCollection } from '@app/CardCollection';
import { Card } from '@app/Card';
import { Table } from '@app/Table';
import { Rule } from '@app/Rule';

export class Player {
    #hand: CardCollection;
    #status: 'inPlay' | 'finished' | 'retierd';
    #name: string;
    #pass = 0;
    #action: Card | 'pass' | null = null;
    constructor(name: string) {
        this.#name = name;
        this.#hand = new CardCollection();
        this.#status = 'inPlay';
    }

    get pass() {
        return this.#pass;
    }
    get name() {
        return this.#name;
    }
    get hand() {
        return this.#hand;
    }
    get action() {
        return this.#action;
    }
    isInPlay() {
        return this.#status === 'inPlay';
    }
    isFinished() {
        return this.#status === 'finished';
    }
    isRetired() {
        return this.#status === 'retierd';
    }

    // ゲームの準備（カードを配られる）
    draw(card: Card, table: Table) {
        // カードが7ならテーブルに置く、そうでなければ手札に加える
        if (card.isSeventh()) {
            table.place(card);
        } else {
            this.#hand.add(card);
        }
    }
    // ゲーム中（自分のターン）
    startTurn(table: Table) {
        this.#action = null;
        // Ruleに手札の中からテーブルに置けるカードの一覧を提示してもらう
        const placeCards = Rule.findCanBePlacedCards(this.#hand, table);
        if (placeCards.length === 0) {
            // 出せるカードがなければパス
            this.#pass += 1;
            this.#action = 'pass';
            // リタイア判定
            if (Rule.mustRetire(this)) {
                this.#status = 'retierd';
                // 手札を全てテーブルに置く
                for (const card of this.#hand.cards) {
                    table.place(card);
                }
            }
            return;
        }
        // 出せるカードがあれば候補の中から一枚選んで手札から抜き、テーブルに置く
        const index = Math.floor(Math.random() * placeCards.length);
        const [card] = this.#hand.pick(placeCards[index].index);
        table.place(card);
        this.#action = card;
        // 上がりの判定
        if (Rule.canFinish(this)) {
            this.#status = 'finished';
        }
        return;
    }
}
