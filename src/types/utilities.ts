export type Nullable<T> = T | null;

export type DeepNullable<T extends object> = {
  [K in keyof T]: Nullable<T[K]>;
};

export type RequiredExcept<T, TExcept extends keyof T> = Required<
  DeepNonNullable<Omit<T, TExcept>>
> &
  Pick<T, TExcept>;

// From https://github.com/piotrwitek/utility-types
// eslint-disable @typescript-eslint/no-empty-interface
export type DeepNonNullable<T> = T extends (...args: any[]) => any
  ? T
  : T extends any[]
  ? _DeepNonNullableArray<T[number]>
  : T extends object
  ? _DeepNonNullableObject<T>
  : T;
/** @private */
// tslint:disable-next-line:class-name
export type _DeepNonNullableArray<T> = Array<DeepNonNullable<NonNullable<T>>>;
/** @private */
export type _DeepNonNullableObject<T> = {
  [P in keyof T]-?: DeepNonNullable<NonNullable<T[P]>>;
};

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};
