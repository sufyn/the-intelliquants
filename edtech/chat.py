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
