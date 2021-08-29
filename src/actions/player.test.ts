import {createStats, PlayerActions} from "../reducers/players/player.actions";
import {addPlayerId, initialPlayer, IPlayerTypes, playerReducer} from "../reducers/players/players.reducer";
import {createStore} from 'redux';
import {positions} from "../reducers/board/board.reducer";

test('Creating Stats',() => {
    const stats = createStats();
    expect(stats.manoeuvreRating).toBeGreaterThanOrEqual(1);
    expect(stats.manoeuvreRating).toBeLessThanOrEqual(9);
    expect(stats.magicResistance).toBeGreaterThanOrEqual(1);
    expect(stats.magicResistance).toBeLessThanOrEqual(9);
    expect(stats.combat).toBeGreaterThanOrEqual(1);
    expect(stats.combat).toBeLessThanOrEqual(9);
    expect(stats.defence).toBeGreaterThanOrEqual(1);
    expect(stats.defence).toBeLessThanOrEqual(9);
});

describe('Player Reducer Actions', () => {
    const testPlayer = addPlayerId({
        name: 'TEST',
        movementPoints: 1,
        dead: true,
        spells: [],
        creatures: [],
        stats: createStats(),
        attackPoints: 1,
        row: 0,
        col: 0,
        playerType: IPlayerTypes.RED
    });
    const _initialPlayer = addPlayerId({...initialPlayer});

    let store = createStore(playerReducer,[]);
    beforeEach(() => {
        store = createStore(playerReducer,[_initialPlayer]);
    });
    it('CAN set',() => {
        // const action:playerActions['SET'] = {
        //     type: PlayerActionTypes.SET,
        //     path: ['0','movementPoints'],
        //     data: 1
        // };
        store.dispatch(PlayerActions.setPlayer({
            path: [0,'movementPoints'],
            data: 1
        }));
        // expect(store.getActions()).toEqual([action]);
        expect(store.getState()).toStrictEqual([{..._initialPlayer,movementPoints: 1}])
    })
    it('should be able to ADD a Player', () => {
        store.dispatch(PlayerActions.addPlayer({...testPlayer}));
        expect(store.getState()).toStrictEqual([_initialPlayer,testPlayer])
    });
    it('Reset Movement Points for a Player',() => {
        store.dispatch(PlayerActions.resetPoints());
        expect(store.getState()).toStrictEqual([{..._initialPlayer, movementPoints: 1,attackPoints: 1}]);
    })
    it('should be able to remove a player', () => {
        store.dispatch(PlayerActions.removePlayer(store.getState()[0].id))
        expect(store.getState()).toStrictEqual([]);
    });
    it('should be able to shuffle players', () => {
        store.dispatch(PlayerActions.addPlayer(testPlayer));
        store.dispatch(PlayerActions.addPlayer(testPlayer));
        store.dispatch(PlayerActions.shufflePlayers());
        // expect(store.getState()).not.toStrictEqual([_initialPlayer,testPlayer,testPlayer])
        expect(store.getState()).toEqual(expect.arrayContaining([_initialPlayer,testPlayer,testPlayer]))
    });
    it('should be able to init players', () => {
        store.dispatch(PlayerActions.addPlayer(testPlayer));
        store.dispatch(PlayerActions.initPlayers(positions(10,10,store.getState().length)));
        store.getState().forEach(player => {
            expect(player.spells.length).toEqual(3);
            expect(player.spells.length).toEqual(3);
            expect(player.dead).toBe(false);
            expect(player.stats.defence).toBeLessThanOrEqual(9);
            expect(player.stats.combat).toBeLessThanOrEqual(9);
            expect(player.stats.magicResistance).toBeLessThanOrEqual(9);
            expect(player.stats.manoeuvreRating).toBeLessThanOrEqual(9)
        });
        expect(store.getState()[0].row).toBe(4);
        expect(store.getState()[0].col).toBe(0);
        expect(store.getState()[1].row).toBe(4);
        expect(store.getState()[1].col).toBe(9);
    });
    it('should be able to step player', () => {
        store.dispatch(PlayerActions.initPlayers(positions(10,10,store.getState().length)))
        const expected = store.getState()[0];
        store.dispatch(PlayerActions.step({col: 1, row: 1, id: store.getState()[0].id}))
        expect(store.getState()[0]).toStrictEqual({...expected,col:1,row:1, movementPoints: 0})
    });

});

