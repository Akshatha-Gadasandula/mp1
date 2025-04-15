import React, { useContext, useState, useEffect } from "react"
import axios from 'axios'

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    // Configure axios defaults
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        // Add axios interceptor to handle token updates
        const interceptor = axios.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        return () => {
            // Remove interceptor when component unmounts
            axios.interceptors.request.eject(interceptor);
        };
    }, []);

    //calculate incomes
    const addIncome = async (income) => {
        try {
            await axios.post(`${BASE_URL}add-income`, income)
                .catch((err) => {
                    setError(err.response.data.message)
                })
            getIncomes()
        } catch (err) {
            console.log(err)
        }
    }

    const getIncomes = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}get-incomes`)
            setIncomes(data)
        } catch (err) {
            console.log(err)
        }
    }

    const deleteIncome = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-income/${id}`)
            getIncomes()
        } catch (err) {
            console.log(err)
        }
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })
        return totalIncome;
    }

    //calculate expenses
    const addExpense = async (expense) => {
        try {
            await axios.post(`${BASE_URL}add-expense`, expense)
                .catch((err) => {
                    setError(err.response.data.message)
                })
            getExpenses()
        } catch (err) {
            console.log(err)
        }
    }

    const getExpenses = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${BASE_URL}get-expenses`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setExpenses(response.data)
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred')
        }
    }

    const deleteExpense = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`${BASE_URL}delete-expense/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            getExpenses()
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred')
        }
    }

    const totalExpenses = () => {
        let totalExpense = 0;
        expenses.forEach((expense) =>{
            totalExpense = totalExpense + expense.amount
        })
        return totalExpense;
    }

    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })
        return history.slice(0, 3)
    }

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}