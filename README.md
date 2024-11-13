# Flask Web Application

This project is a Flask-based web application with several routes to display HTML pages and integrate with AI models. It includes functionalities such as displaying YouTube content, interacting with GPT models, and running image processing via OpenCV.

## Features

- **Home Page**: Displays the main interface with a simple navigation setup.
- **YouTube Page**: A dedicated page for YouTube-related content.
- **GPT Integration**: Uses HuggingFace and LangChain to run GPT-2 model for natural language processing tasks (e.g., translating English to SQL).
- **Image Processing**: Uses OpenCV for handling video feeds and image processing tasks (though not implemented fully in this code snippet).

## Requirements

- Python 3.x
- `Flask`
- `transformers`
- `langchain`
- `python-dotenv`
- `opencv-python`
- `numpy`

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/flask_webapp.git
   cd flask_webapp
   ```

2. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up your `.env` file with any necessary environment variables.

## How It Works

### 1. Home Route (`/`)

The home page (`index.html`) is rendered when visiting the root URL (`/`).

### 2. YouTube Route (`/youtube`)

The `/youtube` route renders a `youtube.html` page, which could be used to display YouTube videos or any related content.

### 3. GPT Route (`/gpt`)

- **Loading the GPT-2 model**: The `/gpt` route integrates the HuggingFace GPT-2 model through the LangChain library. The model is used to process a prompt (e.g., translating a question into SQL).
- The application loads the model and prints the output of the GPT-2 response for the given prompt, which translates a simple English question into an SQL statement.

## Code

```python
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

    prompt = PromptTemplate(
        input_variables = ["question"],
        template = "Translate english to sql:{question}"
    )
    hub_chain = LLMChain(prompt=prompt , llm=hub_llm, verbose=True)
    print(hub_chain.run("what is average of respondants using a mobile?"))

    return render_template('gpt.html')

if __name__ == '__main__':
    app.run(threaded=True, debug=True)
```

### Key Components:

1. **Flask Application**: This handles the web routes and serves HTML pages.
2. **OpenCV (cv2)**: Although not fully utilized in this snippet, OpenCV is imported for handling image/video processing (if needed in the future).
3. **Transformers and LangChain**: These libraries are used to load the GPT-2 model from HuggingFace and integrate it into the application via LangChain for NLP tasks.

## Running the Application

1. Ensure you have the necessary environment variables set in a `.env` file.
2. Run the Flask application:
   ```bash
   python app.py
   ```
3. The application will be hosted at `http://127.0.0.1:5000/` by default.

   - **Home Page**: Access the root URL (`/`) to view the main page.
   - **YouTube Page**: Access `/youtube` for YouTube-related content.
   - **GPT Page**: Access `/gpt` to interact with the GPT-2 model and see SQL translations.

## Example Output

On the `/gpt` route, the application will output a translation of a given question into SQL. For example:
```bash
what is average of respondents using a mobile?
# Translates to:
Translate english to sql: SELECT AVG(usage) FROM respondents WHERE device = 'mobile';
```

## Contributing

Feel free to fork this repository, report issues, or submit pull requests to enhance the project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
