if (!localStorage.getItem('token')) {
    window.location.href = '../../index.html';
};

const dropArea: HTMLDivElement = document.querySelector('.drop-area')!;
const dragText: HTMLElement = document.querySelector('h2')!;
const button: HTMLButtonElement = document.querySelector('button')!;
const input: HTMLInputElement = document.querySelector('#input-file')!;
const logout: HTMLButtonElement = document.querySelector('#logout')!;
let files;

button.addEventListener('click', () => {
    input.click();
});

logout.addEventListener('click', () => {
    localStorage.removeItem('token');
    location.reload();
})

input.addEventListener('change', (e: Event) => {
    e.preventDefault();
    
    files = input.files;
    dropArea.classList.add('active');
    showFile(files);
    dropArea.classList.remove('active');
});

dropArea.addEventListener('dragover', (e: Event) => {
    e.preventDefault();
    
    dropArea.classList.add('active');
    dragText.textContent = 'Drop to upload the files.';
});

dropArea.addEventListener('dragleave', (e: Event) => {
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
    const validExtensions: Array<string> = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];

    const fileReader = new FileReader();
    if (validExtensions.includes(docType)) {
        const id: string = `file-${Math.random().toString(32).substring(7)}`;
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
            `
            const html = document.querySelector('#preview')!.innerHTML
            document.querySelector('#preview')!.innerHTML = image + html;

            fileReader.readAsDataURL(file);
            uploadFile(file, id);
        });
        
    } else {
        alert(`It isn't a valid file`);
    };
};

let uploadFile = async (file: any, id: any) => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
        const url = 'http://localhost:8080/api/upload';
        const token = localStorage.getItem('token');
        const headers: any = {
            'Content-Type': 'application/json',
            'authorization': token
        }
        const myHeaders = new Headers(headers);

        const response: any = fetch(url, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: myHeaders,
            mode: 'no-cors'
        });
        
        const responseText: any = response.text();
        console.log(responseText);

        document.querySelector(`#${id} .status-text`)!.innerHTML = `<span class='success'>Archivo subido correctamente...</span>`;
    } catch (error) {
        document.querySelector(`#${id} .status-text`)!.innerHTML = `<span class='failure'>El archivo no pudo subirse...</span>`;
    };
};