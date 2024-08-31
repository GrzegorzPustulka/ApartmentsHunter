import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function RegisterForm() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      const status = await register(values.email, values.password);
      if (status === 201) {  // Zakładając, że 201 jest kodem odpowiedzi na sukces
        navigate('/');
      } else {
        // Obsługa innych statusów, np. wyświetlenie komunikatu o błędzie
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
      <h2 className="text-2xl font-bold mb-6 text-center">Rejestracja</h2>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          {...formik.getFieldProps('email')}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        ) : null}
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Hasło</label>
        <input
          id="password"
          type="password"
          {...formik.getFieldProps('password')}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
        ) : null}
      </div>
      <div className="mb-6">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Potwierdź Hasło</label>
        <input
          id="confirmPassword"
          type="password"
          {...formik.getFieldProps('confirmPassword')}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
        ) : null}
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Zarejestruj się</button>
    </form>
  );
}

export default RegisterForm;
