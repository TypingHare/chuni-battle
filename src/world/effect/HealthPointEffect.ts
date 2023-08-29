import { DisposableEffect } from './DisposableEffect.ts'

export abstract class HealthPointEffect extends DisposableEffect<HealthPointEffectAffected> {
    protected constructor(private increaseBy: number) {
        super()
    }

    public override apply(effectAffected: HealthPointEffectAffected): void {
        effectAffected.increaseHealthPoint(this.increaseBy)
    }
}

export interface HealthPointEffectAffected {
    increaseHealthPoint(increaseBy: number): void
}

export class HealEffect extends HealthPointEffect {
    public constructor(heal: number) {
        super(heal)
    }
}

export class DamageEffect extends HealthPointEffect {
    public constructor(damage: number) {
        super(damage)
    }
}