import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import UploadButton from "../components/UploadButton";

const Home: NextPage = () => {
  const [report, setReport] = useState("");

  const onChange = async (formData: any) => {
    const response = await axios.post("/api/convert", formData, {
      headers: { "content-type": "multipart/form-data" },
    });

    setReport(response.data.data);
  };

  return (
    <div>
      <Head>
        <title>MetroRetro Reports</title>
        <meta
          name="description"
          content="Create text reports from MetroRetro"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div>
          <UploadButton onChange={onChange} />
          <pre>{report}</pre>
        </div>
      </div>
    </div>
  );
};

export default Home;
