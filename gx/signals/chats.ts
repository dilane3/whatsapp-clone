import { createSignal } from "@dilane3/gx";

const image1 = require("../../assets/avatars/belvanie.jpg")
const image2 = require("../../assets/avatars/ln.jpg")
const image3 = require("../../assets/avatars/voltaire.jpg")
const image4 = require("../../assets/avatars/corine.jpg")
const image5 = require("../../assets/avatars/blondelle.jpg")
const image6 = require("../../assets/avatars/donald.jpg")
const image7 = require("../../assets/avatars/elie.jpg")
const image8 = require("../../assets/avatars/ghislain.jpg")

const chats: any[] = [
  {
    id: 1,
    name: "Belvanie",
    avatar: image1,
    message: "😁😁",
    date: "Yesterday"
  },
  {
    id: 2,
    name: "LN",
    avatar: image2,
    message: "Oui oui merci, si ca casse apres...",
    date: "Yesterday"
  },
  {
    id: 3,
    name: "Voltaire",
    avatar: image3,
    message: "Jtd 😢",
    date: "Yesterday"
  },
  {
    id: 4,
    name: "Corine",
    avatar: image4,
    message: "Cool",
    date: "Yesterday"
  },
  {
    id: 5,
    name: "Blondelle",
    avatar: image5,
    message: "😄",
    date: "Yesterday"
  },
  {
    id: 6,
    name: "Donald",
    avatar: image6,
    message: "https://gx.dilane3.com",
    date: "Yesterday"
  },
  {
    id: 7,
    name: "Elie",
    avatar: image7,
    message: "Voila 😁😁",
    date: "Yesterday"
  },
  {
    id: 8,
    name: "Ghislain",
    avatar: image8,
    message: "Bonsoir boss",
    date: "Yesterday"
  },
]

export type Chat = {
  id: number,
  name: string,
  avatar: any,
  message: string,
  date: string
}

export type ChatSignalType = {
  chats: Chat[],
  currentChatId: number | null
}

const chatsSignal = createSignal<ChatSignalType>({
  name: "chat",
  state: {
    chats,
    currentChatId: null
  },
  actions: {
    select: (state, payload: number) => {
      return {
        ...state,
        currentChatId: payload
      }
    }
  }
})

export default chatsSignal;