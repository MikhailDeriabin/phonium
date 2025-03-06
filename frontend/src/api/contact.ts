import axios from "axios";
import {envVars} from "@/utils/envVars.ts";

export type Contact = {
    id: number;
    name?: string;
    phone: string;
    description?: string;
};

const API_URL = `${envVars.VITE_API_URL}/contact`;

type FetchContactsParams = {
    page?: number;
    pageSize?: number;
};
type FetchContactsResponse = {
    data: Contact[];
    metadata: {
        total: number;
        page: number;
        pageSize: number;
    };
};

type FetchContactResponse = {
    data: Contact;
    metadata: {
        total: number;
        page: number;
        pageSize: number;
    };
};


export const fetchContacts = async (params: FetchContactsParams): Promise<FetchContactsResponse> => {
    try {
        const response = await axios.get(API_URL, { params });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Failed to fetch contacts");
        }
        throw new Error("An unexpected error occurred");
    }
};

export const fetchContactById = async (id: number): Promise<FetchContactResponse> => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                throw new Error("The Contact is not found");
            }
            throw new Error(error.response?.data?.message || "Failed to fetch contact");
        }
        throw new Error("An unexpected error occurred");
    }
};

export const addContact = async (contact: Omit<Contact, "id">): Promise<FetchContactResponse> => {
    try {
        const response = await axios.post(API_URL, contact);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Failed to add contact");
        }
        throw new Error("An unexpected error occurred");
    }
};

export const updateContact = async (contact: Partial<Contact> & { id: number }): Promise<FetchContactResponse> => {
    try {
        const response = await axios.patch(`${API_URL}`, contact);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Failed to update contact");
        }
        throw new Error("An unexpected error occurred");
    }
};

export const deleteContact = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                throw new Error("The Contact is not found");
            }
            throw new Error(error.response?.data?.message || "Failed to delete contact");
        }
        throw new Error("An unexpected error occurred");
    }
};
