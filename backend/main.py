#IMPORTAÇÕES

#Bibliotecas padrão
import os 
from dotenv import load_dotenv
import re

# Spacy
import spacy

#Biblioteca do Gemini
import google.generativeai as genai     

#Bibliotecas para utilizar o FastAPI
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# #Bibliteca auxiliar
from typing import Optional

#Biblioteca para extracao de texto de PDF
import PyPDF2
from io import BytesIO

#Carrega os valores do .env
load_dotenv()

#Anexacao da api key ao genai
genai.configure(api_key=os.getenv("API_KEY_GEMINI")) 

#Escolha do modelo da IA do Gemini
model = genai.GenerativeModel('gemini-flash-latest')

#Criação da FastAPI
app = FastAPI()

#Carrega o modelo de linguagem do spaCy
nlp = spacy.load("pt_core_news_sm")

origins = [
    "http://127.0.0.1:5500",
    "http://localhost",
    "http://localhost:8080",
]


#Configuracao do CROS (permissoes de chegada)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

#Funcao para leitura de pdf
def read_pdf_text(file_bytes):

    #try para leitura do pdf para caso do pdf estar corrompido
    try:
        pdf_file = BytesIO(file_bytes)  #Criacao de um arquivo virtual (para poupar de criar um arquivo)
        
        reader = PyPDF2.PdfReader(pdf_file) #Criacao do leitor de PDF
        txt = ""

        for page in reader.pages:  #Percorre cada pagina do PDF
            txt+=page.extract_text()
        
        return txt
    
    except Exception as e:
        print("Erro ao ler PDF: " + e)
        return ""


#Realiza o pre processamento NLP com remocao de stop words e lemmatização

def preprocess_nlp(text):
    
    text = re.sub(r"http\S+", "", text).lower()
    text = " ".join(text.split())

    doc = nlp(text)
    
    processed_words = [
        token.lemma_.lower() for token in doc if not token.is_stop and not token.is_punct and token.is_alpha
    ]
    
    return " ".join(processed_words)


#Decorador para a funcao post da fastAPI     
@app.post("/analyze-email")
async def analyze_email_endpoint(       #Funcao assincrona de endpoint para analise do email
    text: Optional[str] = Form(None),       #Se existir text será string, senão none
    file: Optional[UploadFile] = File(None) #Se existir file será UploadFile, senão none
):
    email_to_analyze = ""

    #Se for um arquivo
    if file:
        content_file = await file.read() #Espera a leitura estar completa e salva em bytes

        if file.content_type == 'application/pdf':  
            email_to_analyze = read_pdf_text(content_file) #Se for pdf, lê o pdf
        
        elif file.content_type == 'text/plain':
            email_to_analyze = content_file.decode('utf-8') #Se for texto decodifica os bytes para string
        else:
            raise HTTPException(status_code=400, detail="Tipo de arquivo não suportado. Somente .txt ou .pdf são aceitos")
    
    #Se for texto apenas coloca no email de analise
    elif text:
        email_to_analyze = text
    

    if not email_to_analyze.strip():
        raise HTTPException(status_code=400, detail="Nenhum texto ou arquivo válido foi enviado")


    #Realiza o pre processamento, manda o prompt para o modelo e retorna a resposta.
    try:

        processedEmail = preprocess_nlp(email_to_analyze)

        prompt = f"""
        Você é um assistente de e-mail especialista e altamente eficiente. Sua tarefa é analisar o e-mail fornecido e retornar uma resposta em formato JSON.

        Sua resposta DEVE ser um objeto JSON válido, e nada mais, contendo duas chaves: "classification" e "suggested".

        1.  **classification**: Classifique o e-mail como 'Produtivo' ou 'Improdutivo'.
            * 'Produtivo': E-mails que exigem uma ação ou resposta direta (dúvidas, solicitações, problemas técnicos, pedidos).
            * 'Improdutivo': E-mails que são informativos ou sociais e não exigem ação (agradecimentos, felicitações, avisos de 'recebido', propagandas).

        2.  **suggested**: Crie uma sugestão de resposta profissional, concisa e apropriada para o e-mail.
            * Se for 'Produtivo', a resposta deve iniciar a ação ou acusar o recebimento de forma útil (ex: "Obrigado por nos contatar. Já estamos verificando o problema e retornaremos em breve.").
            * Se for 'Improdutivo', a resposta pode ser um simples reconhecimento ou agradecimento (ex: "Obrigado pelo feedback!" ou "Fico feliz em ajudar!").

        E-mail para análise (o texto abaixo foi pré-processado com lematização):
        ---
        {processedEmail}
        ---

        JSON:
        """

        response = model.generate_content(prompt)
        response_clean = response.text.strip().replace("```json", "").replace("```", "")
        return {"data": response_clean}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))





