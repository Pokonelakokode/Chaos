import * as React from "react";
import {SpellTypes} from "../../reducers/players/player.actions";

interface IProps {
    spell: SpellType,
    selectSpell(): void
}

const Spell: React.FC<IProps> = (props) => {
    const spell = SpellTypes[props.spell];
    return (
        <div
            onClick={props.selectSpell}
            className={`spell ${alignment(spell.alignment)}`}
        >
            {spell.name}
        </div>
    )
};

const alignment = (side: number) => {
    if (side < 0) {return 'chaos'}
    else if (side === 0) { return 'neutral'}
    else { return 'law'}
}

export default Spell