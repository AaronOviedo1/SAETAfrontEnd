// src/api/ClientApi.ts
import api from ".";
import { Client } from "../types";

export const getAllClients = async (): Promise<Client[] | undefined> => {
  try {
    const res = await api.get(`/api/clients`);
    console.log("API response:", res.data);

    const clients = Object.values(res.data);
    console.log("Parsed clients:", clients);
    
    return clients as Client[];
  } catch (err) {
    console.error("Error fetching clients:", err);
    return undefined;
  }
};

export const deleteClient = async (clientId: string): Promise<void> => {
  try {
    await api.delete(`/api/clients/${clientId}`);
    console.log(`Client with ID ${clientId} deleted successfully.`);
  } catch (err) {
    console.error("Error deleting client:", err);
    throw err;
  }
};

export const updateClient = async (clientId: string, updatedClient: Partial<Client>): Promise<Client | undefined> => {
  try {
    const res = await api.put(`/api/clients/${clientId}`, updatedClient);
    console.log("Client updated successfully:", res.data);
    return res.data as Client;
  } catch (err) {
    console.error("Error updating client:", err);
    return undefined;
  }
};

export const registerClient = async (newClient: Partial<Client>): Promise<void> => {
  try {
    await api.post(`/api/clients`, newClient);
    console.log("Client registered successfully:", newClient);
  } catch (err) {
    console.error("Error registering client:", err);
    throw err;
  }
};
