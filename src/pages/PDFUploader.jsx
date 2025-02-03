import  { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import supabase from "../supabase";
import { Document, Page, pdfjs } from "react-pdf";

// Configure pdf.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFUploader = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [pdfs, setPdfs] = useState([]);

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Upload file
  const uploadFile = async () => {
    if (!file) {
      alert("Please select a PDF file to upload.");
      return;
    }

    setUploading(true);

    // eslint-disable-next-line no-unused-vars
    const { data, error } = await supabase.storage
      .from("pdf-uploads")
      .upload(`pdfs/${file.name}`, file);

    setUploading(false);

    if (error) {
      alert(`Upload failed: ${error.message}`);
    } else {
      alert("Upload successful!");
      fetchPdfs();
    }
  };

  // Fetch all uploaded PDFs
  const fetchPdfs = async () => {
    const { data, error } = await supabase.storage
      .from("pdf-uploads")
      .list("pdfs");

    if (error) {
      console.error("Error fetching PDFs:", error.message);
      return;
    }

    const pdfList = data.map((file) => ({
      name: file.name,
      url: supabase.storage
        .from("pdf-uploads")
        .getPublicUrl(`pdfs/${file.name}`).data.publicUrl,
    }));

    setPdfs(pdfList);
  };

  // Load PDFs on component mount
  useEffect(() => {
    fetchPdfs();
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Upload & View PDFs</h2>

      {/* Upload PDF */}
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button
        onClick={uploadFile}
        disabled={uploading}
        style={{ marginLeft: "10px" }}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {/* Display PDFs */}
      <div style={{ marginTop: "20px" }}>
        <h3>Uploaded PDFs</h3>
        {pdfs.length === 0 ? (
          <p>No PDFs uploaded yet.</p>
        ) : (
          pdfs.map((pdf, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <h4>{pdf.name}</h4>
              <Document file={pdf.url}>
                <Page pageNumber={1} width={400} />
              </Document>
              <a href={pdf.url} target="_blank" rel="noopener noreferrer">
                Open PDF
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PDFUploader;
