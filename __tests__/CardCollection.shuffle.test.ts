import {CardCollection} from '@app/CardCollection'
import {Card} from '@app/Card'

const cd = new CardCollection();

const codes = [0, 13, 14, 36, 52];
for (const code of codes) {
    const card = new Card(code);
    cd.add(card);
}

test('shuffle()の確認', () => {
    // Math.random()のモックを作成
    const randomMock = jest.spyOn(Math, 'random')
    // Math.randomが常に0.4を返すようにする
    randomMock.mockReturnValue(0.4)
    // Math.randomの動きを確認する
    expect(Math.random()).toBe(0.4)
    // shuffle()を動かす
    cd.shuffle()
    // 0.4-0.5 < 0 なので、常に順番を入れ替えるので[52, 36, 14, 13, 0]になっているはず
    // [0].index {suit:4, rank:13} のはず
    expect(cd.cards[0].index).toEqual({suit:4, rank: 13})
    // [1].index {suit:2, rank:10} のはず
    expect(cd.cards[1].index).toEqual({suit:2, rank: 10})
})