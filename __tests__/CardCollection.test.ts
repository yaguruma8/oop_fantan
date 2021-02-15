import { CardCollection } from '@app/CardCollection';
import { Card } from '@app/Card';

const cd = new CardCollection();

const codes = [0, 13, 14, 36, 52];
for (const code of codes) {
    const card = new Card(code);
    cd.add(card);
}

describe('get lengthできているか確認', () => {
    test('cd.length: 5', () => {
        expect(cd.length).toBe(5);
    });
});

describe('add(card)の確認', () => {
    test('カードを一枚追加 -> length:6', () => {
        const card = new Card(30);
        cd.add(card);
        expect(cd.length).toBe(6);
    });
});

describe('get card()の確認', () => {
    test('長さ6のCardの配列', () => {
        const cards = cd.cards;
        expect(cards).toHaveLength(6);
        expect(cards).toBeInstanceOf(Array);
        expect(cards[0]).toBeInstanceOf(Card);
    });
});

describe('pick()メソッドの確認', () => {
    test('suitのみ指定してpick {suit:0}', () => {
        // 0
        const pickCards = cd.pick({ suit: 0 });
        expect(pickCards).toHaveLength(1);
        expect(pickCards[0].index.suit).toBe(0);
        expect(cd.cards).toHaveLength(5);
        // 戻す
        for (const card of pickCards) {
            cd.add(card);
        }
    });
    test('suitのみ指定してpick {suit:1}', () => {
        // 13,14の2枚
        const pickCards = cd.pick({ suit: 1 });
        expect(pickCards).toHaveLength(2);
        // 戻す
        for (const card of pickCards) {
            cd.add(card);
        }
    });

    test('rankのみ指定してpick {rank: 0}', () => {
        // 0, 13の2枚
        const pickCards = cd.pick({ rank: 0 });
        expect(pickCards).toHaveLength(2);
        expect(pickCards[0].index.rank).toBe(0);
        expect(cd.cards).toHaveLength(4);
        // 戻す
        for (const card of pickCards) {
            cd.add(card);
        }
    });
    test('rankのみ指定してpick {rank:10}', () => {
        // 36
        const pickCards = cd.pick({ rank: 10 });
        expect(pickCards).toHaveLength(1);
        // 戻す
        for (const card of pickCards) {
            cd.add(card);
        }
    });

    test('suitとrankの両方を指定してpick', () => {
        // 30の1枚
        const pickCards = cd.pick({ suit: 2, rank: 4 });
        expect(pickCards).toHaveLength(1);
        expect(pickCards[0].index).toEqual({ suit: 2, rank: 4 });
        // 戻す
        cd.add(pickCards[0]);
    });

    test('定数Card.JOKER', () => {
        // 52(Joker) {suit:4, rank: 13}
        const pickCards = cd.pick(Card.JOKER);
        expect(pickCards[0].index).toEqual({ suit: 4, rank: 13 });
    });

    test('card.indexからのpick', () => {
        // code:44 {suit:3, rank:5}
        const card = new Card(44);
        cd.add(card);
        const pickCards = cd.pick(card.index);
        expect(pickCards[0].index).toEqual({ suit: 3, rank: 5 });
    });
});
