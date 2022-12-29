import create from "zustand";

type State = {
    currentSlide: number;
};

type Actions = {
    increaseSlide: () => void;
    decreaseSlide: () => void;
    changeSlide: (slide: number) => void;
};
export const useStoreSlider = create<State & Actions>((set) => ({
    currentSlide: 0,
    increaseSlide: () =>
        set((state) => ({ currentSlide: state.currentSlide + 1 })),
    decreaseSlide: () =>
        set((state) => {
            return { currentSlide: state.currentSlide - 1 };
        }),
    changeSlide: (slide: number) =>
        set(() => {
            return {
                currentSlide: slide,
            };
        }),
}));
//-------------------------------
// interface _State {
//     count: number;
// }

// interface _Dispatch {
//     dispatch: (action: _Action) => void;
// }

// interface _Actions {
//     increment: (qty: number) => void;
//     decrement: (qty: number) => void;
// }

// enum ACTIONS {
//     INCREMENT = "INCREMENT",
//     DECREMENT = "INCREMENT",
// }

// interface _Action {
//     type: ACTIONS;
//     qty: number;
// }

// const countReducer = (state: _State, action: _Action) => {
//     switch (action.type) {
//         case ACTIONS.INCREMENT:
//             return { count: state.count + action.qty };
//         case ACTIONS.DECREMENT:
//             return { count: state.count - action.qty };
//         default:
//             return state;
//     }
// };

// const useCountStore = create<_State & _Dispatch>((set) => ({
//     count: 0,
//     dispatch: (action: _Action) => set((state) => countReducer(state, action)),
// }));
