export type Language = 'es' | 'en';

export const isInstanceOfLanguage = (value: string): value is Language =>
  ['es', 'en'].includes(value);
