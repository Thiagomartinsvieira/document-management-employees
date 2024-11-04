import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  IconButton,
  Modal,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

const DashboardPage = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    const employeesCollection = collection(db, "employees");
    const employeeSnapshot = await getDocs(employeesCollection);
    const employeeList = employeeSnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .sort((a, b) => {
        return a.isTerminated === b.isTerminated ? 0 : a.isTerminated ? 1 : -1;
      });
    setEmployees(employeeList);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleOpenModal = (employee) => {
    setSelectedEmployee({
      ...employee,
      position: employee.jobTitle || "",  
      department: employee.department || "",
      salary: employee.salary || "", 
    });
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setSelectedEmployee(null);
    setIsModalOpen(false);
  };

  const handlePromoteEmployee = async () => {
    if (!selectedEmployee) return;
    
    const { position, department, salary } = selectedEmployee;
  
    if (position === undefined || department === undefined || salary === undefined) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
  
    try {
      await updateDoc(doc(db, "employees", selectedEmployee.id), {
        position,
        department,
        salary,
      });
      alert("Funcionário atualizado com sucesso!");
      fetchEmployees();
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao atualizar funcionário:", error);
      alert("Não foi possível atualizar o funcionário.");
    }
  };
  

  const handleTerminateEmployee = async (employee) => {
    try {
      await updateDoc(doc(db, "employees", employee.id), {
        isTerminated: true,
      });
      fetchEmployees();
      alert("Funcionário demitido com sucesso!");
    } catch (error) {
      console.error("Erro ao demitir funcionário:", error);
      alert("Não foi possível demitir o funcionário.");
    }
  };

  const handleDeleteEmployee = async (id) => {
    await deleteDoc(doc(db, "employees", id));
    fetchEmployees();
    alert("Funcionário excluído com sucesso!");
  };

  const handleEditEmployee = (id) => {
    navigate(`/edit-employee/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold text-cyan-800 mb-8">
        Employee Dashboard
      </h1>

      <Link to="/register-employee">
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 4, bgcolor: "cyan" }}
        >
          Add Employee
        </Button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className={`employee-card bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center transition duration-300 transform hover:-translate-y-2 ${
              employee.isTerminated ? "opacity-50" : ""
            }`}
          >
            <img
              src={employee.profilePictureUrl || "/images/default-avatar.png"}
              alt="Employee Avatar"
              className="w-24 h-24 rounded-full mb-4 border-4 border-cyan-800"
            />
            <h2 className="text-xl font-semibold text-cyan-800 mb-1">
              {employee.firstName} {employee.lastName}
            </h2>
            <p className="text-sm font-medium text-gray-500 mb-2">
              Cargo: {employee.jobTitle}
            </p>
            <p className="text-xs text-gray-400 mb-4">
              Setor: {employee.department}
            </p>

            {employee.isTerminated && (
              <p className="text-red-500 font-semibold mb-2">Demitido</p>
            )}

            <div className="flex space-x-2 mt-4">
              <Button
                onClick={() => handleOpenModal(employee)}
                variant="outlined"
                color="info"
              >
                Promote
              </Button>
              <IconButton
                onClick={() => handleEditEmployee(employee.id)}
                color="success"
              >
                <EditIcon />
              </IconButton>

              <IconButton
                onClick={() => handleDeleteEmployee(employee.id)}
                color="warning"
              >
                <DeleteIcon />
              </IconButton>
              <Link
                to={`/employee-cv-preview/${employee.id}`}
                state={{ employee }}
              >
                <IconButton color="primary">
                  <SaveAltIcon />
                </IconButton>
              </Link>
              <Button
                onClick={() => handleTerminateEmployee(employee)}
                variant="outlined"
                color="error"
              >
                Dismiss
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" mb={2}>
            Atualizar Funcionário
          </Typography>
          <TextField
            label="Cargo"
            value={selectedEmployee?.position || ""}
            onChange={(e) =>
              setSelectedEmployee({
                ...selectedEmployee,
                position: e.target.value || "", // Garante que position não seja undefined
              })
            }
            fullWidth
            margin="normal"
          />

          <TextField
            label="Setor"
            value={selectedEmployee?.department || ""}
            onChange={(e) =>
              setSelectedEmployee({
                ...selectedEmployee,
                department: e.target.value || "",
              })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Salary"
            value={selectedEmployee?.salary || ""}
            onChange={(e) =>
              setSelectedEmployee({
                ...selectedEmployee,
                salary: e.target.value || "",
              })
            }
            fullWidth
            margin="normal"
          />

          <Button
            onClick={handlePromoteEmployee}
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Atualizar Cargo e Setor
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default DashboardPage;
