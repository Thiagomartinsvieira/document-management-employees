import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "./firebaseConfig";

export const uploadProfilePicture = async (profilePicture) => {
  if (!profilePicture) return ""; 
  try {
    const fileRef = ref(storage, `profilePictures/${profilePicture.name}`);
    await uploadBytes(fileRef, profilePicture); 
    return await getDownloadURL(fileRef); 
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    throw new Error("Could not upload profile picture");
  }
};

export const registerEmployee = async (employeeData) => {
  try {
    const profilePictureUrl = await uploadProfilePicture(employeeData.profilePicture);
    const employeeDoc = {
      ...employeeData,
      profilePictureUrl,
      profilePicture: null, 
    };

    await addDoc(collection(db, "employees"), employeeDoc);
  } catch (error) {
    console.error("Error registering employee:", error);
    throw new Error("Could not register employee");
  }
};

// Função para buscar um funcionário pelo ID
export const fetchEmployeeById = async (employeeId) => {
    try {
      const employeeRef = doc(db, "employees", employeeId); // Obtém a referência do documento
      const employeeSnapshot = await getDoc(employeeRef);
  
      if (employeeSnapshot.exists()) {
        return { id: employeeId, ...employeeSnapshot.data() }; // Retorna os dados do funcionário
      } else {
        throw new Error("Funcionário não encontrado");
      }
    } catch (error) {
      console.error("Erro ao buscar funcionário:", error);
      throw error; // Propaga o erro para ser tratado no componente
    }
  };
  

export const handlePreviewCV = (employee) => {
    return {
      name: `${employee.firstName} ${employee.lastName}`,
      position: employee.position,
      department: employee.department,
      status: employee.isTerminated ? "Demitido" : "Ativo",
    };
  };
  

// Função para atualizar um funcionário
export const updateEmployee = async (employeeId, updatedData) => {
    try {
      const employeeRef = doc(db, "employees", employeeId); // Obtém a referência do documento
  
      await updateDoc(employeeRef, updatedData); // Atualiza os dados no Firestore
  
      return { id: employeeId, ...updatedData }; // Retorna os dados atualizados
    } catch (error) {
      console.error("Erro ao atualizar funcionário:", error);
      throw error; // Propaga o erro para ser tratado no componente
    }
  };