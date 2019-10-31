import * as React from "react";
import {ISpellType, SpellTypes} from "../../reducers/players";
import {selectSpell} from "../../actions/game";

interface IProps {
    spell: ISpellType,
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

const alignment = (alignment:number) => {
    if (alignment < 0) {return 'chaos'}
    else if (alignment === 0) { return 'neutral'}
    else { return 'law'}
}

export default Spell