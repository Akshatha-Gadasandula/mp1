import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root {
        --primary-color: #4CAF50;
        --primary-light: #81C784;
        --primary-dark: #388E3C;
        --secondary-color: #FFC107;
        --background-color: #F5F5F5;
        --text-color: #222260;
        --text-secondary: #666666;
        --success-color: #4CAF50;
        --warning-color: #FFC107;
        --danger-color: #F44336;
        --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        --gradient: linear-gradient(135deg, #4CAF50 0%, #81C784 100%);
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
    }

    body {
        background-color: var(--background-color);
        color: var(--text-color);
        font-size: 16px;
        line-height: 1.6;
    }

    h1, h2, h3, h4, h5, h6 {
        color: var(--text-color);
    }

    p {
        color: var(--text-secondary);
    }

    button {
        cursor: pointer;
        outline: none;
        border: none;
        background: var(--gradient);
        color: white;
        padding: 0.8rem 1.5rem;
        border-radius: 8px;
        font-weight: 500;
        transition: all 0.3s ease;
        box-shadow: var(--shadow);

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
        }

        &:active {
            transform: translateY(0);
        }
    }

    input, textarea {
        width: 100%;
        padding: 0.8rem 1rem;
        border: 2px solid var(--primary-light);
        border-radius: 8px;
        background: white;
        color: var(--text-color);
        font-size: 1rem;
        transition: all 0.3s ease;

        &:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
        }
    }

    .error {
        color: var(--danger-color);
        font-size: 0.9rem;
        margin-top: 0.5rem;
    }

    .success {
        color: var(--success-color);
        font-size: 0.9rem;
        margin-top: 0.5rem;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
    }

    .card {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: var(--shadow);
        transition: all 0.3s ease;

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
        }
    }

    .flex {
        display: flex;
        gap: 1rem;
    }

    .flex-center {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .grid {
        display: grid;
        gap: 1rem;
    }

    .text-center {
        text-align: center;
    }

    .mt-1 { margin-top: 0.5rem; }
    .mt-2 { margin-top: 1rem; }
    .mt-3 { margin-top: 1.5rem; }
    .mb-1 { margin-bottom: 0.5rem; }
    .mb-2 { margin-bottom: 1rem; }
    .mb-3 { margin-bottom: 1.5rem; }
`;

export default GlobalStyles; 