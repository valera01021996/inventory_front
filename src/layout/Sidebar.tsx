// src/components/Sidebar.tsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router";

const ServersIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 7H18.01M15 7H15.01M18 17H18.01M15 17H15.01M6 10H18C18.9319 10 19.3978 10 19.7654 9.84776C20.2554 9.64477 20.6448 9.25542 20.8478 8.76537C21 8.39782 21 7.93188 21 7C21 6.06812 21 5.60218 20.8478 5.23463C20.6448 4.74458 20.2554 4.35523 19.7654 4.15224C19.3978 4 18.9319 4 18 4H6C5.06812 4 4.60218 4 4.23463 4.15224C3.74458 4.35523 3.35523 4.74458 3.15224 5.23463C3 5.60218 3 6.06812 3 7C3 7.93188 3 8.39782 3.15224 8.76537C3.35523 9.25542 3.74458 9.64477 4.23463 9.84776C4.60218 10 5.06812 10 6 10ZM6 20H18C18.9319 20 19.3978 20 19.7654 19.8478C20.2554 19.6448 20.6448 19.2554 20.8478 18.7654C21 18.3978 21 17.9319 21 17C21 16.0681 21 15.6022 20.8478 15.2346C20.6448 14.7446 20.2554 14.3552 19.7654 14.1522C19.3978 14 18.9319 14 18 14H6C5.06812 14 4.60218 14 4.23463 14.1522C3.74458 14.3552 3.35523 14.7446 3.15224 15.2346C3 15.6022 3 16.0681 3 17C3 17.9319 3 18.3978 3.15224 18.7654C3.35523 19.2554 3.74458 19.6448 4.23463 19.8478C4.60218 20 5.06812 20 6 20Z" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const RacksIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 8H17.8174M21 12H18M21 16H17.8174M6.18257 8H3M8 6.18257V3M8 21L8 17.8174M12 6V3M12 21V18M16 6.18257V3M16 21V17.8174M6 12H3M6.18257 16H3M10.8 18H13.2C14.8802 18 15.7202 18 16.362 17.673C16.9265 17.3854 17.3854 16.9265 17.673 16.362C18 15.7202 18 14.8802 18 13.2V10.8C18 9.11984 18 8.27976 17.673 7.63803C17.3854 7.07354 16.9265 6.6146 16.362 6.32698C15.7202 6 14.8802 6 13.2 6H10.8C9.11984 6 8.27976 6 7.63803 6.32698C7.07354 6.6146 6.6146 7.07354 6.32698 7.63803C6 8.27976 6 9.11984 6 10.8V13.2C6 14.8802 6 15.7202 6.32698 16.362C6.6146 16.9265 7.07354 17.3854 7.63803 17.673C8.27976 18 9.11984 18 10.8 18ZM10 10H14V14H10V10Z" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const NetworksIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 15V9M7.41604 11.0005C7.14845 10.388 7 9.71159 7 9.00049C7 7.87466 7.37209 6.83574 8 6M16.584 11.0005C16.8516 10.388 17 9.71159 17 9.00049C17 7.87466 16.6279 6.83574 16 6M18.7083 3C20.1334 4.59227 21 6.69494 21 9C21 9.68739 20.9229 10.3568 20.777 11M5.29168 3C3.86656 4.59227 3 6.69494 3 9C3 9.68739 3.07706 10.3568 3.22302 11M6 18H6.01M9 18H9.01M12 18H12.01M18 15.0001C18.9319 15.0001 19.3978 15 19.7654 15.1522C20.2554 15.3552 20.6448 15.7446 20.8478 16.2346C21 16.6022 21 17.0681 21 18C21 18.9319 21 19.3978 20.8478 19.7654C20.6448 20.2554 20.2554 20.6448 19.7654 20.8478C19.3978 21 18.9319 21 18 21H6C5.06812 21 4.60218 21 4.23463 20.8478C3.74458 20.6448 3.35523 20.2554 3.15224 19.7654C3 19.3978 3 18.9319 3 18C3 17.0681 3 16.6022 3.15224 16.2346C3.35523 15.7446 3.74458 15.3552 4.23463 15.1522C4.59855 15.0015 5.05894 15 5.97256 15C9.98171 15 13.9909 15 18 15.0001Z" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const EquipmentsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 21H17M6.2 17H17.8C18.9201 17 19.4802 17 19.908 16.782C20.2843 16.5903 20.5903 16.2843 20.782 15.908C21 15.4802 21 14.9201 21 13.8V6.2C21 5.0799 21 4.51984 20.782 4.09202C20.5903 3.71569 20.2843 3.40973 19.908 3.21799C19.4802 3 18.9201 3 17.8 3H6.2C5.0799 3 4.51984 3 4.09202 3.21799C3.71569 3.40973 3.40973 3.71569 3.21799 4.09202C3 4.51984 3 5.07989 3 6.2V13.8C3 14.9201 3 15.4802 3.21799 15.908C3.40973 16.2843 3.71569 16.5903 4.09202 16.782C4.51984 17 5.07989 17 6.2 17Z" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const TemplatesIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H12M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19M19 9V10M16 14H21V21L18.5 19.611L16 21V14Z" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const DevicesIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 20L18.2678 18.2678M18.2678 18.2678C18.7202 17.8154 19 17.1904 19 16.5C19 15.1193 17.8807 14 16.5 14C15.1193 14 14 15.1193 14 16.5C14 17.8807 15.1193 19 16.5 19C17.1904 19 17.8154 18.7202 18.2678 18.2678ZM15.6 10H18.4C18.9601 10 19.2401 10 19.454 9.89101C19.6422 9.79513 19.7951 9.64215 19.891 9.45399C20 9.24008 20 8.96005 20 8.4V5.6C20 5.03995 20 4.75992 19.891 4.54601C19.7951 4.35785 19.6422 4.20487 19.454 4.10899C19.2401 4 18.9601 4 18.4 4H15.6C15.0399 4 14.7599 4 14.546 4.10899C14.3578 4.20487 14.2049 4.35785 14.109 4.54601C14 4.75992 14 5.03995 14 5.6V8.4C14 8.96005 14 9.24008 14.109 9.45399C14.2049 9.64215 14.3578 9.79513 14.546 9.89101C14.7599 10 15.0399 10 15.6 10ZM5.6 10H8.4C8.96005 10 9.24008 10 9.45399 9.89101C9.64215 9.79513 9.79513 9.64215 9.89101 9.45399C10 9.24008 10 8.96005 10 8.4V5.6C10 5.03995 10 4.75992 9.89101 4.54601C9.79513 4.35785 9.64215 4.20487 9.45399 4.10899C9.24008 4 8.96005 4 8.4 4H5.6C5.03995 4 4.75992 4 4.54601 4.10899C4.35785 4.20487 4.20487 4.35785 4.10899 4.54601C4 4.75992 4 5.03995 4 5.6V8.4C4 8.96005 4 9.24008 4.10899 9.45399C4.20487 9.64215 4.35785 9.79513 4.54601 9.89101C4.75992 10 5.03995 10 5.6 10ZM5.6 20H8.4C8.96005 20 9.24008 20 9.45399 19.891C9.64215 19.7951 9.79513 19.6422 9.89101 19.454C10 19.2401 10 18.9601 10 18.4V15.6C10 15.0399 10 14.7599 9.89101 14.546C9.79513 14.3578 9.64215 14.2049 9.45399 14.109C9.24008 14 8.96005 14 8.4 14H5.6C5.03995 14 4.75992 14 4.54601 14.109C4.35785 14.2049 4.20487 14.3578 4.10899 14.546C4 14.7599 4 15.0399 4 15.6V18.4C4 18.9601 4 19.2401 4.10899 19.454C4.20487 19.6422 4.35785 19.7951 4.54601 19.891C4.75992 20 5.03995 20 5.6 20Z" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const UsersIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 20V18C13 15.2386 10.7614 13 8 13C5.23858 13 3 15.2386 3 18V20H13ZM13 20H21V19C21 16.0545 18.7614 14 16 14C14.5867 14 13.3103 14.6255 12.4009 15.6311M11 7C11 8.65685 9.65685 10 8 10C6.34315 10 5 8.65685 5 7C5 5.34315 6.34315 4 8 4C9.65685 4 11 5.34315 11 7ZM18 9C18 10.1046 17.1046 11 16 11C14.8954 11 14 10.1046 14 9C14 7.89543 14.8954 7 16 7C17.1046 7 18 7.89543 18 9Z" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const ArrowDownIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const ArrowUpIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 15L12 9L18 15" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const navItems = [
    { name: "Стойки", path: "/racks", icon: <RacksIcon /> },
    { name: "Серверы", path: "/servers", icon: <ServersIcon /> },
    { name: "Оборудование", path: "/equipment", icon: <EquipmentsIcon /> },
    { name: "Сети", path: "/networks", icon: <NetworksIcon /> },
    { name: "Шаблоны", path: "/templates", icon: <TemplatesIcon  /> },
    { name: "Оборудование", path: "/devices", icon: <DevicesIcon /> },
    { name: "Пользователи", path: "/users", icon: <UsersIcon /> },
];

const Sidebar: React.FC = () => {
    const location = useLocation();
    // State tracks if the navigation links are hidden (collapsed)
    const [isCollapsed, setIsCollapsed] = useState(false); 

    const isActive = (path: string) => location.pathname.startsWith(path);
    
    // Toggle function for the "Inventory" header click
    const toggleCollapse = () => {
        setIsCollapsed(prev => !prev);
    };

    return (
        <div className="w-56 bg-infra-dark text-white bg-[#484369] h-screen flex flex-col fixed">
            
            <div className="p-4 text-xl font-bold border-b border-gray-700 h-16 flex items-center">
                <Link to="/">
                    Админ Панель
                </Link>
            </div>

            <div 
                className="p-4 text-sm font-semibold border-b border-gray-700 cursor-pointer flex justify-between items-center bg-[#58537c] hover:bg-[#68638c]" // Slightly different background
                onClick={toggleCollapse} 
            >
                <div className="text-white hover:text-gray-200 no-underline flex-grow">
                    Inventory
                </div>
                <span className="text-xs transition-transform duration-200 transform">
                    {isCollapsed ? <ArrowUpIcon /> : <ArrowDownIcon />} 
                </span>
            </div>

            <nav 
                className={`flex flex-col p-2 space-y-1 transition-all duration-300 ease-in-out overflow-hidden 
                    ${isCollapsed ? 'max-h-0 opacity-0 p-0 m-0' : 'max-h-96 opacity-100'}` 
                }
            >
                {navItems.map(item => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`py-2 px-3 rounded text-sm transition-colors duration-200 flex items-center
                            ${
                                isActive(
                                    item.path.split("/")[1] === "servers"
                                        ? "/servers"
                                        : item.path
                                )
                                    ? "bg-gray-700 text-white font-semibold"
                                    : "hover:bg-gray-700 text-gray-300"
                            }`}
                    >
                        {item.icon && <span className="inline-block mr-2 align-middle">{item.icon}</span>}
                        {item.name}
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;