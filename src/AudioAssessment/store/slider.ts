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
    set((state: State) => ({ currentSlide: state.currentSlide + 1 })),
  decreaseSlide: () =>
    set((state: State) => {
      return { currentSlide: state.currentSlide - 1 };
    }),
  changeSlide: (slide: number) =>
    set(() => {
      return {
        currentSlide: slide,
      };
    }),
}));
