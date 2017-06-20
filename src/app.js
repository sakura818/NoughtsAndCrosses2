import myModule from './myModule';
import myModule2 from './myModule2';

const greet1 = myModule.hello();
const greet2 = myModule2();
const root = document.getElementById('root');
root.innerHTML = `<p>${greet1}</p><p>${greet2}</p>`;