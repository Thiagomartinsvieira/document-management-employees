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
    console.log(employee);
    const fetchPdfUrl = async () => {
      const storage = getStorage();
      const cvRef = ref(storage, `cv-files/${id}.pdf`);

      try {
        const url = await getDownloadURL(cvRef);
        setPdfUrl(url);
      } catch (error) {
        console.error("Error fetching CV URL:", error);
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

    const margin = 15;

    pdf.setFontSize(24);
    pdf.setFont("helvetica", "bold");
    pdf.text("Curriculum Vitae", margin, margin + 10);
    
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Name: ${employee.firstName} ${employee.lastName}`, margin, margin + 20);
    pdf.text(`Phone: ${employee.phone}`, margin, margin + 30);
    pdf.text(`Email: ${employee.email}`, margin, margin + 40);
    pdf.text(`Address: ${employee.address}`, margin, margin + 50);

    pdf.setFontSize(16);
    pdf.setFont("helvetica", "bold");
    pdf.text("Employee Information", margin, margin + 70);
    
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Job Title: ${employee.jobTitle}`, margin, margin + 80);
    pdf.text(`Department: ${employee.department}`, margin, margin + 90);
    pdf.text(`Start Date: ${employee.startDate}`, margin, margin + 100);
    pdf.text(`Status: ${employee.isTerminated ? 'Terminated' : 'Active'}`, margin, margin + 110);
    pdf.text(`ID: ${id}`, margin, margin + 120);

    pdf.setFontSize(16);
    pdf.setFont("helvetica", "bold");
    pdf.text("History", margin, margin + 140);
    
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "normal");
    
    if (Array.isArray(employee.history) && employee.history.length > 0) {
      employee.history.forEach((event, index) => {
        pdf.text(`${event.date}: ${event.event}`, margin, margin + 150 + index * 10);
      });
    } else {
      pdf.text("No history available.", margin, margin + 150);
    }

    pdf.save(`${employee.firstName}_${employee.lastName}_CV_Generated.pdf`);
  };

  return (
    <Box className="min-h-screen flex flex-col items-center p-8 bg-gray-50">
      <Typography variant="h4" fontWeight="bold" color="#0782F9" gutterBottom>
        CV Preview
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
            Contact Information
          </Typography>
          <Typography variant="subtitle1" sx={{ my: 1 }}>Name: {employee.firstName} {employee.lastName}</Typography>
          <Typography variant="subtitle1" sx={{ my: 1 }}>Phone: {employee.phone}</Typography>
          <Typography variant="subtitle1" sx={{ my: 1 }}>Email: {employee.email}</Typography>
          <Typography variant="subtitle1" sx={{ my: 1 }}>Address: {employee.address}</Typography>

          <Divider sx={{ my: 2 }} />
          <Typography variant="h5" fontWeight="bold" sx={{ borderBottom: '2px solid #0782F9', pb: 1 }}>
            Employee Information
          </Typography>
          <Typography variant="subtitle1" sx={{ my: 1 }}>Job Title: {employee.jobTitle}</Typography>
          <Typography variant="subtitle1" sx={{ my: 1 }}>Department: {employee.department}</Typography>
          <Typography variant="subtitle1" sx={{ my: 1 }}>Start Date: {employee.admissionDate}</Typography>
          <Typography variant="subtitle1" sx={{ my: 1 }}>Status: {employee.isTerminated ? 'Terminated' : 'Active'}</Typography>
          <Typography variant="subtitle1" sx={{ my: 1 }}>ID: {id}</Typography>

          <Divider sx={{ my: 2 }} />
          <Typography variant="h5" fontWeight="bold" sx={{ borderBottom: '2px solid #0782F9', pb: 1 }}>
            History
          </Typography>
          {Array.isArray(employee.history) && employee.history.length > 0 ? (
            employee.history.map((event, index) => (
              <Typography key={index} variant="subtitle1" sx={{ my: 1 }}>
                {event.date}: {event.event}
              </Typography>
            ))
          ) : (
            <Typography variant="subtitle1" sx={{ my: 1 }}>No history available.</Typography>
          )}
        </Paper>
      )}
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleGeneratePDF}
      >
        Download CV
      </Button>
    </Box>
  );
};

export default EmployeeCVPreviewPage;