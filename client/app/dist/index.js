"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
if (!localStorage.getItem('token')) {
    window.location.href = '../../index.html';
}
;
const dropArea = document.querySelector('.drop-area');
const dragText = document.querySelector('h2');
const button = document.querySelector('button');
const input = document.querySelector('#input-file');
const logout = document.querySelector('#logout');
let files;
button.addEventListener('click', () => {
    input.click();
});
logout.addEventListener('click', () => {
    localStorage.removeItem('token');
    location.reload();
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
    files = e.dataTransfer.files;
    showFile(files);
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
    const docType = file.type;
    const validExtensions = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
    const fileReader = new FileReader();
    if (validExtensions.includes(docType)) {
        const id = `file-${Math.random().toString(32).substring(7)}`;
        console.log(fileReader);
        fileReader.addEventListener('load', () => {
            const fileURL = fileReader.result;
            const image = `
            <div id='${id}' class='file-container'>
                <img src='${fileURL}' alt='${file.name}' width='50px'>
                <div class='status'>
                <span>${file.name}</span>
                <span class='status-text'>Loading...</span>
                </div>
            </div>
            `;
            const html = document.querySelector('#preview').innerHTML;
            document.querySelector('#preview').innerHTML = image + html;
            fileReader.readAsDataURL(file);
            uploadFile(file, id);
        });
    }
    else {
        alert(`It isn't a valid file`);
    }
    ;
};
let uploadFile = (file, id) => __awaiter(void 0, void 0, void 0, function* () {
    const formData = new FormData();
    formData.append('file', file);
    try {
        const url = 'http://localhost:8080/api/upload';
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'authorization': token
        };
        const myHeaders = new Headers(headers);
        const response = fetch(url, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: myHeaders,
            mode: 'no-cors'
        });
        const responseText = response.text();
        console.log(responseText);
        document.querySelector(`#${id} .status-text`).innerHTML = `<span class='success'>Archivo subido correctamente...</span>`;
    }
    catch (error) {
        document.querySelector(`#${id} .status-text`).innerHTML = `<span class='failure'>El archivo no pudo subirse...</span>`;
    }
    ;
});
