import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  FileText, 
  Settings, 
  LogOut, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  return (
    <aside 
      className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      } hidden md:block`}
    >
      <div className="h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between h-16 px-4">
            {!collapsed && (
              <div className="flex items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 text-transparent bg-clip-text">
                  RecruitPro
                </span>
              </div>
            )}
            {collapsed && (
              <div className="w-full flex justify-center">
                <span className="text-2xl font-bold text-blue-600">R</span>
              </div>
            )}
            <button 
              onClick={onToggle}
              className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {collapsed ? (
                <ChevronRight size={20} className="text-gray-500 dark:text-gray-400" />
              ) : (
                <ChevronLeft size={20} className="text-gray-500 dark:text-gray-400" />
              )}
            </button>
          </div>

          <div className="px-3 py-4">
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `flex items-center p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group transition-colors ${
                      isActive ? 'bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400' : 'dark:text-gray-400'
                    }`
                  }
                >
                  <LayoutDashboard size={20} className="flex-shrink-0" />
                  {!collapsed && <span className="ml-3">Dashboard</span>}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/candidates"
                  className={({ isActive }) =>
                    `flex items-center p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group transition-colors ${
                      isActive ? 'bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400' : 'dark:text-gray-400'
                    }`
                  }
                >
                  <Users size={20} className="flex-shrink-0" />
                  {!collapsed && <span className="ml-3">Candidates</span>}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/employer"
                  className={({ isActive }) =>
                    `flex items-center p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group transition-colors ${
                      isActive ? 'bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400' : 'dark:text-gray-400'
                    }`
                  }
                >
                  <Building2 size={20} className="flex-shrink-0" />
                  {!collapsed && <span className="ml-3">Employers</span>}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/posts"
                  className={({ isActive }) =>
                    `flex items-center p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group transition-colors ${
                      isActive ? 'bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400' : 'dark:text-gray-400'
                    }`
                  }
                >
                  <FileText size={20} className="flex-shrink-0" />
                  {!collapsed && <span className="ml-3">Job Posts</span>}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="px-3 py-4 border-t border-gray-200 dark:border-gray-700">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `flex items-center p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group transition-colors ${
                    isActive ? 'bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400' : 'dark:text-gray-400'
                  }`
                }
              >
                <Settings size={20} className="flex-shrink-0" />
                {!collapsed && <span className="ml-3">Settings</span>}
              </NavLink>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group transition-colors dark:text-gray-400"
              >
                <LogOut size={20} className="flex-shrink-0" />
                {!collapsed && <span className="ml-3">Logout</span>}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;