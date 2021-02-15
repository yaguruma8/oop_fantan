import { Player } from '@app/Player';
import { Rule } from '@app/Rule';

const player = new Player('hoge');

const spyPlayerPass = jest.spyOn(player, 'pass', 'get');
const spyPlayerHand = jest.spyOn(player.hand, 'isEmpty');

beforeEach(() => {
    spyPlayerPass.mockClear();
    spyPlayerHand.mockClear();
});

describe('mastRetire()の確認', () => {
    test('パス回数を超えていない', () => {
        spyPlayerPass.mockReturnValue(3);
        expect(Rule.mustRetire(player)).toBeFalsy();
    });
    test('パス回数を超えている', () => {
        spyPlayerPass.mockReturnValue(4);
        expect(Rule.mustRetire(player)).toBeTruthy();
    });
});

describe('canFinish()の確認', () => {
    test('上がらない', () => {
        spyPlayerHand.mockReturnValue(false);
        expect(Rule.canFinish(player)).toBeFalsy();
    });

    test('上がることができる', () => {
        spyPlayerHand.mockReturnValue(true);
        expect(Rule.canFinish(player)).toBeTruthy();
    });
});
