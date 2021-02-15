import { CardCollection } from '@app/CardCollection';
import { Card } from '@app/Card';
import { Player } from '@app/Player';
import { View } from '@view/View';

export class PlayersListView {
    render(playersList: { inPlay: Player[]; endPlay: Player[] }) {
        // statusがinPlayのプレイヤーの名前と手札を表示
        for (const player of playersList.inPlay) {
            if (player.isInPlay()) {
                console.log(
                    `${player.name}:${this.constructHandString(player.hand)}`
                );
            }
        }
        console.log('\n')

        // ターン行動の表示
        for (const player of playersList.inPlay) {
            this.renderTurnAction(player);
        }

        // 上がった/リタイアしたプレイヤーの一覧表示
        const endPlayers = [
            ...playersList.endPlay,
            ...playersList.inPlay.filter((player) => !player.isInPlay()),
        ];
        if (endPlayers.length !== 0) {
            console.log('\n');
            this.renderEndPlayers(endPlayers);
        }
    }

    private renderTurnAction(player: Player) {
        // nullだったら何もしない
        if (player.action === null) return;
        // 'pass'だったら回数と共に表示
        if (player.action === 'pass') {
            console.log(`${player.name} は ${player.pass}回目のパスです。`);
            // リタイア
            if (player.isRetired()) {
                console.log(`${player.name} はリタイアしました...`);
            }
            return;
        }
        // カードを出していたら何を出したかを表示
        if (player.action instanceof Card) {
            const card = player.action;
            console.log(
                `${player.name} は ${this.constructCardString(card)} を出しました。`
            );
            // 上がり
            if (player.isFinished()) {
                console.log(`${player.name} は上がりました！`);
            }
            return;
        }
    }

    private renderEndPlayers(players: Player[]) {
        let finished = '';
        let retired = '';
        for (const player of players) {
            if (player.isFinished()) {
                finished += ` ${player.name}`;
            } else if (player.isRetired()) {
                retired += `${player.name}`;
            }
        }
        console.log(`上がり　: ${finished}`);
        console.log(`リタイア: ${retired}`);
    }

    private constructCardString(card: Card): string {
        return `${View.suitSymbols[card.index.suit]}${
            View.rankSymbols[card.index.rank]
        }`;
    }

    private constructHandString(hand: CardCollection): string {
        let str = '';
        for (const card of hand.cards) {
            str += ` ${this.constructCardString(card)}`;
        }
        return str;
    }


}
