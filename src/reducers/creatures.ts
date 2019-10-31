
export const CreatureTypes = {
    'KING_COBRA': {
        img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAAyCAYAAADm1uYqAAAD3UlEQVR4Xu2dWXLbQAxER8eNL5TjKqUPphhGFMFRYxnUy0+qYgqDfg20qcXOY/AHAhCAwCIEHov0SZsQgAAEBoHFEEAAAssQILCWsYpGIQABAosZgAAEliFAYC1jFY1CAALTgfXrOZ5n+H4/ar82tnLvlpHtog8dFrfjrqngB4F18Lt62FrGs8JgWfq8ugYdV4Riv17BD1NgPcd4PsZ47P/+Ob2/GqP60lcA7zlqXfShw3NK7teu4IcpsF7SjqF1lLsXUz2wOvVuGbuVvdnrQ4fF7bhrMvwwB9YVhozmr3qyfn3l3i0au+hDh8XtuGsy/CCwxhgZ4OPGqo++Lj6hY376CSwCa356gh/JogcDvzguww8Ci8CqtQUfuslYEA846JinSmARWPPTE/xIFj0YOHdYtYBv3Zy9Xbvau51n76jt/301TR28qfBxAMXmVdDBHdbBSb6LK0ZbV6ODHx00vBytoIPAIrB06eJQqcKSfCurgwYC69spcHo8w+UEdrJsBz86aCCwJgfY+2EMlzfhe/U7+NFBA4F1b27Drma4wlCbDurgRwcNBJZpXOMvYrjimX86sYMfHTQQWLX24m83DFctYzr40UEDgVVrLwgs/HAjQGDp0N76WMOnD47tW6r+4UR06AZIUWl1P6z9v1hV3o0VdMgCq7IRx6Wq8Ild70XHDwVhW42rRV/FixV0uAXWmfgK5t0JLHTYlvabq678qOzB8bWddxy2me+i453GKG2XgTX7/DtKgHVR0PH+Pw3J+gZyx49qs7SfudV13Onf+m6u58tDboF1Jk4FyBpU23Xqc9X1rHrU56rrRerI6n02sKrtRMQ7f2qPCCzrhh2uUxthbUN9rrpepI6s3gksq8v6H5gmsOzs/7kya1nU56rrWXEqzlXUsPbreXeUqcP7bHV9AmtyYtVGWNtQn6uuF6kjq3fusKwuc4dlJ+X8FC5rWdTnqutZDVKcq6hh7Zc7rDlSao+4w5rzIe2XmakHQF3PilNxrqKGtV8Ca46U2qNbgTXX8vmjIt9S34NDx3sCK/sR2fvZU0LFXEXr8NyLIw+FtsvA2g5VClM0Pjsc6Pif3Mp+ZPauDK5sHcq98AiqrSaBNZt8yT8XphywzGX5Vkdm7wSWbXmUHpkDy9YaV0EAAhDwI0Bg+bGlMgQgICZAYImBUg4CEPAjQGD5saUyBCAgJkBgiYFSDgIQ8CNAYPmxpTIEICAmQGCJgVIOAhDwI0Bg+bGlMgQgICZAYImBUg4CEPAjQGD5saUyBCAgJkBgiYFSDgIQ8CNAYPmxpTIEICAmQGCJgVIOAhDwI/AHL/fHUU4fz30AAAAASUVORK5CYII=",
        frames: 3,
        speed: 500,
        stats: {
            combat: 4,
            rangedCombat: 0,
            range: 0,
            defence: 1,
            movementPoints: 1,
            manoeuvreRating: 6,
            magicResistance: 1
        }
    }
};

export enum ICreatureTypes {
    KING_COBRA = 'KING_COBRA'
}

export interface ICreature {
    player: number,
    creatureType: ICreatureTypes,
    dead: boolean,
    undead: boolean
    col: number,
    row: number,
}