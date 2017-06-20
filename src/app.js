import myModule from './myModule';

const root = document.querySelector('#root');
root.innerHTML = `<p>${new myModule().hello()}</p>`;