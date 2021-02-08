import * as React from "react";
import Spell from "./Spell";
import {connect} from "react-redux";
import {IState} from "../../reducers";
import {ISpellType} from "../../reducers/players";
import {selectSpell} from "../../actions/game";
import {IRoundType, RoundTypes} from "../../reducers/game";

interface IProps {
    spells: ISpellType[]
    roundType: IRoundType
}

interface DispatchToProps {
    selectSpell: selectSpell
}

const SpellBookComponent: React.FC<IProps & DispatchToProps> = ({spells, selectSpell,roundType}) => {
    return (
        <div>
            {spells.map((spell, id) => <Spell
                key={id}
                spell={spell}
                selectSpell={() => {roundType === RoundTypes.CAST ?  selectSpell(id) : () => {}}}
            />)}
        </div>
    )
};

const states = (state: IState) => ({
    spells: state.game.playerOrder!.currentPlayer()[0].spells,
    roundType: state.game.playerOrder!.getGameStatus().roundType
});

const SpellBook = connect(states, {selectSpell})(SpellBookComponent);

export default SpellBook