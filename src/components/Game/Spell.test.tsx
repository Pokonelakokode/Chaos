import React from "react";
import renderer from 'react-test-renderer'
import Spell from "./Spell";

test('Spell renders',() => {
    const component = renderer.create(
        <Spell selectSpell={() => {console.log('SPELL')}} spell="KING_COBRA"/>
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})