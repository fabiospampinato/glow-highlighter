# Glow Highlighter

An isomorphic syntax highlighter for [Glow](https://nuejs.org/blog/introducing-glow/).

The interesting thing about `glow` is that it's a microscopic syntax highlighter based on hard-coded heuristics, rather than grammars, and it can achieve a pretty decent syntax highlighting. Basically in the situations where the quality of the syntax highlighting that you get is good enough you can use `glow` to cut down on bundle sizes and/or dependencies massively.

This supports all the rendering modes that [`tokens-highlighter`](https://github.com/fabiospampinato/tokens-highlighter) supports, being built on top of that too.

## Install

```sh
npm install --save glow-highlighter
```

## Usage

```ts
import Highlighter from 'glow-highlighter';

// First of all let's create a theme to use, which requires just a handful of colors

const THEME_DARK = {
  base: '#E1E4E8',
  primary: '#B392F0',
  secondary: '#9ECBFF',
  accent: '#F97583',
  char: '#E1E4E8',
  comment: '#6A737D',
  error: '#ff0000',
  special: '#FFAB70',
  marked: '#F9758329'
};

const THEME_LIGHT = {
  base: '#24292E',
  primary: '#6F42C1',
  secondary: '#032F62',
  accent: '#D73A49',
  char: '#24292E',
  comment: '#6A737D',
  error: '#ff0000',
  special: '#E36209',
  marked: '#D73A4929'
};

// Now we can instantate and use the highlighter

const highlighter = new Highlighter ();

// Rendering some code to HTML

const html = await highlighter.highlightToHTML ({
  code: 'const foo = "bar";',
  language: 'js',
  theme: THEME_DARK
});

// Rendering some code to DOM nodes directly (client-only)

const node = await highlighter.highlightToDOM ({
  code: 'const foo = "bar";',
  language: 'js',
  theme: THEME_DARK
});

// Rendering some code to ANSI, for the terminal

const ansi = await highlighter.highlightToANSI ({
  code: 'const foo = "bar";',
  language: 'js',
  theme: THEME_DARK
});

// Rendering some code to a single <pre> element containing a single Text node (client-only)

const [node, dispose] = await highlighter.highlightToHighlights ({
  code: 'const foo = "bar";',
  language: 'js',
  theme: THEME_DARK
});

dispose (); // The dispose function cleans up all the CSS Custom Highlights, allowing the nodes to be garbage collected

// Doing low-level tokenization, for custom rendering

const lines = [
  'function sum ( a, b ) {',
  '  return a + b;',
  '}'
];

const abortController = new AbortController ();
const abortSignal = abortController.signal;

highlighter.tokenize ( lines, 'js', THEME_DARK, abortSignal, ( lineTokens, lineIndex ) => {
  console.log ( 'Line tokens:', lineTokens );
  console.log ( 'Line index:', lineIndex );
});
```

## License

MIT © Fabio Spampinato
