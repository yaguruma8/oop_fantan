import { Card } from '@app/Card';

export class Table {
    #cards: Card[] = [];

    get layout() {
        // [suit][rank]の二次元配列
        // 置いてない場所は0、置いている場所は1
        const cardLayout: number[][] = []
        for (let i = 0; i < 4; i++) {
            cardLayout[i] = Array(13).fill(0)
        }
        for (const card of this.#cards) {
            // Jokerは飛ばす
            if (card.index.suit === Card.JOKER.suit) {
                continue;
            }
            cardLayout[card.index.suit][card.index.rank] = 1
        }
        return cardLayout;
    }

    place(card: Card) {
        this.#cards.push(card);
    }
}
