import { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Button, Typography, Box, Paper, Divider } from "@mui/material";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import jsPDF from "jspdf";

const EmployeeCVPreviewPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const employee = location.state?.employee || {};
  const pdfRef = useRef(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const fetchPdfUrl = async () => {
      const storage = getStorage();
      const cvRef = ref(storage, `cv-files/${id}.pdf`);

      try {
        const url = await getDownloadURL(cvRef);
        setPdfUrl(url);
      } catch (error) {
        console.error("Erro ao obter a URL do CV:", error);
      }
    };

    fetchPdfUrl();
  }, [id]);

  const handleGeneratePDF = () => {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 15;

    // Adicionando título
    pdf.setFontSize(24);
    pdf.setFont("helvetica", "bold");
    pdf.text("Currículo", margin, margin + 10);
    
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Nome: ${employee.firstName || 'N/A'} ${employee.lastName || 'N/A'}`, margin, margin + 20);
    pdf.text(`Telefone: ${employee.phone || 'N/A'}`, margin, margin + 30);
    pdf.text(`Email: ${employee.email || 'N/A'}`, margin, margin + 40);
    pdf.text(`Endereço: ${employee.address || 'N/A'}`, margin, margin + 50);

    pdf.setFontSize(16);
    pdf.setFont("helvetica", "bold");
    pdf.text("Informações do Funcionário", margin, margin + 70);
    
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Cargo: ${employee.position || 'N/A'}`, margin, margin + 80);
    pdf.text(`Departamento: ${employee.department || 'N/A'}`, margin, margin + 90);
    pdf.text(`Data de Admissão: ${employee.startDate || 'N/A'}`, margin, margin + 100);
    pdf.text(`Status: ${employee.isTerminated ? 'Terminado' : 'Ativo'}`, margin, margin + 110);
    pdf.text(`ID: ${id}`, margin, margin + 120);

    pdf.setFontSize(16);
    pdf.setFont("helvetica", "bold");
    pdf.text("Histórico", margin, margin + 140);
    
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "normal");
    
    if (Array.isArray(employee.history) && employee.history.length > 0) {
      employee.history.forEach((event, index) => {
        pdf.text(`${event.date}: ${event.event}`, margin, margin + 150 + index * 10);
      });
    } else {
      pdf.text("Nenhum histórico disponível.", margin, margin + 150);
    }

    // Salvar o PDF
    pdf.save(`${employee.firstName}_${employee.lastName}_CV_Gerado.pdf`);
  };

  return (
    <Box className="min-h-screen flex flex-col items-center p-8 bg-gray-50">
      <Typography variant="h4" fontWeight="bold" color="#0782F9" gutterBottom>
        Pré-visualização do CV
      </Typography>
      {employee && (
        <Paper 
          elevation={3} 
          ref={pdfRef} 
          sx={{ 
            padding: 3, 
            mb: 3, 
            borderRadius: 2, 
            maxWidth: '800px', 
            margin: 'auto', 
            backgroundColor: '#FFFFFF', 
            boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Typography variant="h5" fontWeight="bold" sx={{ borderBottom: '2px solid #0782F9', pb: 1 }}>
            Informações de Contato
          </Typography>
          <Typography variant="subtitle1" sx={{ my: 1 }}>Nome: {employee.firstName || 'N/A'} {employee.lastName || 'N/A'}</Typography>
          <Typography variant="subtitle1" sx={{ my: 1 }}>Telefone: {employee.phone || 'N/A'}</Typography>
          <Typography variant="subtitle1" sx={{ my: 1 }}>Email: {employee.email || 'N/A'}</Typography>
          <Typography variant="subtitle1" sx={{ my: 1 }}>Endereço: {employee.address || 'N/A'}</Typography>

          <Divider sx={{ my: 2 }} />
          <Typography variant="h5" fontWeight="bold" sx={{ borderBottom: '2px solid #0782F9', pb: 1 }}>
            Informações do Funcionário
          </Typography>
          <Typography variant="subtitle1" sx={{ my: 1 }}>Cargo: {employee.position || 'N/A'}</Typography>
          <Typography variant="subtitle1" sx={{ my: 1 }}>Departamento: {employee.department || 'N/A'}</Typography>
          <Typography variant="subtitle1" sx={{ my: 1 }}>Data de Admissão: {employee.startDate || 'N/A'}</Typography>
          <Typography variant="subtitle1" sx={{ my: 1 }}>Status: {employee.isTerminated ? 'Terminado' : 'Ativo'}</Typography>
          <Typography variant="subtitle1" sx={{ my: 1 }}>ID: {id}</Typography>

          <Divider sx={{ my: 2 }} />
          <Typography variant="h5" fontWeight="bold" sx={{ borderBottom: '2px solid #0782F9', pb: 1 }}>
            Histórico
          </Typography>
          {Array.isArray(employee.history) && employee.history.length > 0 ? (
            employee.history.map((event, index) => (
              <Typography key={index} variant="subtitle1" sx={{ my: 1 }}>
                {event.date}: {event.event}
              </Typography>
            ))
          ) : (
            <Typography variant="subtitle1" sx={{ my: 1 }}>Nenhum histórico disponível.</Typography>
          )}
        </Paper>
      )}
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleGeneratePDF}
      >
        Baixar CV
      </Button>
    </Box>
  );
};

export default EmployeeCVPreviewPage;
