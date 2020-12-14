const toggleMenu = () => {
    const menu = document.querySelector('menu'),
        menuItems = menu.querySelectorAll('ul>li'),
        btnScroll = document.querySelector('main>a');

    const handlerMenu = () => {
        menu.classList.toggle('active-menu');
    };
    document.addEventListener('click', event => {
        let target = event.target,
            targetMenubtn = event.target,
            targetMenu = event.target;
        if (target.classList.contains('close-btn')) {
            handlerMenu();
        } else {
            target = target.closest('menu>ul>li>a');
            if (target) {
                handlerMenu();
            }
        }
        targetMenubtn = targetMenubtn.closest('.menu');
        if (targetMenubtn) {
            handlerMenu();
        } else {
            targetMenu = targetMenu.closest('menu');
            if (!targetMenu) {
                menu.classList.remove('active-menu');
            }
        }
    });
    const smoothScroll = item => {
        const link = item.getAttribute('href').substring(1);

        const scrollTarget = document.getElementById(link),
            elementPosition = scrollTarget.getBoundingClientRect().top;

        window.scrollBy({
            top: elementPosition,
            behavior: 'smooth'
        });
    };

    menuItems.forEach(elem => {
        const href = elem.querySelector('a');
        href.addEventListener('click', e => {
            e.preventDefault();
            smoothScroll(href);
        });
    });
    btnScroll.addEventListener('click', e => {
        e.preventDefault();
        smoothScroll(btnScroll);
    });

};

export default toggleMenu;