
window.addEventListener('DOMContentLoaded', () => {

    //timer
    function countTimer(deadline) {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60) % 24;
            return { timeRemaining, hours, minutes, seconds };
        }

        function addZero(numberTime) {
            if (numberTime < 10) {
                return '0' + numberTime;
            } else {
                return numberTime;
            }
        }

        function updateClock() {
            const timer =  getTimeRemaining();
            const timerId = setInterval(updateClock, 1000);
            timerHours.textContent = addZero(timer.hours);
            timerMinutes.textContent = addZero(timer.minutes);
            timerSeconds.textContent = addZero(timer.seconds);
            if (timer.timeRemaining > 0) {
                timerId;
            } else if (timer.timeRemaining < 0) {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
                clearInterval(timerId);
            }
        }

        updateClock();

    }

    countTimer('01 december 2020');

    //menu
    const toggleMenu = () => {
        const menu = document.querySelector('menu'),
            menuItems = menu.querySelectorAll('ul>li'),
            btnScroll = document.querySelector('main>a');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };
        document.addEventListener('click', (event) => {
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
        const smoothScroll = (item) => {
            const link = item.getAttribute('href').substring(1);

            const scrollTarget = document.getElementById(link),
                elementPosition = scrollTarget.getBoundingClientRect().top;

            window.scrollBy({
                top: elementPosition,
                behavior: 'smooth'
            });
        }

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

    toggleMenu();

    //popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupContent = document.querySelector('.popup-content'),
            popupBtn = document.querySelectorAll('.popup-btn');

        let animate = false,
            count = 0,
            moveInterval,
            width = window.innerWidth,
            moveBlock = function() {
                moveInterval = requestAnimationFrame(moveBlock);
                count += 20;
                width = window.innerWidth;
                if (count < (width - (popupContent.clientWidth / 2)) / 2 && width > 768) {
                    popupContent.style.left = count + 'px';
                } else {
                    cancelAnimationFrame(moveInterval);
                }
            };

        popupBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
                moveInterval = requestAnimationFrame(moveBlock);
                animate = true;
            });
        });
        const resetAnimate = () => {
            if (width > 768) {
                cancelAnimationFrame(moveInterval);
                count = 0;
                animate = false;
                popupContent.style.left = null;
            }
        }
        popup.addEventListener('click', (event) => {
            let target = event.target;

            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none';
                resetAnimate();
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popup.style.display = 'none';
                    resetAnimate();
                }
            }
        });
    };

    togglePopUp();

    //tabs
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');
        const togleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');

            if (target) {
                tab.forEach((item, index) => {
                    if (item === target) {
                        togleTabContent(index);
                    }
                });
            }
        });
    };

    tabs();

});
