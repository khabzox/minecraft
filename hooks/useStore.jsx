import { create } from "zustand";
import { nanoid } from "nanoid";

const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));
const setLocalStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value));

export const useStore = create((set) => ({
  texture: "dirt",
  cubes: getLocalStorage("cubes") || [],
  addCube: (x, y, z) => {
    set((state) => {
      const newCube = {
        key: nanoid(),
        pos: [x, y, z],
        texture: state.texture,
      };
      const newCubes = [...state.cubes, newCube];
      setLocalStorage("cubes", newCubes);
      return { ...state, cubes: newCubes };
    });
  },
  removeCube: (x, y, z) => {
    set((state) => {
      const filteredCubes = state.cubes.filter((cube) => {
        const [X, Y, Z] = cube.pos;
        return X !== x || Y !== y || Z !== z;
      });
      setLocalStorage("cubes", filteredCubes);
      return { ...state, cubes: filteredCubes };
    });
  },
  setTexture: (texture) => {
    set((state) => ({
      ...state,
      texture,
    }));
  },
  saveWorld: () => {
    set((state) => {
      setLocalStorage("cubes", state.cubes);
      return state;
    });
  },
  resetWorld: () => {
    set(() => ({
      cubes: [],
      texture: "dirt", // Assuming a default texture
    }));
    setLocalStorage("cubes", []); // Clear cubes from localStorage
  },
}));


