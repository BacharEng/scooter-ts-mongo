import { create } from "zustand";
import axios from "axios";
const baseURL = "http://localhost:3001/api/scooters";

export interface Scooter {
  _id?: string;
  scooterModel: string;
  scooterType: string;
  scooterBattery: number;
  isAvailable?: boolean;
  createAt?: Date;
  location: {
    lat: number;
    long: number;
  };
}

interface ScooterState {
  scooters: Scooter[];
  fetchScooters: () => Promise<void>;
  addScooter: (scooter: Omit<Scooter, "_id">) => Promise<void>;
  updateScooter: (id: String, scooter: Partial<Scooter>) => Promise<void>;
  deleteScooter: (id: String) => Promise<void>;
}

export const useScooterStore = create<ScooterState>((set, get) => ({
  scooters: [],
  fetchScooters: async () => {
    const response = await axios.get<Scooter[]>(`${baseURL}/`);
    set({ scooters: response.data });
  },
  addScooter: async (scooter) => {
    const response = await axios.post<Scooter>(`${baseURL}/`, scooter);
    set({ scooters: [...get().scooters, response.data] });
  },
  updateScooter: async (id, scooter) => {
    const response = await axios.put<Scooter>(`${baseURL}/${id}`, scooter);
    set({
      scooters: get().scooters.map((s) => (s._id === id ? response.data : s)),
    });
  },
  deleteScooter: async (id) => {
    await axios.delete(`${baseURL}/${id}`);
    set({ scooters: get().scooters.filter((s) => s._id !== id) });
  },
}));
