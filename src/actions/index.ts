import {IBoardActions} from "./board";
import {IPageStateActions} from "./pageState";
import {IPlayerActions} from "./player";
import {IGameActions} from "./game";

export type IActions = IBoardActions | IPageStateActions | IPlayerActions | IGameActions

export type Dispatch = (action: IActions | any) => void;