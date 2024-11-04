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

export const fetchEmployeeById = async (employeeId) => {
  if (!employeeId) {
      throw new Error("Invalid employee ID");
  }
  try {
      const employeeRef = doc(db, "employees", employeeId);
      const employeeSnapshot = await getDoc(employeeRef);

      if (employeeSnapshot.exists()) {
          return { id: employeeId, ...employeeSnapshot.data() };
      } else {
          throw new Error("Funcionário não encontrado");
      }
  } catch (error) {
      console.error("Erro ao buscar funcionário:", error);
      throw error;
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
  

export const updateEmployee = async (employeeId, updatedData) => {
    try {
      const employeeRef = doc(db, "employees", employeeId); 
  
      await updateDoc(employeeRef, updatedData);
  
      return { id: employeeId, ...updatedData }; 
    } catch (error) {
      console.error("Erro ao atualizar funcionário:", error);
      throw error; 
    }
  };