
/* HELPERS */

type Disposer = () => void;

/* MAIN */

type AbortSignal = {
  aborted: boolean
};

type Options = {
  code: string,
  language: string,
  theme: GlowTheme,
  background?: string,
  signal?: AbortSignal
};

type GlowTheme = {
  /* BASE */
  base: string,
  /* BRAND */
  primary: string,
  secondary: string,
  accent: string,
  /* GRAY */
  char: string,
  comment: string,
  /* SPECIAL */
  error: string,
  special: string,
  /* SELECTION */
  marked: string
};

type GlowToken = {
  /* CONTENT */
  value: string,
  /* POSITION */
  startIndex: number,
  endIndex: number,
  /* STYLE */
  color: string,
  fontStyle: string,
  fontWeight: string,
  textDecoration: string
};

/* EXPORT */

export type {Disposer};
export type {AbortSignal, Options, GlowTheme, GlowToken};
