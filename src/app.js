function print() {
    return '<table>' +
        '<tr>' +
        '<td><input type="button" value="" id="11" onclick="select(id)"></td>' +
        '<td><input type="button" value="" id="12" onclick="select(12)"></td>' +
        '<td><input type="button" value="" id="13" onclick="select(13)"></td>' +
        '</tr>' +
        '<tr>' +
        '<td><input type="button" value="" id="21" onclick="select(21)"></td>' +
        '<td><input type="button" value="" id="22" onclick="select(22)"></td>' +
        '<td><input type="button" value="" id="23" onclick="select(23)"></td>' +
        '</tr>' +
        '<tr>' +
        '<td><input type="button" value="" id="31" onclick="select(31)"></td>' +
        '<td><input type="button" value="" id="32" onclick="select(32)"></td>' +
        '<td><input type="button" value="" id="33" onclick="select(33)"></td>' +
        '</tr>' +
        '</table>';
}
function select(id) {
    console.log(id + 'のボタンが押されました。');
}
const root = document.getElementById('root');
console.log(print());
root.innerHTML = print();
select(1);