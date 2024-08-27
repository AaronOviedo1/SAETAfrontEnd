import api from ".";
import { Transaction } from "../types";

// Get all transactions
export const getAllTransactions = async (): Promise<Transaction[] | undefined> => {
  try {
    const res = await api.get('/api/transactions');
    return res.data;
  } catch (err) {
    console.error("Error fetching transactions:", err);
    return undefined;
  }
};

// Get a single transaction by ID
export const getTransactionById = async (transactionId: string): Promise<Transaction | undefined> => {
  try {
    const res = await api.get(`/api/transactions/${transactionId}`);
    return res.data;
  } catch (err) {
    console.error(`Error fetching transaction with ID ${transactionId}:`, err);
    return undefined;
  }
};

// Create a new transaction
export const createTransaction = async (newTransaction: Transaction): Promise<Transaction | undefined> => {
  try {
    const res = await api.post('/api/transactions', newTransaction);
    return res.data;
  } catch (err) {
    console.error("Error creating transaction:", err);
    return undefined;
  }
};

// Update an existing transaction by ID
export const updateTransaction = async (transactionId: string, updatedTransaction: Partial<Transaction>): Promise<Transaction | undefined> => {
  try {
    const res = await api.put(`/api/transactions/${transactionId}`, updatedTransaction);
    return res.data;
  } catch (err) {
    console.error(`Error updating transaction with ID ${transactionId}:`, err);
    return undefined;
  }
};

// Delete a transaction by ID
export const deleteTransaction = async (transactionId: string): Promise<boolean> => {
  try {
    await api.delete(`/api/transactions/${transactionId}`);
    return true;
  } catch (err) {
    console.error(`Error deleting transaction with ID ${transactionId}:`, err);
    return false;
  }
};
