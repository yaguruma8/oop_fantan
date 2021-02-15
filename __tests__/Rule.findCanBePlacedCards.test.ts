import { Rule } from '@app/Rule';
import { Table } from '@app/Table';
import { CardCollection } from '@app/CardCollection';
import { Card } from '@app/Card';

const table = new Table();
const mockTableLayout = jest.spyOn(table, 'layout', 'get');
const hand = new CardCollection();
const mockHandgetCards = jest.spyOn(hand, 'cards', 'get');

const mockTableLayoutData1 = [
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], // rank:5, rank:7
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], // rank:12
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // rank:0
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // なし
];

const mockTableLayoutData2 = [
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], // rank:7, rank:12
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1], // rank:0, rank:5
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], // rank:5, rank:7
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], // rank:5, rank:7
];

let handCards: Card[] = [];
for (let i = 0; i < 52; i++) {
    const card = new Card(i);
    handCards.push(card);
}

beforeEach(() => {
    mockHandgetCards.mockClear();
    mockTableLayout.mockClear();
});

describe('findeCanBePlacedCard()の確認', () => {
    test('一枚一致', () => {
        const card = [new Card(5)];
        mockHandgetCards.mockReturnValue(card);
        mockTableLayout.mockReturnValue(mockTableLayoutData1);
        const returnCards = Rule.findCanBePlacedCards(hand, table);
        expect(returnCards).toHaveLength(1);

        const result = { suit: 0, rank: 5 };
        expect(returnCards[0].index).toEqual(result);
    });
    test('一枚も一致しない', () => {
        const card = [new Card(10)];
        mockHandgetCards.mockReturnValue(card);
        mockTableLayout.mockReturnValue(mockTableLayoutData1);
        const returnCards = Rule.findCanBePlacedCards(hand, table);
        expect(returnCards).toHaveLength(0);
    });
    test('複数枚', () => {
        mockHandgetCards.mockReturnValue(handCards);
        mockTableLayout.mockReturnValue(mockTableLayoutData1);
        const returnCards = Rule.findCanBePlacedCards(hand, table);
        expect(returnCards).toHaveLength(4);

        const result = [
            { suit: 0, rank: 7 },
            { suit: 0, rank: 5 },
            { suit: 1, rank: 12 },
            { suit: 2, rank: 0 },
        ];
        let returns: { suit: number; rank: number }[] = [];
        for (const returnCard of returnCards) {
            const index = returnCard.index;
            returns.push(index);
        }
        expect(returns).toEqual(result);
    });
    test('KとAの接続', () => {
        mockHandgetCards.mockReturnValue(handCards);
        mockTableLayout.mockReturnValue(mockTableLayoutData2);
        const returnCards = Rule.findCanBePlacedCards(hand, table);
        expect(returnCards).toHaveLength(8);

        const result = [
            { suit: 0, rank: 7 },
            { suit: 0, rank: 12 },
            { suit: 1, rank: 0 },
            { suit: 1, rank: 5 },
            { suit: 2, rank: 7 },
            { suit: 2, rank: 5 },
            { suit: 3, rank: 7 },
            { suit: 3, rank: 5 },
        ];
        let returns: { suit: number; rank: number }[] = [];
        for (const returnCard of returnCards) {
            const index = returnCard.index;
            returns.push(index);
        }
        expect(returns).toEqual(result);
    });
});
