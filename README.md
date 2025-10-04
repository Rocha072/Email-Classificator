# Analisador de E-mails com IA

Este projeto foi desenvolvido como parte do case prático para o processo seletivo da AutoU. É uma aplicação web completa que utiliza inteligência artificial para automatizar a classificação e a sugestão de respostas para e-mails, com foco no cenário de uma grande empresa do setor financeiro.


### Link para a aplicação: [email-classificator.vercel.app](https://email-classificator.vercel.app/)

### O que a aplicação faz?

A interface permite que o usuário insira o texto de um e-mail de duas formas:

* Digitando ou colando diretamente na área de texto.
* Anexando um arquivo `.txt` ou `.pdf`, através do botão ou utilizando o suporte para "arrastar e soltar" (drag and drop).

Após o envio, a aplicação se comunica com uma API em Python que processa o conteúdo, classifica o e-mail como **Produtivo** ou **Improdutivo** e gera uma sugestão de resposta profissional e contextualizada, que pode ser facilmente copiada.

## Tecnologias Utilizadas

 **Front-end:** Desenvolvido com **HTML5**, **CSS3** e **JavaScript**, focando em criar uma interface limpa, responsiva e com interações fluidas.

 **Back-end:** Uma API RESTful construída com **Python** e o framework **FastAPI**, escolhido pela sua alta performance e praticidade.

 **Processamento de Linguagem Natural (NLP):** Utilizei a biblioteca **spaCy** para fazer a formatação do texto, no qual apliquei a lematização e a remoção de stop-words, preparando o conteúdo para a análise da IA.

 **Inteligência Artificial:** A integração foi feita com a API do **Google Gemini** (modelo Flash), que lida com a classificação do e-mail e a geração da sugestão de resposta. Portanto, escolhi utilizar uma LLM bem estruturada e flexível, permitindo entedimento preciso da linguagem natural e que a classificação e a sugestão fossem de mais alta qualidade. O ajuste da IA foi feito através de um prompt detalhado que dá ao gemini uma persona de especialista, um contexto de negócios no setor financeiro e regras claras sobre como se comportar. 

 **Hospedagem:** O front-end está hospedado na **Vercel** e o back-end no **Render**, com um serviço de "keep-alive" do **UptimeRobot** para garantir que a API esteja sempre disponível.

## Como rodar localmente

Caso queira testar o projeto localmente em sua máquina, o processo é simples. Inicialmente, é necessário ter Python instalado na sua máquina e clonar o repositório do projeto.

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

Para visualizar o frontend, basta rodar o arquivo index.html com qualquer ferramenta que crie um servidor de desenvolvimento local, como a extensão LiveServer do VS Code.

##

Foi um desafio interessante que me expôs à tecnologias que nunca havia tentado integrar e à algumas que nunca havia sequer utilizado. Portanto, foi uma ótima oportunidade para aprender novos conhecimentos técnicos e para colocar diversas habilidades em prática, desde a elaboração da interface do usuário até a integração de APIs modernas e configuração de infraestrutura na nuvem.

Espero que gostem do resultado!