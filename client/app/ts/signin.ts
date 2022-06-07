const formLogin: any = document.querySelector('#form-login')!;

formLogin.addEventListener('submit', (e: any) => {
    e.preventDefault();
    const url: string = 'http://localhost:8080/api/auth/login';
    const formData: any = {};

    for (let el of formLogin.elements) {
        if (el.name.length > 0) {
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
            window.location.href = 'app/pages/dragDrop.html';
        })
        .catch(err => console.error(err))
});

if (localStorage.getItem('token')) {
    window.location.href = 'app/pages/dragDrop.html';
};