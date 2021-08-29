import {Action, PayloadAction, ThunkAction} from "@reduxjs/toolkit";
import {CharacterTypes, RoundTypes} from "./game/game.types";
import {ICreature} from "./creatures";
import {IPlayerTypes} from "./players/players.reducer";
import {rootReducer, store} from "./index";
import {SpellTypes} from "./players/player.actions";
import {IModalContent, IPages} from "./pageState/pageState.types";

declare global {
  type PathSetter<T> = {path: (string | number)[], data: T};
  type RootState = ReturnType<typeof rootReducer>;
  type AppDispatch = typeof store.dispatch
  type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
  type SpellType = keyof typeof SpellTypes;
  type ICursor = {
    x: number;
    y: number;
  }

  namespace Player {
    interface Spell {
      name: string;
      chance: number;
      alignment: number;
      range: number;
    }
    type Store = Player[]
    namespace Actions {
      type SET = PayloadAction<PathSetter<any>>
      type ADD = PayloadAction<Player>
      type STEP = PayloadAction<{row: number, column: number, id: Player.Player['id']}>
      type REMOVE = PayloadAction<Player.Player['id']>
      type RESET_POINTS = Action
      type INIT_PLAYERS = PayloadAction<{row:number,column:number}[]>
    }
    interface Player {
      id: string;
      name: string;
      col?: number;
      row?: number;
      dead: boolean;
      playerType: IPlayerTypes;
      spells: SpellType[];
      creatures: ICreature[];
      stats: Stats;
      movementPoints: number;
      attackPoints: number;
    }
    interface Stats {
      [key: string]: any;
      "combat": number;
      "defence": number;
      "magicResistance": number;
      "manoeuvreRating": number;
    }


  }
  namespace Board {
    interface Store {
      rows: number,
      columns: number,
      cellSize: number
    }
    namespace Actions {
      type SET = PayloadAction<PathSetter<number>>
    }
  }
  namespace Game {
    interface Store {
      round: number;
      roundType: RoundTypes;
      currentPlayer?: Player.Player['id'],
      playerOrder: Player.Player['id'][],
      cursor: ICursor,
      selectedSpellIndex: number | null,
      selectedCharacter: {
        id?: string,
        characterType: CharacterTypes
      }
    }
    namespace Actions {
        type SET = PayloadAction<PathSetter<any>>
        type INIT = PayloadAction<Game.Store>
        type NEXT_PLAYER = PayloadAction<number>
        type SELECT_CHARACTER = PayloadAction<{id: string, characterType: CharacterTypes }>
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
      modalContent: IModalContent;
    }
    namespace Actions {
      type SET = PayloadAction<PathSetter<any>>
      type SET_MODAL = PayloadAction<JSX.Element>
    }
  }
}