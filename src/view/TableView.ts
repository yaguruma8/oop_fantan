import { Table } from '@app/Table';
import { View } from '@view/View';

export class TableView {
    #beforeLayout: number[][];
    constructor() {
        const arr: number[][] = [];
        for (let i = 0; i < 4; i++) {
            arr.push(Array(13).fill(0));
        }
        this.#beforeLayout = arr;
    }

    render(table: Table) {
        for (let i = 0; i < table.layout.length; i++) {
            let suitStr = `${View.suitSymbols[i]}:`;
            for (let j = 0; j < table.layout[i].length; j++) {
                const before = this.#beforeLayout[i][j];
                const after = table.layout[i][j];

                if (before === 0 && after === 0) {
                    // まだ置かれていない
                    suitStr += ' _';
                } else if (before === 0 && after === 1) {
                    // 新しく置いた
                    const fgRed = '\x1b[31m';
                    const reset = '\x1b[0m';
                    suitStr += ` ${fgRed}${View.rankSymbols[j]}${reset}`;
                    this.#beforeLayout[i][j] = 1;
                } else {
                    // 既に置いている
                    suitStr += ` ${View.rankSymbols[j]}`;
                }
            }
            console.log(suitStr);
        }
    }
}
