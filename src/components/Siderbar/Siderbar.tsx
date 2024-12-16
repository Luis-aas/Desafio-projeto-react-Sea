// import { EnterpriseIcon } from "../../assets/icons/enterprise-icon";
// import { EditIcon } from "../../assets/icons/edit-icon";
// import { BellIcon } from "../../assets/icons/bell-icon";
// import { SiteMapIcon } from "../../assets/icons/sitemap-icon";
// import { TimeLoopeIcon } from "../../assets/icons/time-loop-icon";
// import { UserIcon } from "../../assets/icons/user-icon";

// import { useNavigate, useLocation } from 'react-router-dom';

// import "./Sidebar.css";

// export function Siderbar() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const isActive = (path: string) => location.pathname === path;

//   return (
//     <div className="sidebar">
//       <div className="sidebar-top-rectangle"></div>

//       <button className={`sidebar-icon ${isActive('/enterprise') ? 'active' : ''}`} onClick={() => navigate('/enterprise')}>
//         <EnterpriseIcon />
//       </button>
//       <button className={`sidebar-icon ${isActive('/') ? 'active' : ''}`} onClick={() => navigate('/')}>
//         <EditIcon />
//       </button>
//       <button className={`sidebar-icon ${isActive('/sitemap') ? 'active' : ''}`} onClick={() => navigate('/sitemap')}>
//         <SiteMapIcon />
//       </button>
//       <button className={`sidebar-icon ${isActive('/notifications') ? 'active' : ''}`} onClick={() => navigate('/notifications')}>
//         <BellIcon />
//       </button>
//       <button className={`sidebar-icon ${isActive('/timeloop') ? 'active' : ''}`} onClick={() => navigate('/timeloop')}>
//         <TimeLoopeIcon />
//       </button>
//       <button className={`sidebar-icon ${isActive('/user') ? 'active' : ''}`} onClick={() => navigate('/user')}>
//         <UserIcon />
//       </button>
//     </div>
//   );
// };
import { useState } from "react";

import { useNavigate, useLocation } from 'react-router-dom';
import { EnterpriseIcon } from "../../assets/icons/enterprise-icon";
import { EditIcon } from "../../assets/icons/edit-icon";
import { BellIcon } from "../../assets/icons/bell-icon";
import { SiteMapIcon } from "../../assets/icons/sitemap-icon";
import { TimeLoopeIcon } from "../../assets/icons/time-loop-icon";
import { UserIcon } from "../../assets/icons/user-icon";

import "./Sidebar.css";
import { BarsOutlined } from "@ant-design/icons";
import { DocIcon } from "../../assets/icons/doc-icon";

export function Siderbar() {
  const [collapsed, setCollapsed] = useState(false); // Controla a visibilidade da sidebar
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-top-rectangle"></div>
      {/* Ícone de três pontinhos (Hambúrguer) */}
      <div className={`sidebar-toggle ${collapsed ? "collapsed-toggle" : ""}`} onClick={() => setCollapsed(!collapsed)}>
        <BarsOutlined />
      </div>

      {/* Somente se a sidebar não estiver oculta */}
      {!collapsed && (
        <>
          <button className={`sidebar-icon ${isActive('/enterprise') ? 'active' : ''}`} onClick={() => navigate('/enterprise')}>
            <EnterpriseIcon />
          </button>
          <button className={`sidebar-icon ${isActive('/') ? 'active' : ''}`} onClick={() => navigate('/')}>
            <EditIcon />
          </button>
          <button className={`sidebar-icon ${isActive('/sitemap') ? 'active' : ''}`} onClick={() => navigate('/sitemap')}>
            <SiteMapIcon />
          </button>
          <button className={`sidebar-icon ${isActive('/notifications') ? 'active' : ''}`} onClick={() => navigate('/notifications')}>
            <div className="icon-wrapper">
              <BellIcon />
              <div className="mini-icon">
                <DocIcon />
              </div>
            </div>
          </button>
          <button className={`sidebar-icon ${isActive('/timeloop') ? 'active' : ''}`} onClick={() => navigate('/timeloop')}>
            <TimeLoopeIcon />
          </button>
          <button className={`sidebar-icon ${isActive('/user') ? 'active' : ''}`} onClick={() => navigate('/user')}>
            <UserIcon />
          </button>
        </>
      )}
    </div>
  );
}
