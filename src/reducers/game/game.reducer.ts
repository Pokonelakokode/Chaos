import {createSlice} from "@reduxjs/toolkit";
import {
  initGameAction,
  nextPlayerAction,
  selectCharacter,
  selectSpell,
  setGame,
  stepCursor,
  switchRoundType
} from "./game.actions";
import {initialGame, RoundTypes} from "./game.types";
import {assocPath} from "ramda";

const game = createSlice({
  name: 'game',
  initialState: initialGame,
  extraReducers: builder => {
    builder.addCase(initGameAction, (state, action) => action.payload);
    builder.addCase(setGame, (state, action) => assocPath(action.payload.path, action.payload.data, state));
    builder.addCase(nextPlayerAction, (state, action) => {
      return {
        ...state,
        currentPlayer: action.payload
      }
    });
    builder.addCase(selectSpell, (state, action) => ({
      ...state,
      selectedSpellIndex: action.payload
    }));
    builder.addCase(selectCharacter, (state, {payload: {characterType, id}}) => ({
          ...state,
          selectedCharacter: id === state.selectedCharacter.id && characterType === state.selectedCharacter.characterType
            ? {id: "", characterType: "NULL"}
            : {id, characterType}
        }
      )
    )
    builder.addCase(switchRoundType, state => ({
      ...state,
      roundType: state.roundType === RoundTypes.MOVE ? RoundTypes.CAST : RoundTypes.MOVE
    }))
    builder.addCase(stepCursor, (state, action) => ({
      ...state,
      cursor: {
        x: action.payload.x,
        y: action.payload.y
      }
    }))
  },
  reducers: {}
});
export const gameReducer = game.reducer;