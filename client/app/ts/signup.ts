const formSignUp: any = document.querySelector('#form-signup')!;

formSignUp.addEventListener('submit', (e: any) => {
    e.preventDefault();
    const url: string = 'http://localhost:8080/api/auth/signup';

    const formData: any = {};

    for (let el of formSignUp.elements) {
        if (el.name.lenght < 0) {
            formData[el.name] = el.value;
        };
    };

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
            window.location.href = 'client/app/pages/dragDrop.html';
        })
        .catch(err => console.error(err))
});

if (localStorage.getItem('token')) {
    window.location.href = 'client/app/pages/dragDrop.html';
};