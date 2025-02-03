import { useEffect, useState } from "react";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfList = () => {
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/pdfs").then((res) => setPdfs(res.data));
  }, []);

  return (
    <div>
      <h2>Available PDFs</h2>
      {pdfs.map((pdf) => (
        <div key={pdf.name}>
          <h4>{pdf.name}</h4>
          <Document file={pdf.url}>
            <Page pageNumber={1} />
          </Document>
          <a href={pdf.url} target="_blank" rel="noopener noreferrer">
            Open PDF
          </a>
        </div>
      ))}
    </div>
  );
};

export default PdfList;
