const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся';
    const form1 = document.getElementById('form1'),
        form2 = document.getElementById('form2'),
        form3 = document.getElementById('form3'),
        statusMessage = document.createElement('div'),
        inputForm1 = form1.querySelectorAll('input'),
        inputForm2 = form2.querySelectorAll('input'),
        inputForm3 = form3.querySelectorAll('input'),
        inputAll = document.querySelectorAll('input');
    statusMessage.style.color = '#fff';

    for (let i = 0; i < inputAll.length; i++) {
        if (inputAll[i].name === 'user_name' || inputAll[i].name === 'user_message') {
            inputAll[i].addEventListener('input', () => {
                inputAll[i].value = inputAll[i].value.replace(/[^а-яА-Я,;. ]/, '');
            });
        } else if (inputAll[i].name === 'user_phone') {
            inputAll[i].addEventListener('input', () => {
                inputAll[i].value = inputAll[i].value.replace(/[^0-9+]/, '');
                if (inputAll[i].value.length > 12) {
                    inputAll[i].value = inputAll[i].value.slice(0,12); 
                }
            });
        }
    }

    const successAnimate = form => {
        statusMessage.classList.remove('sk-plane', 'sk-center');
        statusMessage.textContent = successMessage;
        form.forEach(item => {
            item.value = '';
        });
        setTimeout(() => {
            statusMessage.textContent = '';
            let popup = document.querySelector('.popup');
            popup.style.display = 'none';
        }, 5000)
    };
    const errorPost = error => {
        statusMessage.textContent = errorMessage;
        console.error(error);
    };

    form1.addEventListener('submit', event => {
        event.preventDefault();
        form1.appendChild(statusMessage);
        statusMessage.textContent = '';
        statusMessage.classList.add('sk-plane', 'sk-center');
        const formData = new FormData(form1);
        const body = {};
        formData.forEach((key, val) => {
            body[key] = val;
        });
        postData(body)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('status network not 200');
                }
                successAnimate(inputForm1);
            })
            .catch(errorPost);
    });
    form2.addEventListener('submit', event => {
        event.preventDefault();
        form2.appendChild(statusMessage);
        statusMessage.textContent = '';
        statusMessage.classList.add('sk-plane', 'sk-center');
        const formData = new FormData(form2);
        const body = {};
        formData.forEach((key, val) => {
            body[key] = val;
        });
        postData(body)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('status network not 200');
                }
                successAnimate(inputForm2);
            })
            .catch(errorPost);
    });
    form3.addEventListener('submit', event => {
        event.preventDefault();
        form3.appendChild(statusMessage);
        statusMessage.textContent = '';
        statusMessage.classList.add('sk-plane', 'sk-center');
        const formData = new FormData(form3);
        const body = {};
        formData.forEach((key, val) => {
            body[key] = val;
        });
        postData(body)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('status network not 200');
                }
                successAnimate(inputForm3);
            })
            .catch(errorPost);
    });

    const postData = body => fetch('./server.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
};
export default sendForm;