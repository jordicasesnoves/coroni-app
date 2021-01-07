import React from 'react';
import packageJson from '../../../package.json';

const Footer = (): JSX.Element => {
  return (
    <footer className="flex z-10 mt-8 border-t border-gray-200 bg-white">
      <nav className="flex flex-col text-gray-600 justify-center items-center max-w-6xl p-4 mx-auto">
        <div className="my-2 text-center">
          {packageJson.name} {packageJson.version}
        </div>
        <div className="my-2 text-center">
          © {new Date().getFullYear()} — Web designed & coded by Jordi
          Casesnoves
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
