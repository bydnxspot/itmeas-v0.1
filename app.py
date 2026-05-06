import streamlit as st
from pytrends.request import TrendReq

st.set_page_config(page_title="ITMEAS v0.1", layout="centered")

st.title("📊 ITMEAS v0.1")
st.caption("Intelligent Trend Monitoring & Economic Analysis System")

st.divider()

keyword = st.text_input("🔍 Enter a trend (e.g. afrobeats, bitcoin, AI):")

st.sidebar.header("⚙️ Settings")
region = st.sidebar.selectbox("Select Region", ["Global", "Nigeria"])
timeframe = st.sidebar.selectbox("Time Range", ["now 7-d", "today 1-m", "today 3-m"])

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
            st.metric("Average Interest", score)

            st.subheader("💰 Economic Insight")

            if score > 75:
                st.success("High demand → Strong economic opportunity")
            elif score > 50:
                st.info("Growing trend → Early-stage opportunity")
            else:
                st.warning("Low momentum → Limited or niche market")

        else:
            st.warning("No trend data found. Try another keyword.")

    except Exception as e:
        st.error("⚠️ Error fetching data. Try another keyword or refresh.")

st.divider()
st.caption("ITMEAS Engine v0.1 • Live Trend Intelligence")
