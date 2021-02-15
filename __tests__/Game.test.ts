import { Game } from '@app/Game';
import { Player } from '@app/Player';
import { CardCollection } from '@app/CardCollection';
import { Table } from '@app/Table';
import { View } from '@view/View';
import { Card } from '@app/Card';

test('addPlayer()のテスト', () => {
    const table = new Table();
    const view = new View();
    const game = new Game(table, view);
    const player = new Player('hoge');
    game.addPlayer = jest.fn();
    game.addPlayer(player);
    expect(game.addPlayer).toHaveBeenCalled();
});

test('prepareGame()のテスト', () => {
    const table = new Table();
    const view = new View();
    const game = new Game(table, view);
    const deck = new CardCollection();
    for (let i = 0; i < 9; i++) {
        const card = new Card(i);
        deck.add(card);
    }
    const player1 = new Player('hoge');
    game.addPlayer(player1);
    const player2 = new Player('fuga');
    game.addPlayer(player2);

    player1.draw = jest.fn();
    player2.draw = jest.fn();
    view.render = jest.fn(() => {});
    game.prepareGame(deck);
    expect(player1.draw).toHaveBeenCalledTimes(5);
    expect(player2.draw).toHaveBeenCalledTimes(4);
    expect(view.render).toHaveBeenCalledTimes(1);
});

describe('startRound()のテスト', () => {
    const table = new Table();
    const view = new View();
    const game = new Game(table, view);
    const deck = new CardCollection();
    for (let i = 0; i < 5; i++) {
        const card = new Card(i);
        deck.add(card);
    }
    const player1 = new Player('hoge');
    game.addPlayer(player1);
    const player2 = new Player('fuga');
    game.addPlayer(player2);

    game.prepareGame(deck);

    player1.startTurn = jest.fn();
    player2.startTurn = jest.fn();
    // 一回startRound()を実行したら#playersList.endPlay[]に移動する
    player2.isFinished = jest.fn().mockReturnValue(true);
    view.render = jest.fn(() => {});

    test('1回目', () => {
        game.startRound();
        expect(player1.startTurn).toHaveBeenCalledTimes(1);
        expect(player2.startTurn).toHaveBeenCalledTimes(1);
    });
    test('2回目', () => {
        // player2は#playersList.endPlay[]に移動済みのため呼ばれない
        game.startRound();
        expect(player1.startTurn).toHaveBeenCalledTimes(2);
        expect(player2.startTurn).toHaveBeenCalledTimes(1);
    });
});

test('isEnd()のテスト', () => {
    const table = new Table();
    const view = new View();
    const game = new Game(table, view);
    view.render = jest.fn(() => {});

    const player = new Player('hoge');
    game.addPlayer(player);

    game.startRound();
    expect(game.isEnd()).toBeFalsy();

    player.isRetired = jest.fn().mockReturnValue(true);
    game.startRound();
    expect(game.isEnd()).toBeTruthy();
});

test('endGame()のテスト', () => {
    const table = new Table();
    const view = new View();
    const game = new Game(table, view);
    const spyConsole = jest.spyOn(console, 'log')
    game.endGame()
    expect(spyConsole).toHaveBeenCalled()
})
