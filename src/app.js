function select(id) {
    console.log(`${id}のボタンが押されました。`);
}

function createDOM() {
    let el = document.createElement("input");
    el.type = "button";
    el.addEventListener("click", () => {
        select(11);
    });
    el.addEventListener("click", () => {
        select(12);
    });
    return el;
}

const root = document.getElementById('root');
const el = createDOM();
root.appendChild(el);
