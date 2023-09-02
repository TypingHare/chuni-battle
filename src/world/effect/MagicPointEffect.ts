import { DisposableEffectModel } from './DisposableEffect.ts'

export abstract class MagicPointEffectModel extends DisposableEffectModel<ManaPointEffectAffected> {
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