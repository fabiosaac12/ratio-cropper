import { Language } from './Language';

export type Messages<T extends string> = Record<T, Record<Language, string>>;
