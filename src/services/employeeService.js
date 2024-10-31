import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
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

export const handlePreviewCV = (employee) => {
    return {
      name: `${employee.firstName} ${employee.lastName}`,
      position: employee.position,
      department: employee.department,
      status: employee.isTerminated ? "Demitido" : "Ativo",
    };
  };
  
