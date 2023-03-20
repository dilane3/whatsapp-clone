import { createSignal } from "@dilane3/gx";

export const imageSignal = createSignal({
  name: "image",
  state: "",
  actions: {
    selectImage: (state, payload: string) => {
      return payload;
    }
  }
})