import Chance from "chance";

/**
 * Enforces some methods of the original `Chance` class to return unique
 * results per instance.
 */
export class UniqueChance extends Chance {
  private history = new Set();

  constructor(...args: any[]) {
    super(...args);
  }

  word(opts?: Partial<Chance.WordOptions>): string {
    const result = this.getUnique(super.word.bind(this, opts));
    this.history.add(result);

    return result;
  }

  sentence(opts?: Partial<Chance.SentenceOptions>): string {
    const result = this.getUnique(super.sentence.bind(this, opts));
    this.history.add(result);

    return result;
  }

  private getUnique(fn: (...args: any[]) => any) {
    for (let i = 0; i < 100; i += 1) {
      const result = fn();
      if (!this.history.has(result)) {
        return result;
      }
    }

    throw new Error("An attempt to get a unique value was unsuccessful.");
  }
}
