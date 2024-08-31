import React from 'react';
import { useFormik } from 'formik';

function FilterForm({ onFilter }) {
  const formik = useFormik({
    initialValues: {
      city: '',
      price: '',
      area: '',
      standard: '',
      district: '',
    },
    onSubmit: (values) => {
      onFilter(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">Miasto</label>
        <input
          id="city"
          type="text"
          {...formik.getFieldProps('city')}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Cena</label>
        <input
          id="price"
          type="number"
          {...formik.getFieldProps('price')}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="area" className="block text-sm font-medium text-gray-700">Powierzchnia</label>
        <input
          id="area"
          type="number"
          {...formik.getFieldProps('area')}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="standard" className="block text-sm font-medium text-gray-700">Standard</label>
        <input
          id="standard"
          type="text"
          {...formik.getFieldProps('standard')}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="district" className="block text-sm font-medium text-gray-700">Dzielnica</label>
        <input
          id="district"
          type="text"
          {...formik.getFieldProps('district')}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Subskrybuj</button>
    </form>
  );
}

export default FilterForm;
