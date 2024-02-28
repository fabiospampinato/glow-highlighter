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
  base: '#a2aab1',
  primary: '#7dd3fc',
  secondary: '#f472b6',
  accent: '#419fff',
  char: '#64748b',
  comment: '#6f7a7d',
  error: '#ff0000',
  special: '#fffff',
  marked: '#2dd4bf26'
};

const THEME_LIGHT = {
  base: '#555555',
  primary: '#0068d6',
  secondary: '#bd2864',
  accent: '#456aff',
  char: '#8e989c',
  comment: '#9aa1a3',
  error: '#ff0000',
  special: '#7820bc',
  marked: '#51c6fe29'
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
