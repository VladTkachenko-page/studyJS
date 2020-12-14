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
export default team;