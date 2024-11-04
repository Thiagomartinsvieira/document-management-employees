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
                console.error("Erro ao carregar os dados do funcionário: ", error);
                alert("Erro ao carregar os dados do funcionário.");
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
            alert("Dados do funcionário atualizados com sucesso!");
            navigate('/dashboard');
        } catch (error) {
            console.error("Erro ao atualizar os dados do funcionário: ", error);
            alert("Erro ao atualizar os dados do funcionário. Tente novamente.");
        }
    };

    return (
        <div className="flex flex-col items-center bg-gray-50 min-h-screen p-8">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Editar Funcionário</h2>
                <p className="text-gray-500 mb-6">Atualize as informações do funcionário.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-600">Informação de contato</h3>
                        <div className="flex items-center mb-4">
                            <div className="flex-1 grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-gray-600">Nome</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="ex. Tiago"
                                        className="input-field"
                                        onChange={handleInputChange}
                                        value={formData.firstName}
                                        required
                                    />
                                    <label className="text-gray-600">Sobrenome</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="ex. Souza"
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
                                            <span className="text-gray-400">Foto</span>
                                        )}
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <label className="block text-gray-600 font-semibold mt-4">Foto de perfil</label>
                                        <label className="text-cyan-600 cursor-pointer mt-2 hover:underline">
                                            <input type="file" className="hidden" onChange={handleProfilePictureChange} />
                                            Alterar Foto
                                        </label>
                                        <div className="flex items-center space-x-2 mt-4">
                                            <input
                                                type="checkbox"
                                                checked={isRounded}
                                                onChange={toggleRounded}
                                                className="cursor-pointer"
                                            />
                                            <label className="text-gray-600 cursor-pointer">Foto Arredondada</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-gray-600">Emprego</label>
                                <input
                                    type="text"
                                    name="jobTitle"
                                    placeholder="ex. Vendedor"
                                    className="input-field"
                                    onChange={handleInputChange}
                                    value={formData.jobTitle}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-gray-600">Endereço</label>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="ex. Avenida Paulista, 1234"
                                    className="input-field"
                                    onChange={handleInputChange}
                                    value={formData.address}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-gray-600">Telefone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="ex. (11) 91234-5678"
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
                                    placeholder="ex. tiago.souza@email.com"
                                    className="input-field"
                                    onChange={handleInputChange}
                                    value={formData.email}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-gray-600">Nacionalidade</label>
                                <input
                                    type="text"
                                    name="nationality"
                                    placeholder="ex. Brasileira"
                                    className="input-field"
                                    onChange={handleInputChange}
                                    value={formData.nationality}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-gray-600">Data de nascimento</label>
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
                        <h3 className="text-lg font-semibold text-gray-600">Status do Funcionário</h3>
                        <div className="text-gray-700 font-medium">
                            {formData.isTerminated ? "Funcionário Desligado" : "Funcionário Ativo"}
                        </div>
                        <button
                            type="button"
                            onClick={toggleEmployeeStatus}
                            className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300"
                        >
                            {formData.isTerminated ? "Reativar Funcionário" : "Desligar Funcionário"}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300"
                    >
                        Atualizar Funcionário
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EmployeeEditPage;
