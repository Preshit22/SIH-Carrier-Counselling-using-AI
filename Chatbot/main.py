from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate 
from dotenv import load_dotenv
import pandas as pd
import asyncio
import chainlit as cl
import csv
import os
load_dotenv()
 
question = "Show Greetings & Ask the How I can Help you?"

with open("inputDataForBot.txt", "r") as f:
    student_data = f.read()


google_api_key = os.getenv("GOOGLE_API_KEY")
#You are a helpful AI assistant and provide the answer for the question asked politely.
template = """
If user asks question about career then: 
    You are a helpful career counselor AI assistant and provide the answer for the question asked politely. and you are talking to that student
    so talk according to it.
"""
templ = """
question: {question}
You are a helpful AI assistant and provide the answer for the question asked politely.
"""
Ans = "Answer: Let's think step by step."

temp = template + str(student_data) + templ + Ans



prompt = PromptTemplate(template=temp, input_variables=["question"])

llm = ChatGoogleGenerativeAI(model="gemini-pro")

'''
@cl.on_chat_start
def main():
    llm_chain = LLMChain(llm=llm, prompt=prompt, verbose=True)
    cl.user_session.set("llm_chain", llm_chain)
'''
@cl.on_chat_start
async def main():
    llm_chain = LLMChain(llm=llm, prompt=prompt, verbose=True)
    cl.user_session.set("llm_chain", llm_chain)

    # Trigger initial response generation
    res = await llm_chain.acall(question, callbacks=[cl.AsyncLangchainCallbackHandler()])
    await cl.Message(content=res["text"]).send()  # Send the first response

@cl.on_message
async def main(message: str):
    llm_chain = cl.user_session.get("llm_chain")  
    res = await llm_chain.acall(message.content, callbacks=[cl.AsyncLangchainCallbackHandler()])
    await cl.Message(content=res["text"]).send()

    df = pd.read_csv('history.csv')
    df = df.append({'Question': message.content, 'Response': res['text']}, ignore_index=True)
    df.to_csv('history.csv', index=False)