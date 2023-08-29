/**
 * Types of mobs.
 */
export enum MobType {
    Standard,       // Nothing special
    Elite,          // A mob group has at most one elite mob
    MiniBoss,       // A mini boss will appear with at most two standard mobs
    Boss,           // A boss will appear without any other mobs
}