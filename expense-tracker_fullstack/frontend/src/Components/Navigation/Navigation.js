import React from "react";
import styled from "styled-components";
import { menuItems } from "../../utils/menuItems";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navigation = ({ active, setActive, user, onLogout }) => {
  const navigate = useNavigate();

  const handleNavigation = (item) => {
    setActive(item.id);
    navigate(item.link);
  };

  return (
    <NavStyled>
      <div className="user-container">
        <img 
          src="https://img.icons8.com/bubbles/100/user.png" 
          alt="User Avatar" 
          className="avatar"
        />
        <h4>Welcome, {user?.username || "User"}</h4>
      </div>
      <ul className="menu-items">
        {menuItems.map((item) => {
          return (
            <li
              key={item.id}
              onClick={() => handleNavigation(item)}
              className={active === item.id ? "active" : ""}
            >
              {item.icon}
              <span>{item.title}</span>
            </li>
          );
        })}
      </ul>
      <div className="bottom-nav">
        <button onClick={onLogout} className="logout-btn">
          Sign Out
        </button>
      </div>
    </NavStyled>
  );
};

const NavStyled = styled.nav`
  padding: 2rem 1.5rem;
  width: 300px;
  height: 100%;
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid rgba(76, 175, 80, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;

  .user-container {
    text-align: center;
    padding: 1.5rem;
    border-radius: 12px;
    background: linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(129, 199, 132, 0.1) 100%);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    gap: 1rem;

    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #fff;
      padding: 2px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.1);
      }
    }

    h4 {
      color: #222260;
      font-size: 1.2rem;
      font-weight: 600;
      flex: 1;
      text-align: left;
    }
  }

  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    li {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
      color: #222260;

      &:hover {
        background: rgba(76, 175, 80, 0.1);
        transform: translateX(5px);
      }

      &.active {
        background: var(--gradient);
        color: white;
        box-shadow: 0 4px 12px rgba(76, 175, 80, 0.2);
      }

      span {
        font-size: 1rem;
        font-weight: 500;
      }
    }
  }

  .bottom-nav {
    padding-top: 2rem;
    border-top: 2px solid rgba(76, 175, 80, 0.1);

    .logout-btn {
      width: 100%;
      background: #666666;
      color: white;
      padding: 0.8rem;
      border-radius: 12px;
      font-weight: 500;
      transition: all 0.3s ease;

      &:hover {
        background: #4d4d4d;
        transform: translateY(-2px);
      }
    }
  }
`;

export default Navigation;
