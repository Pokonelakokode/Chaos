import {ISpellType, SpellTypes} from "./reducers/players";

export const  shuffle = (a: any[]) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

export function randomKey<T, K>(obj: typeof SpellTypes): ISpellType {
    const keys = Object.keys(obj) as ISpellType[];
    const c = keys[ keys.length * Math.random() << 0];
    return c;
}

export function playersValid(arr: Array<{[key: string]: any}>, key: string) {
    return !arr.reduce((acc, el) => {
        acc.valid = acc.valid || el[key] === "" || acc.elements.includes(el[key]);
        acc.elements.push(el[key]);
        return acc;
    }, {elements: [], valid: false}).valid;

}
