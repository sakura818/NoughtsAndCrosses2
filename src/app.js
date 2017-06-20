import myModule from './myModule';
import myModule2 from './myModule2';

const root = document.querySelector('#root');
const greet1 = myModule.hello();
const greet2 = myModule2();
root.innerHTML = `<p>${greet1}</p><p>${greet2}</p>`;