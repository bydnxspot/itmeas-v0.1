"""ITMEAS v2.1 - Intelligent Trend Monitor & Economic Analysis System."""

from datetime import datetime, timedelta

import numpy as np
import pandas as pd
import plotly.graph_objects as go
import streamlit as st

st.set_page_config(
    page_title="ITMEAS Dashboard",
    page_icon="📊",
    layout="wide",
)

st.markdown(
    """
    <style>
        .stApp { background: #0e1117; }
        [data-testid="stMetric"] { background: #161b22; padding: 16px; border-radius: 12px; }
    </style>
    """,
    unsafe_allow_html=True,
)


def generate_data(num_days: int = 30) -> pd.DataFrame:
    """Generate demo trend data for the MVP."""
    dates = pd.date_range(end=datetime.today(), periods=num_days)
    values = np.cumsum(np.random.randn(num_days) * 2 + 0.5)
    return pd.DataFrame({"Date": dates, "Value": values})


def get_data_by_range(time_option: str) -> pd.DataFrame:
    if time_option == "Now (7 Days)":
        return generate_data(7)
    if time_option == "1 Month":
        return generate_data(30)
    if time_option == "3 Months":
        return generate_data(90)
    return generate_data(30)


def simple_forecast(df: pd.DataFrame) -> list[float]:
    """Return a simple five-day baseline forecast for the MVP."""
    last_value = float(df["Value"].iloc[-1])
    trend = float(np.mean(np.diff(df["Value"].values)))
    return [last_value + trend * i for i in range(1, 6)]


def plot_data(df: pd.DataFrame, forecast: list[float] | None = None) -> None:
    fig = go.Figure()
    fig.add_trace(
        go.Scatter(
            x=df["Date"],
            y=df["Value"],
            mode="lines+markers",
            name="Trend",
        )
    )

    if forecast is not None:
        future_dates = [
            df["Date"].iloc[-1] + timedelta(days=i) for i in range(1, 6)
        ]
        fig.add_trace(
            go.Scatter(
                x=future_dates,
                y=forecast,
                mode="lines+markers",
                name="Forecast",
            )
        )

    fig.update_layout(
        template="plotly_dark",
        title="ITMEAS Trend Analysis",
        xaxis_title="Date",
        yaxis_title="Index Value",
        margin=dict(l=20, r=20, t=60, b=20),
    )
    st.plotly_chart(fig, use_container_width=True)


def main() -> None:
    st.title("📊 ITMEAS")
    st.caption("Intelligent Trend Monitor & Economic Analysis System")

    st.sidebar.header("Controls")
    time_range = st.sidebar.selectbox(
        "Select Time Range",
        ["Now (7 Days)", "1 Month", "3 Months"],
    )
    enable_forecast = st.sidebar.checkbox("Enable Forecast", value=True)

    df = get_data_by_range(time_range)
    forecast = simple_forecast(df) if enable_forecast else None

    st.subheader("Live Trend Data")
    st.dataframe(df.tail(10), use_container_width=True)

    st.subheader("Visualization")
    plot_data(df, forecast)

    st.subheader("System Insights")
    col1, col2, col3 = st.columns(3)
    col1.metric("Current Index", f"{df['Value'].iloc[-1]:.2f}")
    col2.metric("Avg Change", f"{np.mean(np.diff(df['Value'])):.2f}")
    col3.metric("Volatility", f"{np.std(df['Value']):.2f}")

    st.success("ITMEAS is running successfully 🚀")
    st.info("This v2.1 build uses generated demo data. Real trend/economic APIs can be connected in the next stage.")


if __name__ == "__main__":
    main()
