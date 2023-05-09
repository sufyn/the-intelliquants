from flask import Flask, render_template, Response, request, redirect, url_for
import ctypes
import cv2
import subprocess
import numpy as np


app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')





@app.route('/youtube')
def youtube():
    return render_template('youtube.html')

@app.route('/gpt')
def gpt():

    from transformers import AutoModel
    from dotenv import load_dotenv
    from langchain import HuggingFaceHub, LLMChain
    from langchain.prompts import PromptTemplate

    load_dotenv()
 
    hub_llm = HuggingFaceHub(
        repo_id="gpt2",
        model_kwargs={'temperature':0.8, 'max_length':100})

# mrm8488/t5-base-finetuned-wikiSQL       gpt2      https://huggingface.co/chat/
    prompt = PromptTemplate(
        input_variables = ["question"],
        template = "Translate english to sql:{question}"
    )
    hub_chain = LLMChain(prompt=prompt , llm=hub_llm, verbose=True)
    print(hub_chain.run("what is average of respondants using a mobile?"))

    return render_template('gpt.html')

if __name__ == '__main__':
    app.run(threaded=True, debug=True)
