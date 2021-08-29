
export function shuffle(array: any[]) {
    return array.sort(() => Math.random() - 0.5);
}
// export function shuffle<T>(a: T[]): T[] {
//     for (let i = a.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [a[i], a[j]] = [a[j], a[i]];
//     }
//     return [...a];
// };


export function playersValid(arr: {[key: string]: any}[], key: string) {
    return !arr.reduce((acc, el) => {
        acc.valid = acc.valid || el[key] === "" || acc.elements.includes(el[key]);
        acc.elements.push(el[key]);
        return acc;
    }, {elements: [], valid: false}).valid;
}

export function limitInt (num: number, max: number, min: number = 0): number {
    return Math.min(Math.max(num, min), max)
}
