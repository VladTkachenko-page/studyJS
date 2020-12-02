
window.addEventListener('DOMContentLoaded', () => {

    //timer
    // function countTimer(deadline) {
    //     const timerHours = document.querySelector('#timer-hours'),
    //         timerMinutes = document.querySelector('#timer-minutes'),
    //         timerSeconds = document.querySelector('#timer-seconds');

    //     function getTimeRemaining() {
    //         const dateStop = new Date(deadline).getTime(),
    //             dateNow = new Date().getTime(),
    //             timeRemaining = (dateStop - dateNow) / 1000,
    //             seconds = Math.floor(timeRemaining % 60),
    //             minutes = Math.floor((timeRemaining / 60) % 60),
    //             hours = Math.floor(timeRemaining / 60 / 60) % 24;
    //         return { timeRemaining, hours, minutes, seconds };
    //     }

    //     function addZero(numberTime) {
    //         if (numberTime < 10) {
    //             return '0' + numberTime;
    //         } else {
    //             return numberTime;
    //         }
    //     }

    //     function updateClock() {
    //         const timer =  getTimeRemaining();
    //         const timerId = setInterval(updateClock, 1000);
    //         timerHours.textContent = addZero(timer.hours);
    //         timerMinutes.textContent = addZero(timer.minutes);
    //         timerSeconds.textContent = addZero(timer.seconds);
    //         if (timer.timeRemaining > 0) {
    //             timerId;
    //         } else if (timer.timeRemaining < 0) {
    //             timerHours.textContent = '00';
    //             timerMinutes.textContent = '00';
    //             timerSeconds.textContent = '00';
    //             clearInterval(timerId);
    //         }
    //     }

    //     updateClock();

    // }

    // countTimer('01 december 2020');

    //menu
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
        };
        popup.addEventListener('click', event => {
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
        const togleTabContent = index => {
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

        tabHeader.addEventListener('click', event => {
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

    //slider
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            btn = document.querySelectorAll('.portfolio-btn'),
            dotWrap = document.querySelector('.portfolio-dots'),
            slider = document.querySelector('.portfolio-content');

        let currentSlide = 0,
            interval,
            dot = document.querySelectorAll('.dot');

        const addDots = () => {
            for (let i = 0; i < slide.length; i++) {
                const elemDot = document.createElement('li');
                elemDot.className = "dot";
                dotWrap.append(elemDot);
            }
            dot = document.querySelectorAll('.dot');
            dot[0].classList.add('dot-active');
        };

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            dot = document.querySelectorAll('.dot');
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', event => {
            event.preventDefault();

            const target = event.target;
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', event => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', event => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }
        });
        addDots();
        startSlide(1500);
    };
    slider();

    //team
    const team = () => {
        const teamWrap = document.querySelector('.command'),
            teamImg = teamWrap.querySelectorAll('img');

        teamImg.forEach(img => {
            const src = img.src;

            img.addEventListener('mouseenter', e => {
                event.target.src = event.target.dataset.img;
            });

            img.addEventListener('mouseleave', e => {
                event.target.src = src;
            });
        });
    };
    team();

    //calc
    const calc = (price = 100) => {
        const calcInputWrap = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcCount = document.querySelector('.calc-count'),
            calcDay = document.querySelector('.calc-day'),
            totalValue = document.getElementById('total'),
            calcInput = calcInputWrap.querySelectorAll('input');

        for (let i = 0; i < calcInput.length; i++) {
            calcInput[i].addEventListener('input', () => {
                calcInput[i].value = calcInput[i].value.replace(/\D/, '');
            });
        }
        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }
            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }

            let step = 100;
            const updateTotal = () => {
                if (step < total) {
                    step += (total / 200);
                    totalValue.innerHTML = Math.floor(step);
                    setTimeout(updateTotal, 5);
                } else {
                    totalValue.textContent = total;
                }
            };
            updateTotal();
        };

        calcInputWrap.addEventListener('change', event => {
            const target = event.target;

            if (target.matches('.calc-type') || target.matches('.calc-square') || target.matches('.calc-count') || target.matches('.calc-day')) {
                countSum();
            }
        });
    };

    calc(100);
});
