
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import img from '../../assets/images/lo.jpg';
import './nav.css';

const Navbar = ({ onSubmenuClick, userRole, userId }) => {
  const [activeNav, setActiveNav] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const dropdownRef = useRef(null);
  const userMenuRef = useRef(null);

  const allNavItems = [
    {
      title: 'Dashboard',
      image: 'dashboard',
      number: '15',
      submenus: [],
      roles: ['sevak', 'group-sevak', 'samithi']
    },
    {
      title: 'Goda Sevak (गोदा सेवक)',
      image: 'group_add',
      number: '15',
      roles: ['sevak', 'group-sevak', 'samithi'],
      submenus: [
        { 
          name: 'Attendance', 
          path: 'attendance',
          roles: ['group-sevak', 'samithi']
        },
        { 
          name: 'Attendance List', 
          path: 'attendancelist',
          roles: ['sevak', 'group-sevak', 'samithi']
        },
        { 
          name: 'Feedback Form', 
          path: 'feedback',
          roles: ['sevak', 'group-sevak', 'samithi']
        },
        { 
          name: 'Aarti Fromations', 
          path: 'aartifromations',
          roles: ['sevak', 'group-sevak', 'samithi']
        },
        { 
          name: 'Upcoming Event', 
          path: 'upcomingevent',
          roles: ['sevak', 'group-sevak', 'samithi']
        },
      ],
    },
    {
      title: 'Purchase (खरेदी)',
      image: 'manage_search',
      number: '15',
      roles: ['samithi'],
      submenus: [
        { name: 'New Purchase', path: 'newpurchase', roles: ['samithi'] },
        { name: 'Purchase List', path: 'purchaselist', roles: ['samithi'] },
      ],
    },
    // {
    //   title: 'Asset Inventory (मालमत्ता यादी)',
    //   image: 'contract',
    //   number: '15',
    //   roles: ['samithi'],
    //   submenus: [
    //     { name: 'Inventory', path: 'Inventory', roles: ['samithi'] },
    //   ],
    // },
    {
      title: 'Yajman (यजमान)',
      image: 'group',
      number: '15',
      roles: ['samithi'],
      submenus: [
        { name: 'Yajman', path: 'yajman', roles: ['samithi'] },
        { name: 'Yajman Register', path: 'yajmanregister', roles: ['samithi'] },
        { name: 'Todays Yajman', path: 'todaysyajman', roles: ['samithi'] },
        { name: 'Yajman List', path: 'yajmanlist', roles: ['samithi'] },
      ],
    },
    {
      title: 'Finance (आर्थिक व्यवस्था)',
      image: 'contract',
      number: '15',
      roles: ['samithi'],
      submenus: [
        { name: 'Finance', path: 'finance', roles: ['samithi'] },
        { name: 'Vendor Registration', path: 'vendorform', roles: ['samithi'] },
      ],
    },
    {
      title: 'Administration (समिती चे व्यवस्थापन)',
      image: 'assured_workload',
      number: '15',
      roles: ['group-sevak', 'samithi'],
      submenus: [
        { name: 'Add Goda Sevak', path: 'appl', roles: ['samithi'] },
        { name: 'Goda Sevak List', path: 'appllist', roles: ['group-sevak', 'samithi'] },
        { name: 'Event Calendar', path: 'event', roles: ['group-sevak', 'samithi'] },
        { name: 'Feedback Data', path: 'feedbackData', roles: ['group-sevak', 'samithi'] },
      ],
    },
  ];

  const navItems = allNavItems
    .filter(item => item.roles.includes(userRole))
    .map(item => ({
      ...item,
      submenus: item.submenus.filter(submenu => 
        submenu.roles ? submenu.roles.includes(userRole) : true
      )
    }))
    .filter(item => item.submenus.length > 0);

  const handleNavClick = (title) => {
    setActiveNav((prev) => (prev === title ? null : title));
    setActiveSubmenu(null);
  };

  const handleSubmenuClick = (path) => {
    onSubmenuClick(path);
    setActiveNav(null);
    setActiveSubmenu(null);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setActiveNav(null);
      setActiveSubmenu(null);
    }
    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
      setShowUserMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getRoleName = () => {
    switch(userRole) {
      case 'samithi': return 'Samithi';
      case 'group-sevak': return 'Group Sevak';
      default: return 'Sevak';
    }
  };

  return (
    <main className="bg-white shadow relative z-10">
      <nav className='py-2 max-w-screen-xl mx-auto'>
        <div className="flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center">
            <img src={img} alt="AIGUTECH Logo" className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24" />
          </div>
          <marquee behavior="scroll" direction="left" className="w-2/4" scrolldelay="180">
            <p className="color-blue">
            Har Har Goda! Har Har Gange!  Welcome to Godavari Management System.
            </p>
          </marquee>
          <div className="flex items-center space-x-2 lg:space-x-4">
            <div className="relative" ref={userMenuRef}>
              <div className="flex">
                <img
                  src="https://www.svgrepo.com/show/26995/avatar.svg"
                  alt="User"
                  className="h-10 w-10 rounded-full cursor-pointer"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                />
                <div className="admin-seperator">
                  Hello, {getRoleName()} <br/> {userId}
                </div>
              </div>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg border border-gray-100 w-56 z-[1002]">
                  <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg w-full text-left">View Profile</button>
                  <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg w-full text-left">Change Password</button>
                  <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg w-full text-left">Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <nav className="sticky top-0 shadow z-[999]">
        <div className="flex bg-gray-100 justify-between flex-wrap" ref={dropdownRef}>
          {navItems.map((item) => (
            <div key={item.title} className="relative group">
              <button
                onClick={() => handleNavClick(item.title)}
                className={`px-6 py-2 ${
                  activeNav === item.title ? 'text-blue-500' : 'text-gray-900'
                }`}
              >
                <div className="flex flex-col items-start">
                  <div>{item.title}</div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="material-symbols-outlined text-sky-900">
                      {item.image}
                    </span>
                    <span className="text-sm text-gray-500">{item.number}</span>
                    {item.submenus.length > 0 && (
                      <i className={`fa-solid fa-angle-right transition-transform duration-300 ${activeNav === item.title ? 'rotate-90' : ''}`}></i>
                    )}
                  </div>
                </div>
              </button>
              {activeNav === item.title && item.submenus.length > 0 && (
                <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg border border-gray-100 w-56 z-[1001] transition-transform duration-300">
                  {item.submenus.map((submenu) => (
                    <div key={submenu.name}>
                      {submenu.submenus ? (
                        <div>
                          <button
                            onClick={() => setActiveSubmenu((prev) => (prev === submenu.name ? null : submenu.name))}
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg w-full text-left flex justify-between"
                          >
                            {submenu.name}
                            <i
                              className={`fa-solid fa-angle-right transition-transform duration-300 ${activeSubmenu === submenu.name ? 'rotate-90' : ''}`}
                            ></i>
                          </button>
                          {activeSubmenu === submenu.name && (
                            <div className="bg-gray-50">
                              {submenu.submenus.map((nestedSubmenu) => (
                                <button
                                  key={nestedSubmenu.name}
                                  onClick={() => handleSubmenuClick(nestedSubmenu.path)}
                                  className="block pl-8 pr-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg w-full text-left"
                                >
                                  {nestedSubmenu.name}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <button
                          onClick={() => handleSubmenuClick(submenu.path)}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg w-full text-left"
                        >
                          {submenu.name}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </main>
  );
};

export default Navbar;