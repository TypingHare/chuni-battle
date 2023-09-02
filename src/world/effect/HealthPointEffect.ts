import { DisposableEffectModel } from './DisposableEffect.ts'

export class HealthPointEffectModel extends DisposableEffectModel<HealthPointEffectAffected> {
    public constructor(private increaseBy: number) {
        super()
    }

    public override apply(effectAffected: HealthPointEffectAffected): void {
        effectAffected.increaseHealthPoint(this.increaseBy)
    }
}

export interface HealthPointEffectAffected {
    increaseHealthPoint(increaseBy: number): void
}