from transformers import pipeline
import warnings

warnings.filterwarnings("ignore")

summarizer = pipeline("summarization")

text = """Artificial Intelligence is rapidly transforming the way humans interact with technology.
From virtual assistants to self-driving cars, AI is becoming an integral part of daily life.
Companies are investing heavily in AI research to improve efficiency, reduce costs, and
create smarter systems. However, concerns about data privacy, job displacement, and ethical
use of AI continue to grow. Balancing innovation with responsibility is crucial for the
future of AI development."""

summary = summarizer(text, max_length=60, min_length=25, do_sample=False)

print("PARAGRAPH:\n", text)
print("\nSUMMARY:\n", summary[0]['summary_text'])