"use strict";
//TODO Arreglar peticiones fetch al servidor (Devuelven error 500).
//TODO Crear HTML + CSS de drag and drop
//TODO Realizar validaciones desde el backend
//TODO Realizar validaciones desde el frontend
//TODO Optimizar código
const dropArea = document.querySelector('#drop-area');
const dragText = document.querySelector('h2');
const button = document.querySelector('button');
const input = document.querySelector('#input-file');
let files;
button.addEventListener('click', () => {
    input.click();
});
input.addEventListener('change', (e) => {
    e.preventDefault();
    files = input.files;
    dropArea.classList.add('active');
    showFile(files);
    dropArea.classList.remove('active');
});
dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add('active');
    dragText.textContent = 'Drop to upload the files.';
});
dropArea.addEventListener('dragleave', (e) => {
    e.preventDefault();
    dropArea.classList.remove('active');
    dragText.textContent = 'Drag and drop files.';
});
dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.classList.remove('active');
    dragText.textContent = 'Drag and drop files.';
});
let showFile = (files) => {
    if (files.length === undefined) {
        processFile(files);
    }
    else {
        for (const file of files) {
            processFile(file);
        }
        ;
    }
    ;
};
let processFile = (file) => {
};
