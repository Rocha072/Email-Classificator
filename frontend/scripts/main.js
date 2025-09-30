
const formulary = document.getElementById('form-input');

const emailTextArea = document.getElementById('email-text');
const fileInput = document.getElementById('file-input');
const fileNameDisplay = document.getElementById('file-name-display');

const classification = document.getElementById('classification-output');
const suggestion = document.getElementById('suggested-output');


emailTextArea.addEventListener('dragover', (event)=>{
    event.preventDefault();
    emailTextArea.classList.add('drag-over');
});


emailTextArea.addEventListener('dragleave', ()=>{
    emailTextArea.classList.remove('drag-over');
})

emailTextArea.addEventListener('drop', (event)=>{

    event.preventDefault();
    emailTextArea.classList.remove('drag-over');

    const files = event.dataTransfer.files;

    if(files.length > 0){
        const fileDropped = files[0];

        if(fileDropped.type == 'text/plain' || fileDropped.type == 'application/pdf'){
            
            fileInput.files = files;
            
            fileNameDisplay.textContent = `Arquivo selecionado: ${fileDropped.name}`;

            emailTextArea.value = '';
        } 
        else {
            alert('Tipo de arquivo não suportado. Por favor, use .txt ou .pdf');
        }
    }
})

fileInput.addEventListener('change', ()=>{
    if(fileInput.files.length > 0){
        fileNameDisplay.textContent = `Arquivo selecionado: ${fileInput.files[0].name}`;
        emailTextArea.value = '';
    } else {
        fileNameDisplay.textContent = '';
    }
})



formulary.addEventListener('submit', async(event)=>{
    event.preventDefault();
    
    const file = fileInput.files[0];
    const emailText = emailTextArea.value;

    if(!emailText.trim() && !file){
        alert('Por favor, digite um texto ou selecione um arquivo.');
        return;
    }

    const formData = new FormData();

    if(file){
        formData.append('file', file);
    } else {
        formData.append('text', emailText);
    }

    classification.textContent = 'Analisando...';
    suggestion.textContent = 'Aguarde...';

    try{
        const apiURL = 'http://127.0.0.1:8000/analyze-email';

        const response = await fetch(apiURL, {
            method: 'POST',
            body: formData,
        });

        if(!response.ok){
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        const result = await response.json();

        if(result.error){
            throw new Error(result.error);

        }

        const aswAI= JSON.parse(result.data);

        classification.textContent = aswAI.classification;
        suggestion.textContent = aswAI.suggested;

    } catch(error){
        console.error('Falha ao analisar o e-mail', error);
        classification.textContent = 'Erro';
        suggestion.textContent = `Ocorreu um erro ${error.message}`;
    }

});



