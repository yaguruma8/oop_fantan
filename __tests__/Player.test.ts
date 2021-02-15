import { CardCollection } from '@app/CardCollection';
import { Player } from '@app/Player';
import { Table } from '@app/Table';
import { Card } from '@app/Card';

let player: Player;
beforeEach(() => {
    player = new Player('hoge');
});

describe('get name()', () => {
    test('player.name', () => {
        expect(player.name).toBe('hoge');
    });
});
describe('get pass()', () => {
    test('player.pass', () => {
        expect(player.pass).toBe(0);
    });
});
describe('get hand()', () => {
    test('hand: CardCollection', () => {
        expect(player.hand).toBeInstanceOf(CardCollection);
    });
});
describe('isInPlay()の確認', () => {
    test('インスタンス作成時はisInPlay():true', () => {
        expect(player.isInPlay).toBeTruthy();
    });
});
describe('isFinished()の確認', () => {
    test('インスタンス作成時はisFinished:false', () => {
        expect(player.isFinished()).toBeFalsy();
    });
    // test('finished()メソッド実行後はisFinished():true', () => {
    //     player.finished();
    //     expect(player.isFinished()).toBeTruthy();
    // });
});
describe('isRetired()の確認', () => {
    test('インスタンス作成時はisRetired:false', () => {
        expect(player.isRetired()).toBeFalsy();
    });
    // test('retired()メソッド実行後はisRetierd():true', () => {
    //     player.retired();
    //     expect(player.isRetired()).toBeTruthy();
    // });
});
describe('draw()の確認', () => {
    const table = new Table();
    const card = new Card(6);
    const card2 = new Card(7);
    const tablePlaceMock = jest.spyOn(table, 'place');
    test('7のカードを受け取る', () => {
        player.draw(card, table);
        // table.place(card)を通る
        expect(tablePlaceMock).toHaveBeenCalledTimes(1);
        // 手札には追加されない
        expect(player.hand.length).toBe(0);
    });
    test('7以外のカードを受け取る', () => {
        // モックをクリア
        tablePlaceMock.mockClear()
        player.draw(card2, table);
        // table.place(card)は通らない
        expect(tablePlaceMock).not.toHaveBeenCalled()
        // 手札に追加される
        expect(player.hand.length).toBe(1);
    });
});
