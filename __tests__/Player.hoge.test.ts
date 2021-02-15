import { Player } from '@app/Player';
import {CardCollection} from '@app/CardCollection'
import {Card} from '@app/Card'
import {Table} from '@app/Table'

jest.mock('../src/app/CardCollection');
const CardCollectionMock = CardCollection as jest.MockedClass<typeof CardCollection>;

describe('', () => {
    test('1', () => {
        const player = new Player('hoge');
        player.isFinished = jest.fn().mockReturnValue(true);
        expect(player.isFinished()).toBeTruthy();
    });
    test('2', () => {
        const player = new Player('fuga');
        expect(CardCollectionMock).toHaveBeenCalled();
        const table = new Table()
        const card = new Card(7)
        player.draw(card, table)
        expect(CardCollectionMock.prototype.add.mock.calls[0][0]).toEqual(card)
        expect(CardCollectionMock.prototype.add).toHaveBeenCalledWith(card)
        expect(CardCollectionMock.prototype.add).toHaveBeenCalledTimes(1)
    });
});
