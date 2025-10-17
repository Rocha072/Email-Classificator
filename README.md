# AI-Powered Email Analyzer

This project is a complete web application that uses artificial intelligence to automate the classification and suggestion of responses to emails written in Portuguese-br, focusing on the scenario of a large company in the financial sector.

### Application Link: [email-classificator.vercel.app](https://www.google.com/search?q=https://email-classificator.vercel.app/)

### What does the application do?

The interface allows the user to input the text of an email in two ways:

* Typing or pasting it directly into the text area. * Attaching a .txt or .pdf file, either by using the button or the drag-and-drop feature.

After submission, the application communicates with a Python API that uses a two-step AI approach: first, a locally trained Machine Learning model classifies the email as **Productive** or **Unproductive**; then, this classification is sent to a generative AI (Gemini) to create a contextualized response suggestion.

For testing purposes, I have provided some text files inside the `samples` folder, with their respective classifications in the filenames. However, feel free to test with your own emails!

## Technologies Used

**Front-end:** Developed with **HTML5**, **CSS3**, and **JavaScript**, focusing on creating a clean, responsive interface with fluid interactions.

**Back-end:** A RESTful API built with **Python** and the **FastAPI** framework, chosen for its high performance and practicality.

**Natural Language Processing (NLP):** I used the **spaCy** library for text preprocessing, applying lemmatization and stop-word removal to prepare the data for training the classification model.

**Artificial Intelligence:** The email classification was performed using a Machine Learning model (**Naive Bayes**) trained with **scikit-learn** and **pandas**, using a dataset with over 1000 examples to ensure accuracy. The response generation was done with the **Google Gemini** API (Flash model), which receives the classification from the developed model and generates a quality suggestion.

**Hosting:** The front-end is hosted on **Vercel** and the back-end on **Render**, with a "keep-alive" service from **UptimeRobot** to ensure the API is always available.

## How to run locally

To test the project locally, the process is simple. First, you need to have Python installed on your machine and clone the project repository using the command below:

```bash git clone https://www.google.com/search?q=https://github.com/Rocha072/Email-Classificator.git cd Email-Classificator ```

After that, the second step is to configure the backend. First, create a `.env` file inside the `backend` folder and, following the model below, add your Gemini API key.

```bash API_KEY_GEMINI = your-api-key ```

Finally, go to the `backend` folder and run the command below to install the necessary libraries:

```bash pip install -r requirements.txt ```

With the backend configured, just run the command below inside the `backend` folder for the Python API to start working.

```bash python -m uvicorn main:app --reload ```

To view the frontend, access the `configAPI` file in the `frontend/scripts` folder and switch the comments as indicated. Once that's done, simply run the `index.html` file with any tool that creates a local development server, such as the Live Server extension for VS Code.

##

This was an interesting challenge that exposed me to technologies I had never tried to integrate before and to some I had never even used. Therefore, it was a great opportunity to learn new technical knowledge and to put various skills into practice, from designing the user interface to integrating modern APIs and configuring cloud infrastructure.

I hope you like the result!

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
PT-BR version

# Analisador de E-mails com IA

Esse projeto é uma aplicação web completa que utiliza inteligência artificial para automatizar a classificação e a sugestão de respostas para e-mails, com foco no cenário de uma grande empresa do setor financeiro.


### Link para a aplicação: [email-classificator.vercel.app](https://email-classificator.vercel.app/)

### O que a aplicação faz?

A interface permite que o usuário insira o texto de um e-mail de duas formas:

* Digitando ou colando diretamente na área de texto.
* Anexando um arquivo `.txt` ou `.pdf`, através do botão ou utilizando o suporte para "arrastar e soltar" (drag and drop).

Após o envio, a aplicação se comunica com uma API em Python que utiliza uma abordagem de IA em duas etapas: primeiro, um modelo de Machine Learning treinado localmente classifica o e-mail como **Produtivo** ou **Improdutivo**; em seguida, essa classificação é enviada para uma IA generativa (gemini) para criar uma sugestão de resposta contextualizada.

Para a realização de testes, disponibilizei, dentro da pasta samples, alguns arquivos textos com suas respectivas classificações nos nomes dos arquivos. Todavia, sinta-se a vontade para realizar testes com seus próprios e-mails!

## Tecnologias Utilizadas

 **Front-end:** Desenvolvido com **HTML5**, **CSS3** e **JavaScript**, focando em criar uma interface limpa, responsiva e com interações fluidas.

 **Back-end:** Uma API RESTful construída com **Python** e o framework **FastAPI**, escolhido pela sua alta performance e praticidade.

 **Processamento de Linguagem Natural (NLP):** Utilizei a biblioteca **spaCy** para o pré-processamento do texto, aplicando a lematização e a remoção de stop-words para preparar os dados para o treinamento do modelo de classificação.

 **Inteligência Artificial:** A classificação do e-mail foi realizada através de um modelo de Machine Learning (**Naive Bayes**) que foi treinado com **scikit-learn** e **pandas**, utilizando um dataset com mais de 1000 exemplos para garantir precisão. Já a geração da resposta, foi feita com a API do **Google Gemini** (modelo Flash), que recebe a classificação do modelo desenvolvido e gera uma sugestão de qualidade.

 **Hospedagem:** O front-end está hospedado na **Vercel** e o back-end no **Render**, com um serviço de "keep-alive" do **UptimeRobot** para garantir que a API esteja sempre disponível.

## Como rodar localmente

Para testar o projeto localmente, o processo é simples. Inicialmente, é necessário ter Python instalado na sua máquina e clonar o repositório do projeto utilizando o comando abaixo:
```bash
    git clone https://github.com/Rocha072/Email-Classificator.git
    cd Email-Classificator  
```

Após realizado isso, o segundo passo é configurar o backend. Primeiro, crie um arquivo .env dentro da pasta backend e, seguindo o modelo abaixo, inclua a sua chave api do gemini.
```bash
API_KEY_GEMINI = sua-chave-api
```

Por fim, vá até a pasta backend e execute o comando abaixo para instalar as bibliotecas necessárias
```bash
pip install -r requirements.txt
```

Configurado o backend, basta executar o comando abaixo dentro da pasta backend para que a API python comece a funcionar.
```bash
python -m uvicorn main:app --reload
```

Para visualizar o frontend, acesse a pasta o arquivo configAPI na pasta frontend/scripts e troque os comentários, conforme indicado. Feito isso, basta rodar o arquivo index.html com qualquer ferramenta que crie um servidor de desenvolvimento local, como a extensão LiveServer do VS Code.

##

Foi um desafio interessante que me expôs à tecnologias que nunca havia tentado integrar e à algumas que nunca havia sequer utilizado. Portanto, foi uma ótima oportunidade para aprender novos conhecimentos técnicos e para colocar diversas habilidades em prática, desde a elaboração da interface do usuário até a integração de APIs modernas e configuração de infraestrutura na nuvem.

Espero que gostem do resultado!
