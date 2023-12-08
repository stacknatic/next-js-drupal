// components/Navbar.tsx
import React from 'react';

const DesktopMenu: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-white">Logo</div>

          <div className="flex space-x-4">
            <a href="#" className="text-white">About</a>
            <a href="#" className="text-white">Contact</a>

            {/* Mega Menu for Pages */}
            <div className="group relative inline-block text-white">
              <span className="cursor-pointer">Pages</span>
              <div className="hidden group-hover:block absolute top-full left-0 bg-gray-800 p-4">
                {/* Mega Menu Content for Pages */}
                <div className="grid grid-cols-2 gap-4">
                  <a href="#" className="text-primary-500">Page 1</a>
                  <a href="#" className="text-primary-500">Page 2</a>
                  {/* Add more pages as needed */}
                </div>
              </div>
            </div>

            {/* Mega Menu for Resources */}
            <div className="group relative inline-block text-white">
              <span className="cursor-pointer">Resources</span>
              <div className="hidden group-hover:block absolute top-full left-0 bg-gray-800 p-4">
                {/* Mega Menu Content for Resources */}
                <div className="grid grid-cols-2 gap-4">
                  <a href="#" className="text-white">Resource 1</a>
                  <a href="#" className="text-white">Resource 2</a>
                  {/* Add more resources as needed */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DesktopMenu;
