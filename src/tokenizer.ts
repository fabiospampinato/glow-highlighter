
/* IMPORT */

import {makeIntervalYielder} from 'event-loop-yielder';
import {parseRow} from 'nue-glow/src/glow.js';
import type {AbortSignal, GlowTheme, GlowToken} from './types';

/* HELPERS */

const yieldToEventLoop = makeIntervalYielder ( 10 );

const TAG_TO_COLOR_NAME: Partial<Record<string, keyof GlowTheme>> = {
  b: 'primary',
  em: 'secondary',
  strong: 'accent',
  i: 'char',
  u: 'error',
  sup: 'comment',
  label: 'special',
  mark: 'marked'
};

const TAG_TO_FONT_STYLE: Partial<Record<string, string>> = {
  sup: 'italic'
};

const TAG_TO_FONT_WEIGHT: Partial<Record<string, string>> = {
  label: 'bold'
};

const TAG_TO_TEXT_DECORATION: Partial<Record<string, string>> = {
  u: 'underline'
};

/* MAIN */

class Tokenizer {

  /* API */

  tokenize = async ( lines: string[], language: string, theme: GlowTheme, signal?: AbortSignal, onTokens?: ( tokens: GlowToken[], lineIndex: number ) => void ): Promise<GlowToken[][]> => { //TODO: Optimize this //TODO: Maybe add a sync version too

    const linesTokens: GlowToken[][] = new Array ( lines.length ).fill ( [] );

    for ( let i = 0, l = lines.length; i < l; i++ ) {

      if ( i % 10 === 0 ) await yieldToEventLoop ();

      if ( signal?.aborted ) return linesTokens;

      const line = lines[i];
      const lineTokensRaw = parseRow ( line, language );
      const lineTokens: GlowToken[] = [];

      let index = 0;

      for ( let ti = 0, tl = lineTokensRaw.length; ti < tl; ti++ ) {

        const tokenRaw = lineTokensRaw[ti];

        if ( tokenRaw.start < index ) continue; //FIXME: Overlapping range, buggy token coming from Glow

        if ( tokenRaw.start > index ) { // Skipped-over range

          const startIndex = index;
          const endIndex = tokenRaw.start;
          const value = line.slice ( startIndex, endIndex );

          const color = theme.base;
          const fontStyle = '';
          const fontWeight = '';
          const textDecoration = '';

          const token = { value, startIndex, endIndex, color, fontStyle, fontWeight, textDecoration };

          lineTokens.push ( token );

        }

        if ( tokenRaw.end > tokenRaw.start ) { // Current range

          const startIndex = tokenRaw.start;
          const endIndex = tokenRaw.end;
          const value = line.slice ( startIndex, endIndex );

          const color = theme[TAG_TO_COLOR_NAME[tokenRaw.tag] || 'base'] || theme.base;
          const fontStyle = TAG_TO_FONT_STYLE[tokenRaw.tag] || '';
          const fontWeight = TAG_TO_FONT_WEIGHT[tokenRaw.tag] || '';
          const textDecoration = TAG_TO_TEXT_DECORATION[tokenRaw.tag] || '';

          const token = { value, startIndex, endIndex, color, fontStyle, fontWeight, textDecoration };

          lineTokens.push ( token );

        }

        index = tokenRaw.end;

      }

      if ( index < line.length ) { // Skipped-over range

        const startIndex = index;
        const endIndex = line.length;
        const value = line.slice ( startIndex, endIndex );

        const color = theme.base;
        const fontStyle = '';
        const fontWeight = '';
        const textDecoration = '';

        const token = { value, startIndex, endIndex, color, fontStyle, fontWeight, textDecoration };

        lineTokens.push ( token );

      }

      onTokens?.( lineTokens, i );

      linesTokens[i] = lineTokens;

    }

    return linesTokens;

  };

}

/* EXPORT */

export default Tokenizer;
