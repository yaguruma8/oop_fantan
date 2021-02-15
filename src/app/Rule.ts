import { Card } from '@app/Card';
import { CardCollection } from '@app/CardCollection';
import { Table } from '@app/Table';
import { Player } from '@app/Player';

export class Rule {
    // 最大パス数
    private static readonly maxPass = 3;
    // 手札からテーブルに置けるカードを探す
    static findCanBePlacedCards(hand: CardCollection, table: Table): Card[] {
        // カードが置ける場所のリストアップ
        const cardIndexes = Rule.getListPlacedCardIndexes(table);
        // 手札の中から置けるカードをピックアップ
        let placedCards: Card[] = [];
        for (const cardIndex of cardIndexes) {
            const card = hand.cards.filter(
                (card) =>
                    card.index.suit === cardIndex.suit &&
                    card.index.rank === cardIndex.rank
            );
            placedCards = [...placedCards, ...card]
        }
        return placedCards;
    }

    // 置ける場所を探しやすいようにテーブル情報を整形する
    private static formatTableLayoutData(table: Table): number[][] {
        const newLayout: number[][] = [];
        for (const suit of table.layout) {
            const l1 = suit.slice(0, 6); //A23456
            const l2 = suit.slice(6); // 78910JQK
            const newSuits = [...l2, ...l1];    // 789...A23...
            newLayout.push(newSuits);
        }
        return newLayout;
    }

    // カードが置ける場所の一覧を取得
    private static getListPlacedCardIndexes(
        table: Table
    ): { suit: number; rank: number }[] {
        // テーブル情報の整形 7({rank:6}) を配列の先頭にする
        const layout = Rule.formatTableLayoutData(table);
        let indexes: { suit: number; rank: number }[] = [];
        layout.forEach((suits, index) => {
            // 前から検索: 最初に0がある場所＝置ける場所
            const front = suits.indexOf(0);
            // 0がない=全て埋まっている
            if (front === -1) {
                return;
            }
            // ランクのインデックスを戻す
            // 7({rank:6})を[0]->[6] 8({rank:7})を[1]->[7]
            // K({rank:12})を[6]->[12] A({rank:0})を[7]->[0]
            const frontIndex = { suit: index, rank: (front + 6) % 13 };
            indexes.push(frontIndex);
            // 後ろから検索
            const last = suits.lastIndexOf(0);
            // 前から検索と同じ場合は除外
            if (last === front) {
                return;
            }
            const lastIndex = { suit: index, rank: (last + 6) % 13 };
            indexes.push(lastIndex);
        });
        return indexes;
    }

    // プレイヤーがリタイアしなければならないか
    static mustRetire(player: Player):boolean {
        // 最大パス数を超えていたらリタイア
        return player.pass > Rule.maxPass
    }

    // プレイヤーが上がることができるか
    static canFinish(player: Player):boolean {
        // 手札が0なら上がり
        return player.hand.isEmpty()
    }
}
