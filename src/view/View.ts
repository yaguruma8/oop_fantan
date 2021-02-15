import { Player } from '@app/Player';
import { Table } from '@app/Table';
import { TableView } from '@view/TableView';
import { PlayersListView } from '@view/PlayersListView';
const readline = require('readline')

export class View {
    // static readonly suitSymbols = 'SHCD'.split('');
    static readonly suitSymbols = ['\u2660','\u2663','\u2665','\u2666']
    static readonly rankSymbols = 'A23456789TJQK'.split('');

    #tableView = new TableView();
    #playersListView = new PlayersListView();

    render(playersList: { inPlay: Player[]; endPlay: Player[] }, table: Table) {
        // カーソルをターミナルの一番上へ
        readline.cursorTo(process.stdout, 0,0)
        // カーソル以下（＝ターミナル全て）の文字列をクリア
        readline.clearScreenDown(process.stdout)
        console.log('[7並べ]\n')
        this.#tableView.render(table);
        console.log('\n');
        this.#playersListView.render(playersList);
        console.log('\n');
    }
}
