import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto flex flex-row justify-between py-2 px-4 sm:px-6 lg:px-8">
        <h1 className="text-xs font-bold text-white">金城翔太郎</h1>
        <div className="flex flex-row justify-evenly">
          <a href="https://twitter.com/kinjyo1130" target="_blank" rel="noreferrer">
            <img src="/twitter.svg" alt="Twitter" className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
