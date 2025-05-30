import React, { useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { comment } from '../../utils/Icons';
import { InnerLayout } from '../../styles/Layouts';

function FinancialAdvisor() {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const { incomes, expenses } = useGlobalContext();

    const askAI = async () => {
        setLoading(true);
        try {
            const financialContext = {
                totalIncomes: incomes.reduce((acc, inc) => acc + inc.amount, 0),
                totalExpenses: expenses.reduce((acc, exp) => acc + exp.amount, 0),
                recentExpenses: expenses.slice(0, 5).map(exp => ({
                    category: exp.category,
                    amount: exp.amount
                })),
                expensesByCategory: expenses.reduce((acc, exp) => {
                    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
                    return acc;
                }, {})
            };

            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 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'
                },
                body: JSON.stringify({
                    model: "meta-llama/llama-4-scout-17b-16e-instruct",
                    messages: [
                        {
                            role: "system",
                            content: "You are a financial advisor AI. Analyze the provided financial data and give specific, actionable advice."
                        },
                        {
                            role: "user",
                            content: `Based on this financial data: ${JSON.stringify(financialContext)}, please answer: ${question} and make sure the answer has only basic text format and not bold or italic`
                        }
                    ]
                })
            });

            const data = await response.json();
            setAnswer(data.choices[0].message.content);
        } catch (error) {
            setAnswer("Sorry, I couldn't process your request at the moment.");
            console.error('Error:', error);
        }
        setLoading(false);
    };

    return (
        <FinancialAdvisorStyled>
            <div className="header">
                <div className="icon">{comment}</div>
                <h1>Financial Advisor</h1>
                <p>Get personalized financial advice based on your spending patterns</p>
            </div>
            <div className="input-section">
                <div className="input-container">
                    <input 
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Ask about your finances..."
                        onKeyPress={(e) => e.key === 'Enter' && !loading && question.trim() && askAI()}
                    />
                    <button 
                        onClick={askAI}
                        disabled={loading || !question.trim()}
                        className={loading ? 'loading' : ''}
                    >
                        {loading ? (
                            <div className="spinner"></div>
                        ) : (
                            'Ask AI'
                        )}
                    </button>
                </div>
                <div className="suggestions">
                    <p>Try asking:</p>
                    <div className="suggestion-buttons">
                        <button onClick={() => setQuestion("How can I save more money?")}>
                            How can I save more?
                        </button>
                        <button onClick={() => setQuestion("What are my biggest expenses?")}>
                            Biggest expenses?
                        </button>
                        <button onClick={() => setQuestion("How can I improve my budget?")}>
                            Improve budget?
                        </button>
                    </div>
                </div>
            </div>
            {answer && (
                <div className="answer-section">
                    <div className="answer-header">
                        <div className="icon">{comment}</div>
                        <h3>Financial Advice</h3>
                    </div>
                    <div className="answer-content">
                        {answer.split('\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </div>
            )}
        </FinancialAdvisorStyled>
    );
}

const FinancialAdvisorStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 2rem;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;

    .header {
        text-align: center;
        margin-bottom: 2rem;
        
        .icon {
            background: var(--primary-color);
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1rem;
            i {
                font-size: 2rem;
                color: white;
            }
        }

        h1 {
            font-size: 2rem;
            color: var(--primary-color);
            margin-bottom: 0.5rem;
        }

        p {
            color: #666;
            font-size: 1.1rem;
        }
    }

    .input-section {
        margin-bottom: 2rem;
    }

    .input-container {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.5rem;

        input {
            flex: 1;
            padding: 1rem 1.5rem;
            border: 2px solid #fff;
            border-radius: 15px;
            font-size: 1.1rem;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            outline: none;
            transition: all 0.3s ease;
            
            &:focus {
                border-color: var(--primary-color);
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.1);
            }
        }

        button {
            padding: 0 2.5rem;
            border: none;
            background: var(--primary-color);
            color: white;
            border-radius: 15px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            white-space: nowrap;
            position: relative;

            &:hover {
                background: var(--color-green);
                transform: translateY(-2px);
            }

            &:disabled {
                background: #ccc;
                cursor: not-allowed;
                transform: none;
            }

            &.loading {
                background: var(--primary-color);
                cursor: wait;
            }

            .spinner {
                width: 20px;
                height: 20px;
                border: 3px solid rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                border-top-color: white;
                animation: spin 1s ease-in-out infinite;
                margin: 0 auto;
            }

            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        }
    }

    .suggestions {
        text-align: center;
        margin-top: 1rem;

        p {
            color: #666;
            margin-bottom: 0.5rem;
        }

        .suggestion-buttons {
            display: flex;
            gap: 0.5rem;
            justify-content: center;
            flex-wrap: wrap;

            button {
                padding: 0.5rem 1rem;
                border: none;
                background: #f0f0f0;
                color: var(--primary-color);
                border-radius: 10px;
                font-size: 0.9rem;
                cursor: pointer;
                transition: all 0.3s ease;

                &:hover {
                    background: var(--primary-color);
                    color: white;
                }
            }
        }
    }

    .answer-section {
        background: white;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        animation: fadeIn 0.3s ease-in-out;

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    }

    .answer-header {
        background: var(--primary-color);
        color: white;
        padding: 1.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;

        .icon {
            background: rgba(255, 255, 255, 0.2);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            i {
                font-size: 1.5rem;
                color: white;
            }
        }

        h3 {
            font-size: 1.3rem;
            font-weight: 600;
            margin: 0;
        }
    }

    .answer-content {
        padding: 2rem;
        
        p {
            color: #000000;
            line-height: 1.8;
            margin-bottom: 1rem;
            font-size: 1.1rem;

            &:last-child {
                margin-bottom: 0;
            }
        }
    }
`;

export default FinancialAdvisor; 