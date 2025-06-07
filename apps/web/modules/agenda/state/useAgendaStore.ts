import { create } from "zustand";

interface AgendaStore {
    selectedDay: Date;
    selectedServiceName: string;
    selectedServiceId: string;
    selectedEmployeeId: string;
    selectedEmployeeName: string;
}

interface AgendaStoreActions {
    setSelectedDay: (day: Date) => void;
    setSelectedServiceName: (name: string) => void;
    setSelectedServiceId: (id: string) => void;
    setSelectedEmployeeId: (id: string) => void;
    setSelectedEmployeeName: (name: string) => void;
}    

export const useAgendaStore = create<AgendaStore & AgendaStoreActions>((set) => ({
    selectedDay: new Date(),
    selectedServiceName: "",
    selectedServiceId: "",
    selectedEmployeeId: "",
    selectedEmployeeName: "",
    setSelectedDay: (day: Date) => set({ selectedDay: day }),
    setSelectedServiceName: (name: string) => set({ selectedServiceName: name }),
    setSelectedServiceId: (id: string) => set({ selectedServiceId: id }),
    setSelectedEmployeeId: (id: string) => set({ selectedEmployeeId: id }),
    setSelectedEmployeeName: (name: string) => set({ selectedEmployeeName: name }),
}))

