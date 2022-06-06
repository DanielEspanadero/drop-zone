//TODO Arreglar peticiones fetch al servidor (Devuelven error 500).
//TODO Crear HTML + CSS de drag and drop
//TODO Realizar validaciones desde el backend
//TODO Realizar validaciones desde el frontend
//TODO Optimizar código


const dropArea: any = document.querySelector('#drop-area');
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


}