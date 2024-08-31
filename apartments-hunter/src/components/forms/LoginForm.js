import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      password: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
    }),
    onSubmit: async (values) => {
      await login(values.username, values.password);
      navigate('/dashboard');
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
      <h2 className="text-2xl font-bold mb-6 text-center">Logowanie</h2>
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>  {/* Zmiana na `username` */}
        <input
          id="username"
          type="text"
          {...formik.getFieldProps('username')}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {formik.touched.username && formik.errors.username ? (
          <div className="text-red-500 text-sm">{formik.errors.username}</div>
        ) : null}
      </div>
      <div className="mb-6">
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
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Zaloguj się</button>
    </form>
  );
}

export default LoginForm;
