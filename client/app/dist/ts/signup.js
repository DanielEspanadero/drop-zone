"use strict";
const formSignUp = document.querySelector('#form-signup');
formSignUp.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = 'http://localhost:8080/api/auth/signup';
    const formData = {};
    for (let el of formSignUp.elements) {
        if (el.name.length > 0)
            formData[el.name] = el.value;
    }
    ;
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(resp => resp.json())
        .then(({ msg, token }) => {
        if (msg) {
            return console.error(msg);
        }
        localStorage.setItem('token', token);
        window.location.href = 'dragDrop.html';
    })
        .catch(err => console.error(err));
    console.log(formSignUp.elements);
});
if (localStorage.getItem('token')) {
    window.location.href = 'dragDrop.html';
}
;
