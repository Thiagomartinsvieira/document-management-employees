import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchEmployeeById, updateEmployee } from "../services/employeeService";

const EmployeeEditPage = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        jobTitle: "",
        address: "",
        phone: "",
        email: "",
        nationality: "",
        birthDate: "",
        profilePicture: null,
        isTerminated: false
    });

    const [profilePreview, setProfilePreview] = useState(null);
    const [isRounded, setIsRounded] = useState(false);
    const navigate = useNavigate();
    const { employeeId } = useParams();

    useEffect(() => {
        if (!employeeId) {
            console.error("Employee ID is undefined");
            return;
        }
  
        const loadEmployeeData = async () => {
            try {
                const employeeData = await fetchEmployeeById(employeeId);
                setFormData({ ...employeeData });
                setProfilePreview(employeeData.profilePictureUrl || null);
            } catch (error) {
                console.error("Error loading employee data: ", error);
                alert("Error loading employee data.");
            }
        };
  
        loadEmployeeData();
    }, [employeeId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const toggleRounded = () => {
        setIsRounded(!isRounded);
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, profilePicture: file });
            setProfilePreview(URL.createObjectURL(file));
        }
    };

    const toggleEmployeeStatus = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            isTerminated: !prevFormData.isTerminated
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToUpdate = { ...formData };

        try {
            await updateEmployee(employeeId, dataToUpdate);
            alert("Employee data updated successfully!");
            navigate('/dashboard');
        } catch (error) {
            console.error("Error updating employee data: ", error);
            alert("Error updating employee data. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center bg-gray-50 min-h-screen p-8">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Edit Employee</h2>
                <p className="text-gray-500 mb-6">Update employee information.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-600">Contact Information</h3>
                        <div className="flex items-center mb-4">
                            <div className="flex-1 grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-gray-600">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="e.g. Tiago"
                                        className="input-field"
                                        onChange={handleInputChange}
                                        value={formData.firstName}
                                        required
                                    />
                                    <label className="text-gray-600">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="e.g. Souza"
                                        className="input-field"
                                        onChange={handleInputChange}
                                        value={formData.lastName}
                                        required
                                    />
                                </div>
                                <div className="ml-4 flex items-center justify-center">
                                    <div className={`w-24 h-24 ${isRounded ? "rounded-full" : "rounded-lg"} bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-300`}>
                                        {profilePreview ? (
                                            <img src={profilePreview} alt="Profile Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-gray-400">Photo</span>
                                        )}
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <label className="block text-gray-600 font-semibold mt-4">Profile Picture</label>
                                        <label className="text-cyan-600 cursor-pointer mt-2 hover:underline">
                                            <input type="file" className="hidden" onChange={handleProfilePictureChange} />
                                            Change Photo
                                        </label>
                                        <div className="flex items-center space-x-2 mt-4">
                                            <input
                                                type="checkbox"
                                                checked={isRounded}
                                                onChange={toggleRounded}
                                                className="cursor-pointer"
                                            />
                                            <label className="text-gray-600 cursor-pointer">Rounded Photo</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-gray-600">Job Title</label>
                                <input
                                    type="text"
                                    name="jobTitle"
                                    placeholder="e.g. Salesperson"
                                    className="input-field"
                                    onChange={handleInputChange}
                                    value={formData.jobTitle}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-gray-600">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="e.g. Avenida Paulista, 1234"
                                    className="input-field"
                                    onChange={handleInputChange}
                                    value={formData.address}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-gray-600">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="e.g. (11) 91234-5678"
                                    className="input-field"
                                    onChange={handleInputChange}
                                    value={formData.phone}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-gray-600">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="e.g. tiago.souza@email.com"
                                    className="input-field"
                                    onChange={handleInputChange}
                                    value={formData.email}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-gray-600">Nationality</label>
                                <input
                                    type="text"
                                    name="nationality"
                                    placeholder="e.g. Brazilian"
                                    className="input-field"
                                    onChange={handleInputChange}
                                    value={formData.nationality}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-gray-600">Date of Birth</label>
                                <input
                                    type="date"
                                    name="birthDate"
                                    className="input-field"
                                    onChange={handleInputChange}
                                    value={formData.birthDate}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-600">Employee Status</h3>
                        <div className="text-gray-700 font-medium">
                            {formData.isTerminated ? "Employee Terminated" : "Employee Active"}
                        </div>
                        <button
                            type="button"
                            onClick={toggleEmployeeStatus}
                            className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300"
                        >
                            {formData.isTerminated ? "Reactivate Employee" : "Terminate Employee"}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300"
                    >
                        Update Employee
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EmployeeEditPage;
