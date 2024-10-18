export const routes = [{ path: '/', name: 'Главная' }];

export const scrollToTarget = (target) => {
    console.log(123)
    const anchorEl = document.getElementById(target);
    if (anchorEl) {
        anchorEl.scrollIntoView();
    }
};
