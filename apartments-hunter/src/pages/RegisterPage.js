import React from 'react';
import RegisterForm from '../components/forms/RegisterForm';
import Navbar from '../components/layout/Navbar';

function RegisterPage() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <RegisterForm />
      </div>
    </>
  );
}

export default RegisterPage;
