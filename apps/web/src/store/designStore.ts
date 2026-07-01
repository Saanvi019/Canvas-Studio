import { create } from "zustand";

interface DesignStore {
  designModel: any | null;

  selectedComponentId: string | null;

  undoStack: any[];

  redoStack: any[];

  isAiLoading: boolean;

  codeOutput: string;

  setAiLoading: (loading: boolean) => void;

  updateComponent: (id: string, patch: any) => void;

  setDesignModel: (model: any) => void;

  selectComponent: (id: string | null) => void;

  pushVersion: () => void;

  undo: () => void;

  redo: () => void;
}

export const useDesignStore = create<DesignStore>((set, get) => ({
  designModel: null,

  selectedComponentId: null,

  undoStack: [],

  redoStack: [],

  isAiLoading: false,

  codeOutput: "",

  setAiLoading: (loading) =>
    set({
      isAiLoading: loading,
    }),

  setDesignModel: (model) =>
    set({
      designModel: model,
    }),

  selectComponent: (id) =>
    set({
      selectedComponentId: id,
    }),

  updateComponent: (id, patch) => {
    const model = get().designModel;

    if (!model) {
      return;
    }

    const updatedComponents = model.components.map((component: any) =>
      component.id === id
        ? {
            ...component,
            ...patch,
          }
        : component
    );

    set({
      designModel: {
        ...model,
        components: updatedComponents,
      },
    });
  },

  pushVersion: () => {
    const currentModel = get().designModel;

    set((state) => ({
      undoStack: [...state.undoStack, structuredClone(currentModel)],

      redoStack: [],
    }));
  },

  undo: () => {
    const { undoStack, redoStack, designModel } = get();

    if (undoStack.length === 0) {
      return;
    }

    const previous = undoStack[undoStack.length - 1];

    set({
      designModel: previous,

      undoStack: undoStack.slice(0, -1),

      redoStack: [...redoStack, structuredClone(designModel)],
    });
  },

  redo: () => {
    const { redoStack, undoStack, designModel } = get();

    if (redoStack.length === 0) {
      return;
    }

    const next = redoStack[redoStack.length - 1];

    set({
      designModel: next,

      redoStack: redoStack.slice(0, -1),

      undoStack: [...undoStack, structuredClone(designModel)],
    });
  },
}));
