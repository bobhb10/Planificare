import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, remove, update, push } from 'firebase/database';

const Categorii = () => {
    const [categories, setCategories] = useState([]);
    const [editingCategory, setEditingCategory] = useState(null);
    const [newCategoryText, setNewCategoryText] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const database = getDatabase();
            const categoriiRef = ref(database, 'categorii');

            onValue(categoriiRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const categoriesArray = Object.keys(data);
                    setCategories(categoriesArray);
                } else {
                    setCategories([]);
                }
            });
        };

        fetchData();
    }, []);

    const handleDelete = (category) => {
        const database = getDatabase();
        const categoriiRef = ref(database, 'categorii');

        update(categoriiRef, {
            [category]: null,
        }).then(() => {
            setCategories((prevCategories) => prevCategories.filter((c) => c !== category));
        }).catch((error) => {
            console.error('Error deleting category:', error.message);
        });
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setNewCategoryText(category);
    };

    const handleSaveEdit = () => {
        // Update the category in the state
        setCategories((prevCategories) => prevCategories.map((c) => (c === editingCategory ? newCategoryText : c)));

        // Update the category in the Firebase database using the correct key (editingCategory)
        const database = getDatabase();
        const categoriiRef = ref(database, 'categorii');

        update(categoriiRef, {
            [editingCategory]: true, // Use true as the value, as it's not relevant for categories
        }).then(() => {
            // After updating, reset the editing state
            setEditingCategory(null);
            setNewCategoryText('');
        }).catch((error) => {
            console.error('Error updating category:', error.message);
        });
    };

    const handleCancelEdit = () => {
        setEditingCategory(null);
        setNewCategoryText('');
    };

    const handleAddCategory = () => {
  const database = getDatabase();
  const categoriiRef = ref(database, 'categorii');
  const newCategoryKey = newCategoryText;

  update(categoriiRef, {
    [newCategoryKey]: true,
  }).then(() => {
    setCategories((prevCategories) => [...prevCategories, newCategoryText]);
    setNewCategoryText('');
  }).catch((error) => {
    console.error('Error adding category:', error.message);
  });
};



    return (
        <div>
            
            <table className="min-w-full bg-white border  rounded shadow mt-6 mb-6">
                <thead >
                    <tr>
                        <th className="py-3 px-4 text-left bg-gray-100">Categorie</th>
                        <th className="py-3 px-4 text-center bg-gray-100">Edit</th>
                        <th className="py-3 px-4 text-center bg-gray-100">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) => (
                        <tr key={category} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                            <td className="py-2 px-4 ">{category}</td>
                            <td className="py-2 px-4 text-center">
                                <button
                                    onClick={() => handleEdit(category)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
                                >
                                    Edit
                                </button>
                            </td>
                            <td className="py-2 px-4 text-center">
                                <button
                                    onClick={() => handleDelete(category)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded"
                                >
                                    Delete
                                </button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

            {editingCategory === null ? (
                <div>
                    <input
                        type="text"
                        value={newCategoryText}
                        onChange={(e) => setNewCategoryText(e.target.value)}
                        className="border border-gray-500 p-1 m-1 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <button onClick={handleAddCategory} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">Add Category</button>
                </div>
            ) : (
                <div >
                    <input
                        type="text"
                        value={newCategoryText}
                        onChange={(e) => setNewCategoryText(e.target.value)}
                        className="border border-gray-500 p-2 m-1 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                        <button onClick={handleSaveEdit} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded ml-2">Save</button>
                        <button onClick={handleCancelEdit} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded ml-2">Cancel</button>
                </div>
            )}
        </div>
    );
};

export default Categorii;
