import warnings
warnings.filterwarnings("ignore")

from transformers import pipeline

summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

print("Enter the text you want to summarize:")
text = input()

summary = summarizer(text, max_length=50, min_length=20, do_sample=False)

print("\nSummary:")
print(summary[0]['summary_text'])
