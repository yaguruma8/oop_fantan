import { Card } from '@app/Card';

export class CardCollection {
    #cards: Card[] = [];

    get length() {
        return this.#cards.length;
    }
    get cards() {
        return this.#cards;
    }
    isEmpty() {
        return this.length === 0;
    }

    add(card: Card) {
        this.#cards.push(card);
    }

    pick(cardIndex: { suit?: number; rank?: number }): Card[] {
        const suitReg =
            typeof cardIndex.suit === 'number'
                ? new RegExp(`^${cardIndex.suit}$`)
                : new RegExp(/^[0-4]$/);
        const rankReg =
            typeof cardIndex.rank === 'number'
                ? new RegExp(`^${cardIndex.rank}$`)
                : new RegExp(/^[0-9]$|^1[0-3]$/);
        let pickCards: Card[] = [];
        let restCards: Card[] = [];
        this.#cards.forEach((card) => {
            if (
                suitReg.test(String(card.index.suit)) &&
                rankReg.test(String(card.index.rank))
            ) {
                pickCards.push(card);
            } else {
                restCards.push(card);
            }
        });
        this.#cards = restCards;
        return pickCards;
    }

    shuffle() {
        this.#cards.sort((a, b) => Math.random() - 0.5);
    }
}
