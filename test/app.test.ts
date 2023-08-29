import { Registries } from '../src/core/Registries'
import { Sites } from '../src/world/Sites'

describe('', function() {
    it('', () => {
        console.log(Sites.DARK_FOREST)

        printSizeOf(Registries.SITE, 'site registry')
    })
})

function printSizeOf(object: object, name: string): void {
    const jsonString = JSON.stringify(object, replacer)
    const sizeInBytes = new TextEncoder().encode(jsonString).length

    console.log(`Size of "${name}": ${(sizeInBytes / 1000).toFixed(2)} kB.`)
}

function replacer(_key: any, value: any) {
    if (value instanceof Map) {
        return {
            dataType: 'Map',
            value: Array.from(value.entries()), // or with spread: value: [...value]
        }
    } else {
        return value
    }
}

// function reviver(_key: string, value: any) {
//     if(typeof value === 'object' && value !== null) {
//         if (value.dataType === 'Map') {
//             return new Map(value.value);
//         }
//     }
//     return value;
// }