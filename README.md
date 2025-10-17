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
