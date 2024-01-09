import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, remove } from 'firebase/database';


const Articole = () => {
  const [articole, setArticole] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const database = getDatabase();
      const materialeRef = ref(database, 'materiale');

      onValue(materialeRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const materialeArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setArticole(materialeArray);
        } else {
          setArticole([]);
        }
      });
    };

    fetchData();
  }, []);

  const handleDelete = (id) => {
    const database = getDatabase();
    const materialeRef = ref(database, `materiale/${id}`);

    remove(materialeRef)
      .then(() => {
        setArticole((prevArticole) => prevArticole.filter((articol) => articol.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting article:', error.message);
      });
  };

  return (
    <div className="max-w-screen-md mx-auto mt-8">
      <h1 className="text-3xl font-bold text-center mb-4">Articole</h1>
      <table className="min-w-full bg-white border rounded shadow">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Titlu</th>
            <th className="py-2 px-4 border">Tema</th>
            <th className="py-2 px-4 border">Link</th>
            <th className="py-2 px-4 border">Categorie</th>
            <th className="py-2 px-4 border">Tip</th>
            <th className="py-2 px-4 border">Sterge</th>
          </tr>
        </thead>
        <tbody>
          {articole.map((articol, index) => (
            <tr
              key={articol.id}
              className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-25'}
            >
              <td className="py-3 px-6 text-left">{articol.titlu}</td>
              <td className="py-3 px-6 text-left">{articol.tema}</td>
              <td className="py-3 px-6 text-center">
                <a
                  href={articol.link}
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {articol.link}
                </a>
              </td>
              <td className="py-3 px-6 text-left">
                {Array.isArray(articol.tags) ? (
                  articol.tags.map((tag) => (
                    <span key={tag} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      {tag}
                    </span>
                  ))
                ) : (
                  articol.tags
                )}
              </td>
              <td className="py-3 px-6 text-left">{articol.tip}</td>
              <td className="py-3 px-6 text-left">
                <button
                  onClick={() => handleDelete(articol.id)}
                  className="bg-red-500 text-white py-1 px-2 rounded cursor-pointer"
                >
                  Sterge
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Articole;
