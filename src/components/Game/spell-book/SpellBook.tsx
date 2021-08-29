import * as React from "react";
import Spell from "../Spell";
import {useSelector} from "react-redux";
import {getRoundType, getSpells, selectSpell} from "../../../reducers/game/game.actions";
import {RoundTypes} from "../../../reducers/game/game.types";



const SpellBook: React.FC = () => {
    const spells = useSelector(getSpells);
    const roundType = useSelector(getRoundType);
    return (
        <div>
            {spells && spells.map((spell, id) => <Spell
                key={id}
                spell={spell}
                selectSpell={() => {roundType === RoundTypes.CAST ?  selectSpell(id) : () => null}}
            />)}
        </div>
    )
};

export default SpellBook