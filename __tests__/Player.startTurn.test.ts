import { Player } from '@app/Player';
import { Table } from '@app/Table';
import { Card } from '@app/Card';
import { Rule } from '@app/Rule';

// Ruleのmockを作成
const findMock = jest.spyOn(Rule, 'findCanBePlacedCards');
const retireMock = jest.spyOn(Rule, 'mustRetire');
const finishMock = jest.spyOn(Rule, 'canFinish');

let player: Player, table: Table;
const card0 = new Card(0);
const card5 = new Card(5);
beforeEach(() => {
    player = new Player('hoge');
    table = new Table();
    player.draw(card0, table);
    player.draw(card5, table);
    findMock.mockClear();
    retireMock.mockClear();
    finishMock.mockClear();
});

describe('startTune()の確認', () => {
    test('置けるカードがない', () => {
        findMock.mockReturnValue([]);
        player.startTurn(table);
        // パスは1回
        expect(player.pass).toBe(1);
        // retireを通る
        expect(retireMock).toHaveBeenCalled();
        // finishは通らない
        expect(finishMock).not.toHaveBeenCalled();
        // プレイヤーのステータスはinPlay
        expect(player.isInPlay).toBeTruthy();
    });

    test('3回パス', () => {
        findMock.mockReturnValue([]);
        player.startTurn(table);
        player.startTurn(table);
        player.startTurn(table);
        // パスは3回
        expect(player.pass).toBe(3);
        // ステータスはinPlay
        expect(player.isInPlay()).toBeTruthy();
    });
    test('4回パス->リタイア', () => {
        findMock.mockReturnValue([]);
        player.startTurn(table);
        player.startTurn(table);
        player.startTurn(table);
        player.startTurn(table);
        // パスは4回
        expect(player.pass).toBe(4);
        // ステータスはretired
        expect(player.isInPlay()).toBeFalsy();
        expect(player.isRetired()).toBeTruthy();
    });
    test('手札をテーブルに出す', () => {
        findMock.mockReturnValue([card0, card5]);
        player.startTurn(table)
        // パスは0回
        expect(player.pass).toBe(0)
        // retireは通らない
        expect(retireMock).not.toHaveBeenCalled()
        // finishは通る
        expect(finishMock).toHaveBeenCalled()
        // 残りのカードは1枚
        expect(player.hand.length).toBe(1)
        // ステータスはinPlay
        expect(player.isInPlay()).toBeTruthy()
    });
    test('手札を全て出す->上がり', () => {
        findMock.mockReturnValue([card0])
        player.startTurn(table)
        findMock.mockReturnValue([card5])
        player.startTurn(table)
        // 残りのカードは0枚
        expect(player.hand.length).toBe(0)
        // ステータスはfinished
        expect(player.isInPlay()).toBeFalsy()
        expect(player.isFinished()).toBeTruthy()
    })
});
