import React, { Fragment, useState, useRef } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { FaAngleDown } from 'react-icons/fa';

interface MenuItemProps {
  id?: string;
  name?: string;
  item?: string;
}

interface DropDownMenuProps {
  name: string;
  menuItems?: MenuItemProps[];
  handleFilter?: (item: string) => void;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function DropDownMenu({
  name,
  menuItems,
  handleFilter,
}: DropDownMenuProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    setIsOpen(true);
    if (closeTimeoutRef.current !== null) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 100); // Adjust the delay time as needed
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
    if (closeTimeoutRef.current !== null) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Menu.Button
          onClick={handleClick}
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-gray-300 hover:bg-gray-50 ring-1 ring-inset"
        >
          {name}
          <FaAngleDown className="-mr-1 h-5 w-5 mt-1" aria-hidden="true" />
        </Menu.Button>

      <Transition
        show={isOpen}
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        >
        <Menu.Items className="absolute left-0 right-3 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {menuItems?.map((item) => (
              <Menu.Item key={item?.id}>
                {({ active }) => (
                  <button
                  className={classNames(
                    active ? 'bg-primary-500 w-full text-white text-left' : 'text-gray-700',
                    'block px-4 py-2 text-sm w-full text-left'
                    )}
                    onClick={() => {
                      handleFilter?.(item?.name);
                      setIsOpen(false);
                    }}
                    >
                    {item?.name}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
      </div>
    </Menu>
  );
}

