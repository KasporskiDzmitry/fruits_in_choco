export const routes =  [
    {path: "/", name: "Главная"},
]

export const scrollToTarget = (target) => {
    const anchorEl = document.getElementById(target);
    if (anchorEl) {
        anchorEl.scrollIntoView();
    }
}