import { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import WeekdayPicker from './WeekdayPicker';
import { getDatabase, push, ref } from 'firebase/database';


const DisponibilitateForm = () => {

  const [successMessage, setSuccessMessage] = useState(null);
  const initialValues = {
    numele: '',
    telefon: '',
    email: '',
    disponibilitate: [],
  };

  const validationSchema = Yup.object({
    numele: Yup.string().required('Introduceti numele'),
    telefon: Yup.string().required('Introduceti numarul de telefon'),
    email: Yup.string().email('Format de email invalid').required('Introduceti emailul'),
    disponibilitate: Yup.array().min(1, 'Selectati cel putin o zi de disponibilitate'),
  });

  const handleSubmmit = (values, { resetForm }) => {
    const database = getDatabase();
    const disponibilitateRef = ref(database, 'disponibilitate');
    const morningDays = ['Luni-morning', 'Marti-morning', 'Miercuri-morning', 'Joi-morning', 'Vineri-morning', 'Sambata-morning', 'Duminica-morning'];
    const afternoonDays = ['Luni-afternoon', 'Marti-afternoon', 'Miercuri-afternoon', 'Joi-afternoon', 'Vineri-afternoon', 'Sambata-afternoon', 'Duminica-afternoon'];
    const morning = morningDays.map(day => values.disponibilitate.includes(day) ? 1 : 0);
    const afternoon = afternoonDays.map(day => values.disponibilitate.includes(day) ? 1 : 0);

    push(disponibilitateRef, {
      nume: values.numele,
      numarTelefon: values.telefon,
      email: values.email,
      disponibilitate: { morning, afternoon },
    })
      .then(() => {
        setSuccessMessage('Successfully added!');
        console.log(values.disponibilitate);
        resetForm();
        setTimeout(() => setSuccessMessage(null), 5000);
      })
      .catch((error) => {
        console.error('Error adding disponibilitate:', error.message);
      });
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmmit}>
      {({ values, setFieldValue }) => (
        <Form className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-md">
          <div className="mb-4">
            <label htmlFor="numele" className="block text-gray-600 text-sm font-semibold mb-2">
              Numele
            </label>
            <Field
              type="text"
              id="numele"
              name="numele"
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            />
            <ErrorMessage name="numele" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div className="mb-4">
            <label htmlFor="telefon" className="block text-gray-600 text-sm font-semibold mb-2">
              Numar de Telefon
            </label>
            <Field
              type="text"
              id="telefon"
              name="telefon"
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            />
            <ErrorMessage name="telefon" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 text-sm font-semibold mb-2">
              Email
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <Field name="disponibilitate" component={WeekdayPicker} />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
            >
              Submit
            </button>
          </div>
          {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
        </Form>
      )}
    </Formik>
  );
};

export default DisponibilitateForm;