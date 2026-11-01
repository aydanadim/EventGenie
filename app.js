import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Calendar, DollarSign, CheckSquare, Users, Heart, Gift, Briefcase, 
  Plus, Trash2, CheckCircle2, Circle, Send, RefreshCw, ChevronRight, Layers, 
  MapPin, Clock, ShieldAlert, Award, FileText, PieChart, ArrowUpRight
} from 'lucide-react';

// --- MAIN APP COMPONENT ---
export default function App() {
  // State for active view tab
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Event Details State
  const [eventDetails, setEventDetails] = useState({
    title: "Sophia & Alex's Dream Wedding",
    type: 'wedding', // wedding, birthday, community, corporate
    date: '2026-09-18',
    location: 'Napa Valley, CA',
    guestCount: 120,
    totalBudget: 25000,
    theme: 'Rustic Elegance & Sunset Gold'
  });

  // Budget Items State
  const [budgetItems, setBudgetItems] = useState([
    { id: '1', category: 'Venue & Catering', name: 'Vineyard Estate Rental', estimated: 10000, actual: 9500, paid: true },
    { id: '2', category: 'Venue & Catering', name: 'Plated Dinner & Open Bar', estimated: 6000, actual: 6200, paid: false },
    { id: '3', category: 'Photography', name: 'Full-Day Photo & Video Crew', estimated: 3500, actual: 3500, paid: true },
    { id: '4', category: 'Floral & Decor', name: 'Arch, Centerpieces & Lights', estimated: 2500, actual: 2100, paid: false },
    { id: '5', category: 'Entertainment', name: 'Live Acoustic Trio + DJ', estimated: 2000, actual: 1800, paid: false },
    { id: '6', category: 'Stationery', name: 'Custom Foil Invites & Menus', estimated: 1000, actual: 850, paid: true },
  ]);

  // Timeline Milestones State
  const [timeline, setTimeline] = useState([
    { id: 't1', title: 'Secure Venue & Date Deposit', date: '2026-02-15', status: 'completed', phase: '6-9 Months Out' },
    { id: 't2', title: 'Send Save-the-Dates & Launch Website', date: '2026-03-30', status: 'completed', phase: '6-9 Months Out' },
    { id: 't3', title: 'Finalize Catering Menu & Wine Pairings', date: '2026-06-15', status: 'in-progress', phase: '3-5 Months Out' },
    { id: 't4', title: 'Confirm Floral & Lighting Schematics', date: '2026-07-20', status: 'pending', phase: '1-2 Months Out' },
    { id: 't5', title: 'Final Rehearsal & Vendor Walkthrough', date: '2026-09-17', status: 'pending', phase: 'Week Of' },
  ]);

  // Vendor Checklist State
  const [checklist, setChecklist] = useState([
    { id: 'c1', task: 'Book Photographer & Videographer', completed: true, category: 'Media' },
    { id: 'c2', task: 'Confirm Sound & Audio Requirements with DJ', completed: false, category: 'Entertainment' },
    { id: 'c3', task: 'Review Catering Dietary Restrictions List', completed: true, category: 'Catering' },
    { id: 'c4', task: 'Finalize Floor Plan & Table Layout', completed: false, category: 'Venue' },
    { id: 'c5', task: 'Order Custom Favors & Guest Gift Bags', completed: false, category: 'Decor' },
  ]);

  // AI Generator State
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState(null);

  // AI Chat Assistant State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: "Hello! I'm your GenAI Event Co-pilot. How can I help you plan your event today? You can ask me for budget tips, theme ideas, or timeline suggestions!" }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Calculations
  const totalEstimated = budgetItems.reduce((acc, item) => acc + item.estimated, 0);
  const totalActual = budgetItems.reduce((acc, item) => acc + item.actual, 0);
  const totalPaid = budgetItems.reduce((acc, item) => acc + (item.paid ? item.actual : 0), 0);
  const budgetRemaining = eventDetails.totalBudget - totalActual;

  // New Item Handlers
  const [newItemName, setNewItemName] = useState('');
  const [newItemCat, setNewItemCat] = useState('Venue & Catering');
  const [newItemCost, setNewItemCost] = useState('');

  const addBudgetItem = (e) => {
    e.preventDefault();
    if (!newItemName || !newItemCost) return;
    const item = {
      id: Date.now().toString(),
      category: newItemCat,
      name: newItemName,
      estimated: parseFloat(newItemCost),
      actual:Here is the complete, self-contained Python code using **Streamlit** and **Google Gemini** (via `google-genai`) to build and deploy your **GenAI Celebration & Event Planner**. 

Streamlit is ideal for this PromptWars challenge because it can be deployed for free in minutes using **Streamlit Community Cloud** (giving you the exact deployment link required for submission).

### `app.py`

```python
import streamlit as st
import pandas as pd
import json
import os
from google import genai
from google.genai import types

# --- PAGE CONFIGURATION ---
st.set_page_config(
    page_config_title="GenAI Event & Celebration Planner",
    page_icon="🎉",
    layout="wide",
    initial_sidebar_state="expanded"
)

# --- GEMINI API SETUP ---
# Fetch API key from Streamlit secrets or environment variable
api_key = st.secrets.get("GEMINI_API_KEY") or os.getenv("GEMINI_API_KEY")

if not api_key:
    st.sidebar.error("⚠️ GEMINI_API_KEY not found in Streamlit Secrets or Environment!")
    st.sidebar.info("Add your key to `.streamlit/secrets.toml` or Streamlit Cloud Secrets.")

client = genai.Client(api_key=api_key) if api_key else None

# --- APP TITLE & HEADER ---
st.title("🎉 GenAI Celebration & Event Planner")
st.caption("Powered by Google Gemini | Organize Weddings, Birthdays & Community Events with AI")

# --- SIDEBAR: EVENT SETUP ---
st.sidebar.header("📋 Event Parameters")
event_type = st.sidebar.selectbox(
    "Event Type",
    ["Wedding", "Birthday Party", "Community Event", "Corporate Gathering", "Anniversary", "Custom"]
)
event_name = st.sidebar.text_input("Event Name", value=f"My {event_type}")
event_date = st.sidebar.date_input("Target Date")
total_budget = st.sidebar.number_input("Total Budget ($)", min_value=100, value=5000, step=500)
guest_count = st.sidebar.number_input("Estimated Guests", min_value=1, value=50, step=5)
location = st.sidebar.text_input("Location / City", value="New York, NY")
theme_preference = st.sidebar.text_input("Theme / Vibe Preference", value="Modern & Elegant")

st.sidebar.markdown("---")
st.sidebar.write("✨ **PromptWars Challenge 05**")

# --- MAIN NAVIGATION TABS ---
tab1, tab2, tab3, tab4, tab5 = st.tabs([
    "💡 AI Creative Ideas", 
    "💰 Smart Budget", 
    "📅 Timeline & Schedule", 
    "✅ Vendor Checklist", 
    "🤖 AI Assistant Chat"
])

# ==========================================
# TAB 1: AI CREATIVE IDEAS & CONCEPTS
# ==========================================
with tab1:
    st.header("💡 AI Theme & Personalized Event Ideas")
    st.write("Generate tailored themes, decor concepts, menu ideas, and entertainment activities for your event.")
    
    if st.button("✨ Generate Event Plan with Gemini", type="primary"):
        if not client:
            st.error("Please configure your Gemini API Key first.")
        else:
            with st.spinner("Gemini is crafting your personalized event concept..."):
                prompt = f"""
                You are an expert event planner. Create a personalized event planning guide for:
                - Event Type: {event_type}
                - Event Name: {event_name}
                - Guest Count: {guest_count} guests
                - Total Budget: ${total_budget}
                - Location: {location}
                - Desired Theme: {theme_preference}

                Please provide structured ideas including:
                1. **Overall Theme & Color Palette** (3-4 specific color hex recommendations or descriptions)
                2. **Decor & Lighting Concepts**
                3. **Catering & Signature Drinks / Menu Recommendations**
                4. **Interactive Guest Activities / Entertainment**
                5. **Unique Personalization Touches**
                """
                try:
                    response = client.models.generate_content(
                        model='gemini-2.5-flash',
                        contents=prompt,
                    )
                    st.markdown(response.text)
                except Exception as e:
                    st.error(f"Error generating plan: {e}")

# ==========================================
# TAB 2: SMART BUDGET MANAGER
# ==========================================
with tab2:
    st.header("💰 Budget Allocation & Expense Tracking")
    
    col1, col2 = st.columns([1, 2])
    
    with col1:
        st.subheader("Generate Estimated Breakdown")
        if st.button("📊 Auto-Allocate Budget via AI"):
            if client:
                with st.spinner("Calculating smart budget allocations..."):
                    prompt = f"""
                    Generate a JSON budget breakdown for a {event_type} with a total budget of ${total_budget} for {guest_count} guests.
                    Return ONLY a JSON array of objects with keys: "category", "allocated_amount", "description".
                    Categories should include Venue, Catering, Decor, Photography, Entertainment, and Miscellaneous.
                    """
                    try:
                        response = client.models.generate_content(
                            model='gemini-2.5-flash',
                            contents=prompt,
                            config=types.GenerateContentConfig(response_mime_type="application/json")
                        )
                        budget_data = json.loads(response.text)
                        st.session_state['budget_df'] = pd.DataFrame(budget_data)
                    except Exception as e:
                        st.error(f"Error parsing budget JSON: {e}")
            else:
                st.error("Please configure your Gemini API Key.")

    with col2:
        if 'budget_df' in st.session_state:
            df = st.session_state['budget_df']
            st.dataframe(df, use_container_width=True)
            
            if 'allocated_amount' in df.columns:
                total_allocated = df['allocated_amount'].sum()
                st.metric(label="Total Allocated Budget", value=f"${total_allocated:,.2f}", delta=f"${total_budget - total_allocated:,.2f} remaining")
                st.bar_chart(df.set_index('category')['allocated_amount'])
        else:
            # Default placeholder budget
            default_data = {
                "category": ["Venue & Setup", "Catering & Drinks", "Decor & Floral", "Media / Photo", "Entertainment", "Buffer"],
                "allocated_amount": [total_budget*0.3, total_budget*0.35, total_budget*0.15, total_budget*0.1, total_budget*0.05, total_budget*0.05],
                "description": ["Rental & seating", "Food & beverage", "Centerpieces & lighting", "Photography/Video", "Music/DJ", "Emergency fund"]
            }
            df = pd.DataFrame(default_data)
            st.dataframe(df, use_container_width=True)

# ==========================================
# TAB 3: TIMELINE & SCHEDULE
# ==========================================
with tab3:
    st.header("📅 Timeline & Run of Show")
    st.write("Generate a custom countdown timeline and event-day schedule.")
    
    if st.button("🗓️ Generate AI Milestone Timeline"):
        if client:
            with st.spinner("Building custom milestone timeline..."):
                prompt = f"""
                Create a structured planning timeline for a {event_type} happening on {event_date}.
                Break it down by phases:
                - 3-6 Months Out (or early phase)
                - 1-2 Months Out
                - 1 Week Out
                - Day-of-Event Timeline (Run of Show)
                """
                try:
                    response = client.models.generate_content(
                        model='gemini-2.5-flash',
                        contents=prompt,
                    )
                    st.markdown(response.text)
                except Exception as e:
                    st.error(f"Error generating timeline: {e}")

# ==========================================
# TAB 4: VENDOR CHECKLIST
# ==========================================
with tab4:
    st.header("✅ Vendor Checklists & Action Items")
    
    if st.button("📝 Generate Vendor Checklist"):
        if client:
            with st.spinner("Generating vendor tasks..."):
                prompt = f"""
                Generate an essential vendor booking and coordination checklist for a {event_type} with {guest_count} guests in {location}.
                Include key questions to ask vendors (Caterers, Venue, Photographers, DJ/Band).
                """
                try:
                    response = client.models.generate_content(
                        model='gemini-2.5-flash',
                        contents=prompt,
                    )
                    st.markdown(response.text)
                except Exception as e:
                    st.error(f"Error: {e}")

# ==========================================
# TAB 5: AI EVENT CO-PILOT CHAT
# ==========================================
with tab5:
    st.header("🤖 Event Planning Co-Pilot")
    st.write("Ask Gemini anything about vendor negotiation tips, guest etiquette, or last-minute troubleshooting!")

    # Initialize chat history
    if "messages" not in st.session_state:
        st.session_state.messages = [
            {"role": "assistant", "content": f"Hi! I'm your AI event co-pilot for **{event_name}**. How can I help you plan today?"}
        ]

    # Display chat messages
    for msg in st.session_state.messages:
        with st.chat_message(msg["role"]):
            st.markdown(msg["content"])

    # User input
    if prompt := st.chat_input("Ask a question (e.g., 'How much alcohol do I need for 50 guests?')"):
        st.session_state.messages.append({"role": "user", "content": prompt})
        with st.chat_message("user"):
            st.markdown(prompt)

        if client:
            with st.chat_message("assistant"):
                with st.spinner("Thinking..."):
                    context_prompt = f"Context: Planning a {event_type} named '{event_name}' with {guest_count} guests and a budget of ${total_budget}. User question: {prompt}"
                    try:
                        response = client.models.generate_content(
                            model='gemini-2.5-flash',
                            contents=context_prompt,
                        )
                        reply = response.text
                        st.markdown(reply)
                        st.session_state.messages.append({"role": "assistant", "content": reply})
                    except Exception as e:
                        st.error(f"Error: {e}")
