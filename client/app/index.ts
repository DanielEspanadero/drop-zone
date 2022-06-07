//TODO Arreglar peticiones fetch al servidor (Devuelven error 500).
//TODO Realizar validaciones desde el backend
//TODO Realizar validaciones desde el frontend

if (!localStorage.getItem('token')) {
    window.location.href = '../../index.html';
};

const dropArea: any = document.querySelector('.drop-area');
const dragText: any = document.querySelector('h2');
const button: any = document.querySelector('button')!;
const input: any = document.querySelector('#input-file')!;
let files;

button.addEventListener('click', () => {
    input.click();
});

input.addEventListener('change', (e: any) => {
    e.preventDefault();
    files = input.files;
    dropArea.classList.add('active');
    showFile(files);
    dropArea.classList.remove('active');
});

dropArea.addEventListener('dragover', (e: any) => {
    e.preventDefault();
    dropArea.classList.add('active');
    dragText.textContent = 'Drop to upload the files.';

});

dropArea.addEventListener('dragleave', (e: any) => {
    e.preventDefault();
    dropArea.classList.remove('active');
    dragText.textContent = 'Drag and drop files.';
});

dropArea.addEventListener('drop', (e: any) => {
    e.preventDefault();
    files = e.dataTransfer.files;
    showFile(files);
    dropArea.classList.remove('active');
    dragText.textContent = 'Drag and drop files.';
});

let showFile = (files: any) => {
    if (files.length === undefined) {
        processFile(files);
    } else {
        for (const file of files) {
            processFile(file);
        };
    };
};

let processFile = (file: any) => {
    const docType = file.type;
    const validExtensions = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];

    if (validExtensions.includes(docType)) {
        const fileReader = new FileReader();
        const id = `file-${Math.random().toString(32).substring(7)}`

        fileReader.addEventListener('load', (e: any) => {
            const fileURL = fileReader.result;
            const image = `
            <div id='${id}' class='file-container'>
                <img src='${fileURL}' alt='${file.name}' width='50px'>
                <div class='status'>
                <span>${file.name}</span>
                <span class='status-text'>Loading...</span>
                </div>
            </div>
            `
            const html = document.querySelector('#preview')!.innerHTML
            document.querySelector('#preview')!.innerHTML = image + html;

            fileReader.readAsDataURL(file);
            uploadFile(file, id);
        });
    } else {
        alert(`It isn't a valid file`)
    };
};

let uploadFile = async (file: any, id: any) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const url = 'http://localhost:8080/api/upload';
        const response = fetch(url, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' }
        });

        // const responseText: any = await response.text();
        // console.log(responseText);
        
        document.querySelector(`#${id} .status-text`)!.innerHTML = `<span class='success'>Archivo subido correctamente...</span>`;
    } catch (error) {
        document.querySelector(`#${id} .status-text`)!.innerHTML = `<span class='failure'>El archivo no pudo subirse...</span>`;
    };
};