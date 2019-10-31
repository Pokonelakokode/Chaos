import {ISpellType, SpellTypes} from "./reducers/players";

export const  shuffle = (a:any[]) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

export function randomKey<T,K> (obj:typeof SpellTypes):ISpellType{
    let keys = Object.keys(obj) as Array<ISpellType>;
    let c = keys[ keys.length * Math.random() << 0];
    return c
};