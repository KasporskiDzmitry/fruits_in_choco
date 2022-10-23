export const routes =  [
    {path: "/", name: "Главная"},
    {path: "/shop", name: "Магазин"},
    {path: "/shop/cupcakes", name: "Капкейки"},
    {path: "/shop/cakepops", name: "Кейк-попсы"}
]

export const scrollToTarget = (target) => {
    const anchorEl = document.getElementById(target);
    if (anchorEl) {
        anchorEl.scrollIntoView();
    }
}