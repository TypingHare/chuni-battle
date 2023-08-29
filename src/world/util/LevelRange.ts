/**
 * Level range.
 */
export class LevelRange {
    /**
     * Creates a level range.
     * @param lowerBound The lower bound of the range (included)
     * @param upperBound The upper bound of the range (included)
     */
    public constructor(
        private lowerBound: number, private upperBound: number,
    ) {
        if (!Number.isInteger(lowerBound)) {
            console.log(`The upper bound of level range (${lowerBound}) is not an integer!`)
        }

        if (!Number.isInteger(upperBound)) {
            console.log(`The upper bound of level range (${upperBound}) is not an integer!`)
        }
    }

    /**
     * Returns the lower bound.
     */
    public getLowerBound(): number {
        return this.lowerBound
    }

    /**
     * Returns the upper bound.
     */
    public getUpperBound(): number {
        return this.upperBound
    }

    /**
     * Returns a random level, which is an integer between the lower bound and upper bound. Both bounds are included.
     */
    public getRandomLevel(): number {
        return Math.floor(Math.random() * (this.upperBound - this.lowerBound + 1)) + this.lowerBound
    }
}