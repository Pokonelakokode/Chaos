import { render } from '@testing-library/react';
import Spell from "./Spell";

test('Spell renders',() => {
    render(
        <Spell selectSpell={() => {console.log('SPELL')}} spell="KING_COBRA"/>
    );
    // Test passes if component renders without throwing
});