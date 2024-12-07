
/* IMPORT */

import * as Highlighter from 'tokens-highlighter';
import Tokenizer from './tokenizer';
import type {Disposer, AbortSignal, Options, GlowTheme, GlowToken} from './types';

/* MAIN */

class GlowHighlighter {

  /* VARIABLES */

  private tokenizer: Tokenizer = new Tokenizer ();

  /* API */

  highlightToAbstract = async <T> ( options: Options, highlighter: ( tokens: GlowToken[][], options: { backgroundColor?: string } ) => T ): Promise<T> => {

    const lines = options.code.replace ( /^(\r?\n|\r)+|(\r?\n|\r)+$/g, '' ).split ( /\r?\n|\r/g );
    const tokens: GlowToken[][] = new Array ( lines.length ).fill ( [] );

    await this.tokenize ( lines, options.language, options.theme, options.signal, ( lineTokens, lineIndex ) => {
      tokens[lineIndex] = lineTokens;
    });

    const backgroundColor = options.background || 'transparent';
    const result = highlighter ( tokens, { backgroundColor } );

    return result;

  };

  highlightToANSI = ( options: Options ): Promise<string> => {

    return this.highlightToAbstract ( options, Highlighter.toANSI );

  };

  highlightToDOM = ( options: Options ): Promise<HTMLPreElement> => {

    return this.highlightToAbstract ( options, Highlighter.toDOM );

  };

  highlightToHighlights = ( options: Options ): Promise<[HTMLPreElement, Disposer]> => {

    return this.highlightToAbstract ( options, Highlighter.toHighlights );

  };

  highlightToHTML = ( options: Options ): Promise<string> => {

    return this.highlightToAbstract ( options, Highlighter.toHTML );

  };

  tokenize = ( lines: string[], language: string, theme: GlowTheme, signal?: AbortSignal, onTokens?: ( tokens: GlowToken[], lineIndex: number ) => void ): Promise<GlowToken[][]> => {

    return this.tokenizer.tokenize ( lines, language, theme, signal, onTokens );

  };

}

/* EXPORT */

export default GlowHighlighter;
export type {Options, GlowTheme, GlowToken};
