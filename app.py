""" ITMEAS v2.1 - Clean Stable Rebuild (Fixed Imports + Safe Naming) Intelligent Trend Monitor & Economic Analysis System Author: Aduba Joseph """

import streamlit as st import pandas as pd import numpy as np import plotly.graph_objects as go from datetime import datetime, timedelta

----------------------------

PAGE CONFIG

----------------------------

st.set_page_config( page_title="ITMEAS Dashboard", page_icon="📊", layout="wide" )

----------------------------

STYLE

----------------------------

st.markdown( """ <style> .main { background-color: #0e1117; color: #ffffff; } </style> """, unsafe_allow_html=True )

----------------------------

DATA GENERATION (MOCK)

----------------------------

def generate_data(num_days: int = 30): dates = pd.date_range(end=datetime.today(), periods=num_days) values = np.cumsum(np.random.randn(num_days) * 2 + 0.5)

return pd.DataFrame({
    "Date": dates,
    "Value": values
})

----------------------------

TIME RANGE HANDLER

----------------------------

def get_data_by_range(time_option: str): if time_option == "Now (7 Days)": return generate_data(7) elif time_option == "1 Month": return generate_data(30) elif time_option == "3 Months": return generate_data(90) else: return generate_data(30)

----------------------------

SIMPLE FORECAST MODEL (PLACEHOLDER)

----------------------------

def simple_forecast(df: pd.DataFrame): last_value = df["Value"].iloc[-1] trend = np.mean(np.diff(df["Value"].values))

return [last_value + trend * i for i in range(1, 6)]

----------------------------

PLOT FUNCTION

----------------------------

def plot_data(df: pd.DataFrame, forecast=None): fig = go.Figure()

fig.add_trace(go.Scatter(
    x=df["Date"],
    y=df["Value"],
    mode="lines+markers",
    name="Trend"
))

if forecast is not None:
    future_dates = [df["Date"].iloc[-1] + timedelta(days=i) for i in range(1, 6)]

    fig.add_trace(go.Scatter(
        x=future_dates,
        y=forecast,
        mode="lines+markers",
        name="Forecast"
    ))

fig.update_layout(
    template="plotly_dark",
    title="ITMEAS Trend Analysis",
    xaxis_title="Date",
    yaxis_title="Index Value"
)

st.plotly_chart(fig, use_container_width=True)

----------------------------

MAIN APP

----------------------------

def main(): st.title("📊 ITMEAS - Intelligent Trend Monitor & Economic Analysis System")

st.sidebar.header("Controls")

time_range = st.sidebar.selectbox(
    "Select Time Range",
    ["Now (7 Days)", "1 Month", "3 Months"]
)

enable_forecast = st.sidebar.checkbox("Enable Forecast", value=True)

df = get_data_by_range(time_range)

st.subheader("Live Trend Data")
st.dataframe(df.tail(10))

forecast = simple_forecast(df) if enable_forecast else None

st.subheader("Visualization")
plot_data(df, forecast)

st.subheader("System Insights")

col1, col2, col3 = st.columns(3)

col1.metric("Current Index", f"{df['Value'].iloc[-1]:.2f}")
col2.metric("Avg Change", f"{np.mean(np.diff(df['Value'])):.2f}")
col3.metric("Volatility", f"{np.std(df['Value']):.2f}")

st.success("System running stable 🚀")

if name == "main": main()
