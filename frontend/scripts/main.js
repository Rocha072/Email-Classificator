
const formulary = document.getElementById('form-input');

const emailTextArea = document.getElementById('email-text');
const fileOnEmailText = document.getElementById('file-on-email-text')
const removeFileBtn = document.getElementById('remove-file-btn');

const fileInput = document.getElementById('file-input');
const fileNameDisplay = document.getElementById('file-name-display');

const classification = document.getElementById('classification-output');
const suggestion = document.getElementById('suggested-output');




const displayTextFromFile = (file) => {
    const txtReader = new FileReader();
    
    txtReader.onload = (f) => {
        emailTextArea.value = f.target.result;
        fileInput.value = null;
        emailTextArea.disabled = false;
    };
    
    txtReader.readAsText(file)
}

const displayFileTag = (file) => {
    fileNameDisplay.textContent = file.name;
    fileOnEmailText.classList.add('visible');
    emailTextArea.disabled = true;
}


const removeFileFromText = () => {
    fileInput.value = null;
    fileOnEmailText.classList.remove('visible');
    emailTextArea.disabled = false;
    emailTextArea.value = '';
}

const fileSelectionToDo = (file) => {
    if(file.type == 'text/plain'){
        removeFileFromText();
        displayTextFromFile(file);
    }
    else if(file.type == 'application/pdf'){
        displayFileTag(file);
    }
    else{
        alert('Tipo de arquivo não suportado. Por favor, use .txt ou .pdf');
    }
}

removeFileBtn.addEventListener('click', removeFileFromText);

emailTextArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    if(!emailTextArea.disabled)
        emailTextArea.classList.add('drag-over');
});


emailTextArea.addEventListener('dragleave', ()=>{
    emailTextArea.classList.remove('drag-over');
});

emailTextArea.addEventListener('drop', (event)=>{

    event.preventDefault();
    emailTextArea.classList.remove('drag-over');

    const files = event.dataTransfer.files;

    if(files.length > 0){
        const fileDropped = files[0];

        fileInput.files = files;
        fileSelectionToDo(fileDropped);
    }
});



fileInput.addEventListener('change', ()=>{

    if(fileInput.files.length > 0){

        const emailFile = fileInput.files[0];
        fileSelectionToDo(emailFile);
        
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

        const aswAI = JSON.parse(result.data);

        classification.textContent = aswAI.classification;
        suggestion.textContent = aswAI.suggested;

    } catch(error){
        console.error('Falha ao analisar o e-mail', error);
        classification.textContent = 'Erro';
        suggestion.textContent = `Ocorreu um erro ${error.message}`;
    }

});



