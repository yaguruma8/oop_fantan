import { Table } from '@app/Table';
import { Card } from '@app/Card';

const table = new Table();

const codes = [0, 13, 14, 36, 52];
for (const code of codes) {
    table.place(new Card(code));
}
const layout = [
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

describe('get layout()の確認', () => {
    test('取得', () => {
        expect(table.layout).toEqual(layout);
    });
    test('追加後の取得', () => {
        const card = new Card(30)
        table.place(card)
        layout[card.index.suit][card.index.rank] = 1
        expect(table.layout).toEqual(layout)
    })
    test('ジョーカー追加', () => {
        const joker = new Card(55)
        table.place(joker)
        expect(table.layout).toEqual(layout)
    })

})

