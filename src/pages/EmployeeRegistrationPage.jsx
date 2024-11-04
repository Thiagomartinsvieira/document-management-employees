import { useState } from "react";
import { registerEmployee } from "../services/employeeService";
import { useNavigate } from "react-router-dom";

const EmployeeRegistrationPage = () => {
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
        admissionDate: "",
        department: "",
        salary: "",
    });

    const [profilePreview, setProfilePreview] = useState(null);
    const [isRounded, setIsRounded] = useState(false);

    const navigate = useNavigate();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSubmit = { ...formData };

        if (formData.profilePicture) {
            dataToSubmit.profilePicture = formData.profilePicture;
        }

        try {
            await registerEmployee(dataToSubmit);
            alert("Employee registered successfully!");
            setFormData({
                firstName: "",
                lastName: "",
                jobTitle: "",
                address: "",
                phone: "",
                email: "",
                nationality: "",
                birthDate: "",
                profilePicture: null,
                admissionDate: "",
                department: "",
                salary: "",
            });
            setProfilePreview(null);
            navigate('/dashboard');
        } catch (error) {
            console.error("Error registering employee: ", error);
            alert("Error registering employee. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center bg-gray-50 min-h-screen p-8">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                    Employee Registration
                </h2>
                <p className="text-gray-500 mb-6">
                    Enter the employee's information to complete the registration.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-600">
                            Contact Information
                        </h3>
                        <div className="flex items-center mb-4">
                            <div className="flex-1 grid grid-cols-2 gap-4">
                                <div>
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
                                    </div>
                                    <div>
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
                                </div>
                                <div className="ml-4 flex items-center justify-center mx-0">
                                    <div className={`w-24 h-24 ${isRounded ? "rounded-full" : "rounded-lg"} bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-300`}>
                                        {profilePreview ? (
                                            <img
                                                src={profilePreview}
                                                alt="Profile Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-gray-400">Photo</span>
                                        )}
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <label className="block text-gray-600 font-semibold mt-4">
                                            Profile Picture
                                        </label>
                                        <label className="text-cyan-600 cursor-pointer mt-2 hover:underline">
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={handleProfilePictureChange}
                                            />
                                            Add Photo
                                        </label>
                                        <div className="flex items-center space-x-2 mt-4">
                                            <input
                                                type="checkbox"
                                                checked={isRounded}
                                                onChange={toggleRounded}
                                                className="cursor-pointer"
                                            />
                                            <label className="text-gray-600 cursor-pointer">
                                                Rounded Photo
                                            </label>
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
                                <label className="text-gray-600">E-mail</label>
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
                        <h3 className="text-lg font-semibold text-gray-600">
                            Employee Information
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-gray-600">Position</label>
                                <input
                                    type="text"
                                    name="jobTitle"
                                    placeholder="e.g. Manager"
                                    className="input-field"
                                    onChange={handleInputChange}
                                    value={formData.jobTitle}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-gray-600">Admission Date</label>
                                <input
                                    type="date"
                                    name="admissionDate"
                                    className="input-field"
                                    onChange={handleInputChange}
                                    value={formData.admissionDate}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-gray-600">Department</label>
                                <input
                                    type="text"
                                    name="department"
                                    placeholder="e.g. Sales"
                                    className="input-field"
                                    onChange={handleInputChange}
                                    value={formData.department}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-gray-600">Salary</label>
                                <input
                                    type="number"
                                    name="salary"
                                    placeholder="e.g. 3000"
                                    className="input-field"
                                    onChange={handleInputChange}
                                    value={formData.salary}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-200"
                    >
                        Register Employee
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EmployeeRegistrationPage;
