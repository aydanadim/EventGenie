import streamlit as st
import pandas as pd
import json
import os
from google import genai
from google.genai import types

# --- PAGE CONFIGURATION ---
st.set_page_config(
    page_title="GenAI Event & Celebration Planner",
    page_icon="🎉",
    layout="wide"
)

# --- GEMINI API SETUP ---
api_key = st.secrets.get("GEMINI_API_KEY") or os.getenv("GEMINI_API_KEY")

if not api_key:
    st.sidebar.error("⚠️ GEMINI_API_KEY not found!")
    st.sidebar.info("Add your key to `.streamlit/secrets.toml` or Streamlit Cloud Secrets.")

client = genai.Client(api_key=api_key) if api_key else None

# --- APP HEADER ---
st.title("🎉 GenAI Celebration & Event Planner")
st.caption("Powered by Google Gemini | PromptWars Challenge 05")

# --- SIDEBAR: EVENT SETUP ---
st.sidebar.header("📋 Event Parameters")
event_type = st.sidebar.selectbox("Event Type", ["Wedding", "Birthday Party", "Community Event", "Corporate Gathering"])
event_name = st.sidebar.text_input("Event Name", value=f"My {event_type}")
event_date = st.sidebar.date_input("Target Date")
total_budget = st.sidebar.number_input("Total Budget ($)", min_value=100, value=5000, step=500)
guest_count = st.sidebar.number_input("Estimated Guests", min_value=1, value=50, step=5)
location = st.sidebar.text_input("Location", value="New York, NY")
theme_preference = st.sidebar.text_input("Theme Vibe", value="Modern & Elegant")

# --- MAIN TABS ---
tab1, tab2, tab3, tab4 = st.tabs(["💡 AI Creative Ideas", "💰 Smart Budget", "📅 Timeline", "🤖 AI Co-Pilot"])

with tab1:
    st.header("💡 AI Theme & Ideas")
    if st.button("✨ Generate Event Concept", type="primary"):
        if client:
            with st.spinner("Crafting your event concept..."):
                prompt = f"Create event planning ideas for a {event_type} named '{event_name}' for {guest_count} guests with a ${total_budget} budget. Include theme, color palette, decor, and menu ideas."
                response = client.models.generate_content(model='gemini-3.8-flash', contents=prompt)
                st.markdown(response.text)
        else:
            st.error("Please configure your Gemini API Key.")

with tab2:
    st.header("💰 Budget Breakdown")
    default_data = {
        "Category": ["Venue", "Catering", "Decor", "Media", "Entertainment", "Buffer"],
        "Allocated ($)": [total_budget*0.3, total_budget*0.35, total_budget*0.15, total_budget*0.1, total_budget*0.05, total_budget*0.05]
    }
    df = pd.DataFrame(default_data)
    st.dataframe(df, use_container_width=True)
    st.bar_chart(df.set_index('Category')['Allocated ($)'])

with tab3:
    st.header("📅 Milestone Timeline")
    if st.button("🗓️ Generate Timeline"):
        if client:
            with st.spinner("Building timeline..."):
                response = client.models.generate_content(model='gemini-3.8-flash', contents=f"Create a planning timeline for a {event_type} on {event_date}.")
                st.markdown(response.text)
        else:
            st.error("Please configure your Gemini API Key.")

with tab4:
    st.header("🤖 AI Event Co-Pilot")
    if "messages" not in st.session_state:
        st.session_state.messages = [{"role": "assistant", "content": "Hi! Ask me anything about your event planning."}]
    
    for msg in st.session_state.messages:
        with st.chat_message(msg["role"]):
            st.markdown(msg["content"])
            
    if user_prompt := st.chat_input("Ask a question..."):
        st.session_state.messages.append({"role": "user", "content": user_prompt})
        with st.chat_message("user"):
            st.markdown(user_prompt)
        if client:
            with st.chat_message("assistant"):
                res = client.models.generate_content(model='gemini-3.8-flash', contents=user_prompt)
                st.markdown(res.text)
                st.session_state.messages.append({"role": "assistant", "content": res.text})
        else:
            st.error("Please configure your Gemini API Key.")
