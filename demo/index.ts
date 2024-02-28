
/* IMPORT */

import Highlighter from '../src';

/* HELPERS */

const CODE_DARK = '#24292E';
const CODE_LIGHT = '#FFFFFF';

const BACKGROUND_DARK = '#1f1f1f';
const BACKGROUND_LIGHT = '#ffffff';

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

const highlighter = new Highlighter ();

/* STATE */

let code = `
import shiki from 'shiki';

shiki
  .getHighlighter({
    theme: 'nord',
    langs: ['js'],
  })
  .then(highlighter => {
    const code = highlighter.codeToHtml(\`console.log('shiki');\`, { lang: 'js' })
    document.getElementById('output').innerHTML = code
  });
`;

let background = CODE_LIGHT;
let language = 'js';
let theme = THEME_LIGHT;

/* MAIN */

const onThemeChange = event => {

  const isDark = event.target.checked;

  theme = isDark ? THEME_DARK : THEME_LIGHT;
  background = isDark ? CODE_DARK : CODE_LIGHT;

  document.documentElement.style.backgroundColor = isDark ? BACKGROUND_DARK : BACKGROUND_LIGHT;

  renderHighlights ();

};

const renderControlTheme = (): void => {

  const controls = document.getElementById ( 'controls' );
  const checkbox = document.createElement ( 'input' );

  checkbox.setAttribute ( 'type', 'checkbox' );
  checkbox.checked = ( theme === THEME_DARK );

  checkbox.onchange = onThemeChange;

  controls?.appendChild ( checkbox );

};

const renderControls = (): void => {

  renderControlTheme ();

};

const renderHighlightANSI = async (): Promise<void> => {

  const output = await highlighter.highlightToANSI ({ code, language, theme, background });

  console.log ( output );

};

const renderHighlightHTML = async (): Promise<void> => {

  const target = document.getElementById ( 'output-html' )!;
  const output = await highlighter.highlightToHTML ({ code, language, theme, background });

  target.innerHTML = '';
  target.innerHTML = output;

};

const renderHighlightDOM = async (): Promise<void> => {

  const target = document.getElementById ( 'output-dom' )!;
  const output = await highlighter.highlightToDOM ({ code, language, theme, background });

  target.innerHTML = '';
  target.appendChild ( output );

};

const renderHighlightHighlights = async (): Promise<void> => {

  const target = document.getElementById ( 'output-highlights' )!;
  const [output, dispose] = await highlighter.highlightToHighlights ({ code, language, theme, background }); //TODO: Actually call the "dispose" function at some point though

  target.innerHTML = '';
  target.appendChild ( output );

  // setTimeout ( dispose, 2000 );

};

const renderHighlights = async (): Promise<void> => {

  await renderHighlightANSI ();
  await renderHighlightHTML ();
  await renderHighlightDOM ();
  await renderHighlightHighlights ();

};

renderControls ();
renderHighlights ();
