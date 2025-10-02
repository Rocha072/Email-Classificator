
// Declaração de todos os elementos utilizados

const formulary = document.getElementById('form-input');

const emailTextArea = document.getElementById('email-text');
const fileOnEmailText = document.getElementById('file-on-email-text')
const removeFileBtn = document.getElementById('remove-file-btn');

const fileInput = document.getElementById('file-input');
const fileNameDisplay = document.getElementById('file-name-display');

const classification = document.getElementById('classification-output');
const suggestion = document.getElementById('suggested-output');

// ------------------------------------------------------
//                  FUNÇÕES AUXILIARES
// ------------------------------------------------------


// Função para ler e mostrar o arquivo .txt na área de texto
const displayTextFromFile = (file) => {

    const txtReader = new FileReader();
    
    txtReader.onload = (f) => {         //Definição da função que lê o file
        emailTextArea.value = f.target.result;  //Coloca na textArea
        fileInput.value = null;                 //Garante que não tenha outro arquivo no input
        emailTextArea.readOnly = false;         //Mantem ativada a text area
    };
    
    txtReader.readAsText(file)      
}


// Mostra a tag de file na caixa de texto
const displayFileTag = (file) => {
    fileNameDisplay.textContent = file.name;
    fileOnEmailText.classList.add('visible');
    emailTextArea.readOnly = true;
    emailTextArea.value = '';
    emailTextArea.placeholder = ''
}

// Remove o arquivo da caixa de texto
const removeFileFromText = () => {
    fileInput.value = null;
    fileOnEmailText.classList.remove('visible');
    emailTextArea.readOnly = false;
    emailTextArea.value = '';
    emailTextArea.placeholder = 'Escreva ou arraste o arquivo aqui';
}

// Seleciona a ação dependendo do tipo de arquivo recebido
const selectAction_FileType = (file) => {

    // Se for txt mostra na text area
    if(file.type == 'text/plain'){  
        removeFileFromText();
        displayTextFromFile(file);
    }

    // Se for pdf mostra a tag de arquivo
    else if(file.type == 'application/pdf'){
        displayFileTag(file);
    }

    // Caso contrário, alerta de seleção errada
    else{
        alert('Tipo de arquivo não suportado. Por favor, use .txt ou .pdf');
    }
}

// ------------------------------------------------------
//                  EVENT LISTENERS
// ------------------------------------------------------


//Listener pro botão de remoção da tag de arquivo
removeFileBtn.addEventListener('click', removeFileFromText);


//Text area do email pinta as bordas quando o arquivo esta em cima
emailTextArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    emailTextArea.classList.add('drag-over');
});


//Text area do email volta ao normal quando arquivo nao está mais em cima
emailTextArea.addEventListener('dragleave', ()=>{
    emailTextArea.classList.remove('drag-over');
});


//Text area recebe arquivo soltado
emailTextArea.addEventListener('drop', (event)=>{

    event.preventDefault();
    emailTextArea.classList.remove('drag-over'); 

    const files = event.dataTransfer.files;

    if(files.length > 0){
        const fileDropped = files[0]; 
        fileInput.files = files;            //Coloca arquivo no fileInput
        selectAction_FileType(fileDropped); //Determina a parte visual de retorno para usuário
    }
});

//Arquivo pode ser anexado pelo botao de anexar
fileInput.addEventListener('change', ()=>{

    if(fileInput.files.length > 0){
        selectAction_FileType(fileInput.files[0]);   //Determina a parte visual de retorno para usuário
    } 
})

//Listener para enviar o formulário para o backend através do botão de análise
formulary.addEventListener('submit', async(event)=>{ //Evento deve ser assincrono pois demora alguns segundos
    event.preventDefault();
    
    const file = fileInput.files[0];
    const emailText = emailTextArea.value;

    //Se tentou enviar sem conteudo, aviso.
    if(!emailText.trim() && !file){ 
        alert('Por favor, digite um texto ou selecione um arquivo.');
        return;
    }

    //FormData para receber o conteudo enviado (pdf ou texto)
    const formData = new FormData();

    if(file){
        formData.append('file', file);
    } else {
        formData.append('text', emailText);
    }

    //Atualiza os textos para feedback
    classification.textContent = 'Analisando...';
    suggestion.textContent = 'Aguarde...';

    //Comunicacao com a API do python
    try{
        const apiURL = 'http://127.0.0.1:8000/analyze-email';

        //Envio do conteudo em formato json com método post
        const response = await fetch(apiURL, {
            method: 'POST',
            body: formData,
        });

        //Confere se não deu erro
        if(!response.ok){
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        //Abre o pacote da resposta de forma assíncrona
        const result = await response.json();

        //Verifica se não deu erro na busca do json
        if(result.error){
            throw new Error(result.error);
        }

        // Atualiza os textos com a resposta da IA
        classification.textContent = result.data.classification;
        suggestion.textContent = result.data.suggested;


        //Verifica se não houve outros erros no meio
    } catch(error){
        console.error('Falha ao analisar o e-mail', error);
        classification.textContent = 'Erro';
        suggestion.textContent = `Ocorreu um erro ${error.message}`;
    }

});



