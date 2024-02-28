
/* IMPORT */

import Highlighter from '../src';

/* HELPERS */

const CODE_DARK = '#24292E';
const CODE_LIGHT = '#FFFFFF';

const BACKGROUND_DARK = '#1f1f1f';
const BACKGROUND_LIGHT = '#ffffff';

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

const highlighter = new Highlighter ();

/* STATE */

let code = `
import shiki from 'shiki';

// Some example code

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
