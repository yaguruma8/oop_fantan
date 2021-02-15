export class Card {
    static readonly JOKER = { suit: 4, rank: 13 };
    #code: number;
    constructor(code: number) {
        this.#code = code;
    }

    get index() {
        if (this.#code >= 52) {
            return Card.JOKER;
        }
        const suit = Math.floor(this.#code / 13);
        const rank = this.#code % 13;
        return { suit, rank };
    }
    // 7のカード {rank:6}かどうか
    isSeventh() {
        const rank = this.#code % 13
        return rank === 6
    }
}
