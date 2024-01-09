import React from 'react';
import { ErrorMessage } from 'formik';

const WeekdayPicker = ({ field, form }) => {
  const weekdays = ['Marti', 'Miercuri', 'Joi', 'Vineri', 'Sambata', 'Duminica'];

  const handleToggle = (day) => {
    const isDaySelected = field.value.includes(day);
    const updatedDays = isDaySelected
      ? field.value.filter((selectedDay) => selectedDay !== day)
      : [...field.value, day];

    form.setFieldValue(field.name, updatedDays);
  };

  return (
    <div className="mb-4">
      <label htmlFor={field.name} className="block text-gray-600 text-sm font-semibold mb-2">
        Select Days
      </label>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600 text-sm font-semibold mb-2">Dimineața, ora 9:30</p>
          {weekdays.map((day) => (
            <div key={day} className="flex items-center">
              <input
                type="checkbox"
                id={`${day}-morning`}
                name={field.name}
                value={`${day}-morning`}
                checked={field.value.includes(`${day}-morning`)}
                onChange={() => handleToggle(`${day}-morning`)}
                className="mr-2"
              />
              <label htmlFor={`${day}-morning`}>{day.slice(0, 3)}</label>
            </div>
          ))}
        </div>
        <div>
          <p className="text-gray-600 text-sm font-semibold mb-2">După-amiaza, ora 17:00 (Joi și Vineri)</p>
          {weekdays.map((day) => (
            <div key={day} className="flex items-center">
              {['Joi', 'Vineri'].includes(day) && (
                <input
                  type="checkbox"
                  id={`${day}-afternoon`}
                  name={field.name}
                  value={`${day}-afternoon`}
                  checked={field.value.includes(`${day}-afternoon`)}
                  onChange={() => handleToggle(`${day}-afternoon`)}
                  className="mr-2"
                />
              )}
              {['Joi', 'Vineri'].includes(day) && <label htmlFor={`${day}-afternoon`}>{day.slice(0, 3)}</label>}
            </div>
          ))}
        </div>
      </div>
      <ErrorMessage name={field.name} component="div" className="text-red-500 text-sm mt-1" />
    </div>
  );
};

export default WeekdayPicker;
