import { Card } from '@app/Card';

const codes = [0, 12, 13, 14, 51, 52, 53];
let cards: Card[] = [];
for (const code of codes) {
    cards.push(new Card(code));
}
describe('cardのindex取得', () => {
    test('cord: 0, {suit:0, rank:0}', () => {
        expect(cards[0].index).toEqual({suit:0, rank:0})
    })
    test('cord: 12, {suit:0, rank:12}', () => {
        expect(cards[1].index).toEqual({suit:0, rank:12})
    })
    test('cord: 13, {suit:1, rank:0}', () => {
        expect(cards[2].index).toEqual({suit:1, rank:0})
    })
    test('cord: 14, {suit:1, rank:1}', () => {
        expect(cards[3].index).toEqual({suit:1, rank:1})
    })
    test('cord: 51, {suit:3, rank:12}', () => {
        expect(cards[4].index).toEqual({suit:3, rank:12})
    })
    test('cord: 52, {suit:4, rank:13}', () => {
        expect(cards[5].index).toEqual({suit:4, rank:13})
    })
    test('cord: 53, {suit:4, rank:13}', () => {
        expect(cards[5].index).toEqual({suit:4, rank:13})
    })
})

describe('isSeventh()の確認', () => {
    const sevenCard = new Card(19)  // {suit:1, rank:6}
    const notSevenCard = new Card(21)
    test('cord 19, true', () => {
        expect(sevenCard.isSeventh()).toBeTruthy()
    })
    test('cord 21, false', () => {
        expect(notSevenCard.isSeventh()).toBeFalsy()

    })
})

