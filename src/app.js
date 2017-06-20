import board from './board';

const boardInstance = new board();

const root = document.getElementById('root');
root.innerHTML = boardInstance.print();
