import { createStore } from "@dilane3/gx";
import chatsSignal from "../signals/chats";
import { imageSignal } from "../signals/image";

export default createStore([chatsSignal, imageSignal]);