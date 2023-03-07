import create from "zustand";
import { StatusAudio } from "../../enums/status-machine";

type State = {
    counter: number;
};

type Actions = {
    increaseCounter: () => void;
};
export const useStoreCounter = create<State & Actions>((set) => ({
    counter: 0,
    increaseCounter: () => set((state) => ({ counter: state.counter + 1 })),
}));
