import { DisposableEffect } from './DisposableEffect.ts'

export abstract class ManaPointEffect extends DisposableEffect<ManaPointEffectAffected> {
    protected constructor(private increaseBy: number) {
        super()
    }

    public override apply(effectAffected: ManaPointEffectAffected): void {
        effectAffected.increaseManaPoint(this.increaseBy)
    }
}

export interface ManaPointEffectAffected {
    increaseManaPoint(increaseBy: number): void
}

export class ManaBurnEffect extends ManaPointEffect {
    public constructor(manaBurned: number) {
        super(manaBurned)
    }
}

export class ManaRestoreEffect extends ManaPointEffect {
    public constructor(manaRestored: number) {
        super(manaRestored)
    }
}