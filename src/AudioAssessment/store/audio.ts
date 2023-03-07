import create from "zustand";
import { StatusAudio } from "../../enums/status-machine";

type State = {
    statusAudio: StatusAudio;
};

type Actions = {
    changeStatusAudio: (status: StatusAudio) => void;
};
export const useStoreAudio = create<State & Actions>((set) => ({
    statusAudio: StatusAudio.IDLE,
    changeStatusAudio: (status: StatusAudio) =>
        set(() => ({ statusAudio: status })),
}));
