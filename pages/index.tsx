import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import UploadButton from "../components/UploadButton";

const Home: NextPage = () => {
  const [report, setReport] = useState("");

  const onChange = async (formData: any) => {
    const response = await axios.post("/api/convert", formData, {
      headers: { "content-type": "multipart/form-data" },
    });

    setReport(response.data.data);
    navigator.clipboard.writeText(response.data.data);
    toast("📋 Copied to clipboard", {
      position: "top-right",
      hideProgressBar: true,
      autoClose: 3000,
      closeOnClick: true,
      closeButton: false,
      className: "toast",
    });
  };

  return (
    <>
      <Head>
        <title>MetroRetro Reports</title>
      </Head>

      <ToastContainer />
      <div className="hero">
        <div className="title">Metro Retro Report</div>
        <div className="subtitle">
          Convert your JSON export into text format
        </div>

        <UploadButton onChange={onChange} />
      </div>
      <div className="report">
        {report && <div className="title">Your report</div>}
        <pre>{report}</pre>
      </div>
    </>
  );
};

export default Home;
