export type ExpandRecursively<T> = T extends Record<string, unknown>
  ? T extends infer O
    ? { [K in keyof O]: ExpandRecursively<O[K]> }
    : never
  : T;

export type DistributiveOmit<T, U extends keyof T> = T extends unknown
  ? Omit<T, U>
  : never;
