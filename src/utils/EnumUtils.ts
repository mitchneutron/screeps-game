export function InitializeRecord<T extends string | number | symbol, Y>(keys: T[], val: Y) : Record<T, Y>  {
    // @ts-ignore
    const toReturn : Record<T, Y> = {};
    for(const x of keys) {
        toReturn[x] = val;
    }
    return toReturn;
}

// Turn enum into array
export function EnumToArray(object : any) : number[] {
    return Object.keys(object)
        .map(x => Number(x))
        .filter(x => !isNaN(x));
}