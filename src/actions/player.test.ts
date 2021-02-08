import configureMockStore from 'redux-mock-store'
import {createStats, PlayerActions, PlayerActionTypes, resetMovementPoints} from "./player";
import thunk from "redux-thunk";
import {initialPlayer, IPlayerTypes, players} from "../reducers/players";
import {createStore} from 'redux';
import {positions} from "../reducers/board";

test('1 + 1 equals 2',() => {
    expect(1 + 1).toBe(2);
})



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
    const testPlayer = {
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
    }

    // const middlewares = [thunk];
    // const mockPlayers = configureMockStore(middlewares);
    let store = createStore(players,[initialPlayer]);
    beforeEach(() => {
        store = createStore(players,[initialPlayer]);
    });
    it('CAN set',() => {
        const action:PlayerActions['SET'] = {
            type: PlayerActionTypes.SET,
            path: ['0','movementPoints'],
            data: 1
        };
        store.dispatch(action);
        // expect(store.getActions()).toEqual([action]);
        expect(store.getState()).toStrictEqual([{...initialPlayer,movementPoints: 1}])
    })
    it('should be able to ADD a Player', () => {
        const action:PlayerActions['ADD'] = {
            type: PlayerActionTypes.ADD,
            player: testPlayer
        };
        store.dispatch(action);
        // expect(store.getActions()).toEqual([action]);
        expect(store.getState()).toStrictEqual([initialPlayer,testPlayer])
    });
    it('Reset Movement Points for a Player',() => {
        store.dispatch(resetMovementPoints());
        expect(store.getState()).toStrictEqual([{...initialPlayer, movementPoints: 1,attackPoints: 1}]);
    })
    it('should be able to remove a player', function () {
        store.dispatch({
            type: PlayerActionTypes.REMOVE,
            index:0
        })
        expect(store.getState()).toStrictEqual([]);
    });
    it('should be able to shuffle players', function () {
        store = createStore(players,[initialPlayer,testPlayer,testPlayer]);
        store.dispatch({type: PlayerActionTypes.SHUFFLE});
        expect(store.getState()).not.toStrictEqual([initialPlayer,testPlayer,testPlayer])
    });
    it('should be able to init players', function () {
        store = createStore(players,[initialPlayer,testPlayer]);
        store.dispatch({type:PlayerActionTypes.INIT_PLAYERS,positions:positions(10,10,store.getState().length)});
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
    it('should be able to step player', function () {
        store.dispatch({type: PlayerActionTypes.STEP,col:1,row:1,name:""})
        expect(store.getState()[0]).toStrictEqual({...initialPlayer,col:1,row:1})
    });

});

