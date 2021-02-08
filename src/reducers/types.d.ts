import {PayloadAction} from "@reduxjs/toolkit";
import {IPages} from "./pageState";
import {CharacterTypes} from "./game";

declare global {
  namespace Player {
  }
  namespace Game {
    interface Store {
      currentPlayer: number,
      playerOrder: number[],
      cursor: {
        y: 0,
        x: 0
      },
      selectedSpellIndex: null,
      selectedCharacter: {
        name: string,
        characterType: CharacterTypes
      }
    }
    namespace Actions {
        type SET = PayloadAction<{path: (string | number)[], data: any}>
        type INIT = PayloadAction<Game.Store>
        type NEXT_PLAYER = PayloadAction<number>
        type SELECT_CHARACTER = PayloadAction<{name: string, characterType: CharacterTypes }>
        type SELECT_SPELL = PayloadAction<number>
        type STEP_CURSOR = PayloadAction<{x: number, y: number}>
    }
  }
  namespace PageState {
    interface Store {
      [key: string]: any;
      cellSize: number;
      loading: boolean;
      appName: string;
      page: IPages;
      modalOpen: boolean;
      modalContent?: JSX.Element;
    }
    namespace Actions {
      type SET = PayloadAction<{path: (string | number)[], data: any}>
      type SET_MODAL = PayloadAction<JSX.Element>

    }
  }
}