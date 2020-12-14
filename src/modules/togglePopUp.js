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
            count += 2;
            width = window.innerWidth;
            if (count <= 42) {
                popupContent.style.left = count + '%';
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
export default togglePopUp;