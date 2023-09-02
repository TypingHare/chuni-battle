import { Units } from '../src/world/collection/Units'
import { Battle } from '../src/gameplay/battle/Battle'
import { Faction } from '../src/gameplay/battle/Faction'
import { BattlefieldPosition } from '../src/gameplay/battle/BattlefieldPosition'

describe('', function() {
    it('', () => {
        const spiderWarrior1 = Units.SPIDER_WARRIOR.createInstance({ level: 4 })
        const spiderWarrior2 = Units.SPIDER_WARRIOR.createInstance({ level: 6 })

        const battle = new Battle(
            [null, null, spiderWarrior1, null, null],
            [null, null, spiderWarrior2, null, null],
        )

        const battleUnit = battle.getBattleField().getBattleUnit(BattlefieldPosition.of(Faction.Own, 2))
        console.log(battleUnit)
    })
})

// function printSizeOf(object: object, name: string): void {
//     const jsonString = JSON.stringify(object, replacer)
//     const sizeInBytes = new TextEncoder().encode(jsonString).length
//
//     console.log(`Size of "${name}": ${(sizeInBytes / 1000).toFixed(2)} kB.`)
// }
//
// function replacer(_key: any, value: any) {
//     if (value instanceof Map) {
//         return {
//             dataType: 'Map',
//             value: Array.from(value.entries()), // or with spread: value: [...value]
//         }
//     } else {
//         return value
//     }
// }

// function reviver(_key: string, value: any) {
//     if(typeof value === 'object' && value !== null) {
//         if (value.dataType === 'Map') {
//             return new Map(value.value);
//         }
//     }
//     return value;
// }