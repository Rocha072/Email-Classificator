# check_models.py
import os
import google.generativeai as genai
from dotenv import load_dotenv

# Carrega a chave de API do seu arquivo .env
load_dotenv()
try:
    genai.configure(api_key=os.getenv("API_KEY_GEMINI"))
    print("--- Chave de API carregada com sucesso! ---")
except Exception as e:
    print(f"!!! Falha ao configurar a API Key. Verifique seu .env. Erro: {e}")
    exit()

print("\n--- Procurando por modelos disponíveis para 'generateContent'... ---")

# Itera sobre todos os modelos que sua chave pode ver
for model in genai.list_models():
  # Verifica se o modelo suporta o método que estamos usando ('generateContent')
  if 'generateContent' in model.supported_generation_methods:
    # Se sim, imprime o nome dele
    print(f"Modelo encontrado: {model.name}")

print("\n--- Fim da lista ---")