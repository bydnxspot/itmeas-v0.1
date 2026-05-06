import streamlit as st
from pytrends.request import TrendReq

st.set_page_config(page_title="ITMEAS v0.1", layout="centered")
st.markdown("""
    <style>
    body {
        background-color: #0e1117;
        color: white;
    }
    .stApp {
        background: linear-gradient(135deg, #0e1117, #1c1f26);
    }
    </style>
""", unsafe_allow_html=True)

st.title("📊 ITMEAS v0.1")
st.markdown("### Understand trends. Discover economic opportunities.")
st.divider()

keyword = st.text_input("🔍 Enter a trend (e.g. afrobeats, bitcoin, AI):")

st.sidebar.header("⚙️ Settings")
region = st.sidebar.selectbox("Select Region", ["Global", "Nigeria"])
time_option = st.sidebar.selectbox("Time Range", [
    "Last 7 days",
    "Last 1 month",
    "Last 3 months"
])

# Map to pytrends format
time_map = {
    "Last 7 days": "now 7-d",
    "Last 1 month": "today 1-m",
    "Last 3 months": "today 3-m"
}

timeframe = time_map[time_option]
if keyword:
    try:
        pytrends = TrendReq(hl='en-US', tz=360)

        geo = "NG" if region == "Nigeria" else ""

        pytrends.build_payload([keyword], timeframe=timeframe, geo=geo)
        data = pytrends.interest_over_time()

        if not data.empty:
            st.subheader("📈 Trend Chart")
            st.line_chart(data[keyword])

            score = int(data[keyword].mean())

            st.subheader("📊 Trend Score")

            col1, col2 = st.columns(2)

            with col1:
                st.metric("Score", score)

            with col2:
                if score > 75:
                    st.success("🔥 High Demand")
                elif score > 50:
                    st.info("📈 Growing Trend")
                else:
                    st.warning("⚖️ Low Momentum")
                else:
                    st.warning("No trend data found. Try another keyword.")
                    
    except Exception:
        st.error("⚠️ Error fetching data. Try again.")
        else:
            st.warning("No trend data found. Try another keyword.")

    except Exception as e:
        st.error("⚠️ Error fetching data. Try another keyword or refresh.")

st.divider()
st.caption("ITMEAS Engine v0.1 • Live Trend Intelligence")

    
