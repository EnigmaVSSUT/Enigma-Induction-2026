# Text Summarizer App

This is a simple text summarizer app made using Streamlit and HuggingFace Transformers.
It uses the facebook/bart-large-cnn model to summarize long text.

## How to Run

install the libraries first

```
pip install streamlit transformers torch tf-keras
```

then run the app

```
streamlit run summarizer_app.py
```

## Requirements

- Python 3.8+
- streamlit
- transformers
- torch
- tf-keras

## Note

- first time loading will be slow because the model is around 1.6 GB
- enter at least 30 words for the summary to work properly
- app opens at http://localhost:8501
