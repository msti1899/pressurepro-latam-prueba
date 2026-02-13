import React from 'react';
import Link from 'next/link';

function Error({ statusCode }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary-black text-white p-4 text-center">
      <h1 className="text-6xl font-bold mb-4 gradient-text">
        {statusCode ? `${statusCode}` : 'Error'}
      </h1>
      <p className="text-xl mb-8">
        {statusCode
          ? `Ocurrió un error ${statusCode} en el servidor`
          : 'Ocurrió un error en el cliente'}
      </p>
      
      <Link href="/" className="bg-[#323F5D] hover:bg-[#4C5B7A] text-white py-3 px-8 rounded-full transition-colors">
        Volver al Inicio
      </Link>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
