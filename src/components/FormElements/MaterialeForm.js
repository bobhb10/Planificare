import { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { getDatabase, push, ref, onValue } from 'firebase/database';

const MaterialeForm = () => {
    const [successMessage, setSuccessMessage] = useState(null);
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        // Fetch categories from the 'categorii' node in the database
        const database = getDatabase();
        const categoriiRef = ref(database, 'categorii');

        onValue(categoriiRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Convert the object of categories to an array of options
                const categoryOptions = Object.keys(data).map((category) => ({
                    value: category,
                    label: category,
                }));
                console.log('Category Options:', categoryOptions); // Log created options
                setCategories(categoryOptions);
            } else {
                setCategories([]);
            }
        });
    }, []);




    const initialValues = {
        titlu: '',
        tema: '',
        link: '',
        chips: [],
        tip: [],
    };

    const validationSchema = Yup.object({
        titlu: Yup.string().required('Introduceti titlul temei'),
        tema: Yup.string().required('Introduceti tema'),
        link: Yup.string().required('Introduceti linkul'),
        chips: Yup.array().min(1, 'Selectati cel putin o singura categorie'),
        tip: Yup.mixed().required("Introduceti tipul temei")
    });

    const handleSubmmit = (values, { resetForm }) => {
        const database = getDatabase();
        const materialsRef = ref(database, 'materiale');
        const selectedChipValues = values.chips.map((chip) => chip.value);

        push(materialsRef, {
            titlu: values.titlu,
            tema: values.tema,
            link: values.link,
            tags: selectedChipValues,
            tip: values.tip.value,
        })
            .then(() => {
                setSuccessMessage('Successfully added!');
                resetForm();
                setTimeout(() => setSuccessMessage(null), 5000);
            })
            .catch((error) => {
                console.error('Error adding material:', error.message);
            });
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmmit}>
            <Form className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-md">
                <div>
                    <label htmlFor="titlu" className="block text-gray-600 text-sm font-semibold mb-2">Titlu</label>
                    <Field type="text" id="titlu" name="titlu" className="w-full p-2 border rounded focus:outline-none focus:border-blue-500" />
                    <ErrorMessage name="titlu" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div className="mb-4">
                    <label htmlFor="tema" className="block text-gray-600 text-sm font-semibold mb-2">
                        Tema
                    </label>
                    <Field
                        type="text"
                        id="tema"
                        name="tema"
                        className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                    />
                    <ErrorMessage name="tema" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div className="mb-4">
                    <label htmlFor="link" className="block text-gray-600 text-sm font-semibold mb-2">
                        Link Material
                    </label>
                    <Field
                        type="text"
                        id="link"
                        name="link"
                        className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                    />
                    <ErrorMessage name="link" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div className="mb-4">
                    <label htmlFor="chips" className="block text-gray-600 text-sm font-semibold mb-2">
                        Categorie
                    </label>
                    <Field
                        name="chips"
                        component={({ field, form }) => (
                            <Select
                                options={categories}
                                isMulti
                                onChange={(selectedOptions) => form.setFieldValue(field.name, selectedOptions)}
                                onBlur={field.onBlur}
                                value={field.value}
                                className="w-full"
                            />
                        )}
                    />
                    <ErrorMessage name="chips" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div className="mb-4">
                    <label htmlFor="tip" className="block text-gray-600 text-sm font-semibold mb-2">
                        Tipul Temei
                    </label>
                    <Field name="tip" component={({ field, form }) => <Select
                        options={[
                            { value: "Material Video", label: "Material Video" },
                            { value: "Text", label: "Text" }
                        ]}
                        onChange={(selectedOptions) => form.setFieldValue(field.name, selectedOptions)}
                        value={field.value}
                    />} />
                    <ErrorMessage name="tip" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div className="mb-4">
                    <button type="submit" className="                                                                                       ">Submit</button>
                </div>
                {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
            </Form>
        </Formik>

    );
}

export default MaterialeForm;