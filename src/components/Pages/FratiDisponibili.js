import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, update, remove } from 'firebase/database';
import WeekdayPicker from '../FormElements/WeekdayPicker';

const FratiDisponibili = () => {
    const [brothersData, setBrothersData] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [selectedBrother, setSelectedBrother] = useState({
        name: '',
        disponibility: { morning: [], afternoon: [] }, // Ensure disponibilitate is initialized as an object with morning and afternoon arrays
        email: '',
        phoneNumber: '',
    });


    useEffect(() => {
        const fetchData = async () => {
            const database = getDatabase();
            const disponibilityRef = ref(database, 'disponibilitate');

            onValue(disponibilityRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const brothersArray = Object.values(data).map((brother) => ({
                        name: brother.nume,
                        disponibility: brother.disponibilitate,
                        email: brother.email,
                        phoneNumber: brother.numarTelefon,
                    }));
                    setBrothersData(brothersArray);
                } else {
                    setBrothersData([]);
                }
            });
        };

        fetchData();
    }, []);

    const getAvailableDays = (disponibility) => {
        const morningDays = ['Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri', 'Sambata', 'Duminica'];
        const afternoonDays = ['Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri', 'Sambata', 'Duminica'];

        const morningAvailability = disponibility.morning
            .map((available, index) => (available ? morningDays[index] : null))
            .filter((day) => day !== null);

        const afternoonAvailability = disponibility.afternoon
            .map((available, index) => (available ? afternoonDays[index] : null))
            .filter((day) => day !== null);

        return {
            morning: morningAvailability,
            afternoon: afternoonAvailability,
        };
    };

    const handleDelete = (id) => {
        const database = getDatabase();
        const disponibilityRef = ref(database, `disponibilitate/${id}`);
        remove(disponibilityRef);
    };

    const handleEdit = (brother) => {
        setSelectedBrother(brother);
        setEditMode(true);
    };

    const handleSaveEdit = () => {
        // Implement logic to save the edited disponibilitate data
        // You can use the update function from Firebase
        const { id, ...editedData } = selectedBrother;
        const database = getDatabase();
        const disponibilityRef = ref(database, `disponibilitate/${id}`);
        update(disponibilityRef, editedData);

        // Reset state after saving
        setSelectedBrother(null);
        setEditMode(false);
    };

    const handleCancelEdit = () => {
        // Reset state if edit is canceled
        setSelectedBrother(null);
        setEditMode(false);
    };

    

    return (
        <div className="max-w-4xl mx-auto mt-8">
            <table className="min-w-full bg-white border rounded shadow">
                <thead>
                    <tr>
                        <th className="py-3 px-4 text-left bg-gray-100">Numele</th>
                        <th className="py-3 px-4 text-left bg-gray-100">Dimineață</th>
                        <th className="py-3 px-4 text-left bg-gray-100">După-amiază</th>
                        <th className="py-3 px-4 text-left bg-gray-100">Email</th>
                        <th className="py-3 px-4 text-left bg-gray-100">Numar de Telefon</th>
                        <th className="py-3 px-4 text-left bg-gray-100">Acțiuni</th>
                    </tr>
                </thead>
                <tbody>
                    {brothersData.map((brother, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                            <td className="py-3 px-4">{brother.name}</td>
                            <td className="py-3 px-4">{getAvailableDays(brother.disponibility).morning.join(', ')}</td>
                            <td className="py-3 px-4">{getAvailableDays(brother.disponibility).afternoon.join(', ')}</td>
                            <td className="py-3 px-4">{brother.email}</td>
                            <td className="py-3 px-4">{brother.phoneNumber}</td>
                            <td className="py-3 px-4">
                                <button
                                    onClick={() => handleEdit(brother)}
                                    className="bg-blue-500 text-white py-1 px-2 rounded cursor-pointer mr-2"
                                >
                                    Modifica
                                </button>
                                <button
                                    onClick={() => handleDelete(brother.id)}
                                    className="bg-red-500 text-white py-1 px-2 rounded cursor-pointer"
                                >
                                    Sterge
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editMode && selectedBrother && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="bg-white p-4 rounded shadow">
                        {/* Add your edit form or modal here */}
                        <h2 className="text-2xl font-bold mb-4">Modifică informații</h2>
                        <label className="block mb-2" htmlFor="editName">
                            Nume:
                            <input
                                type="text"
                                id="editName"
                                value={selectedBrother.name}
                                onChange={(e) => setSelectedBrother({ ...selectedBrother, name: e.target.value })}
                                className="border w-full p-2"
                            />
                        </label>
                        <label className="block mb-2" htmlFor="editEmail">
                            Email:
                            <input
                                type="text"
                                id="editEmail"
                                value={selectedBrother.email}
                                onChange={(e) => setSelectedBrother({ ...selectedBrother, email: e.target.value })}
                                className="border w-full p-2"
                            />
                        </label>
                        <label className="block mb-2" htmlFor="editPhoneNumber">
                            Numar de Telefon:
                            <input
                                type="text"
                                id="editPhoneNumber"
                                value={selectedBrother.phoneNumber}
                                onChange={(e) => setSelectedBrother({ ...selectedBrother, phoneNumber: e.target.value })}
                                className="border w-full p-2"
                            />
                        </label>
                        <label className="block mb-2" htmlFor="editDisponibilitate">
                            Disponibilitate:
                        </label>
                
                        <div className="flex justify-end">
                            <button onClick={handleSaveEdit} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                                Salveaza
                            </button>
                            <button onClick={handleCancelEdit} className="bg-gray-500 text-white px-4 py-2 rounded">
                                Anuleaza
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FratiDisponibili;
