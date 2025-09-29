
const formulary = document.getElementById('form-input');

const emailTextArea = document.getElementById('email-text');
const fileInput = document.getElementById('file-input');

const classification = document.getElementById('classification-output');
const suggestion = document.getElementById('suggested-output');


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



