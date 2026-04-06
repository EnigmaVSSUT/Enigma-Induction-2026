# ── Imports ───────────────────────────────────────────────────
import streamlit as st
from transformers import pipeline

# ── Page Config ───────────────────────────────────────────────
st.set_page_config(page_title="Text Summarizer", page_icon="📝")

# ── Title ─────────────────────────────────────────────────────
st.title("📝 Text Summarizer")
st.caption("Using facebook/bart-large-cnn model")
st.divider()

# ── Load Model (only once using cache) ────────────────────────
@st.cache_resource
def load_model():
    return pipeline("summarization", model="facebook/bart-large-cnn", device=-1)

# ── Text Input ────────────────────────────────────────────────
input_text = st.text_area("Enter your text here:", height=200)

# ── Summarize Button ──────────────────────────────────────────
if st.button("Summarize"):

    # Check if input is empty
    if not input_text.strip():
        st.warning("Please enter some text first.")

    # Check if text is too short for summarization
    elif len(input_text.split()) < 30:
        st.warning("Text is too short. Please enter at least 30 words.")

    else:
        # Show spinner while summarizing
        with st.spinner("Summarizing..."):
            summarizer = load_model()
            result = summarizer(input_text, max_length=80, min_length=30, do_sample=False)
            summary = result[0]['summary_text']

        # ── Display Summary ────────────────────────────────────
        st.divider()
        st.subheader("Summary:")
        st.success(summary)

        # ── Word Count Info ────────────────────────────────────
        st.caption(f"Original: {len(input_text.split())} words  |  Summary: {len(summary.split())} words")