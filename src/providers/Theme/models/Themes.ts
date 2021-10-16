import { Theme } from './Theme';

export type Themes<T extends string> = Record<T, Theme>;
