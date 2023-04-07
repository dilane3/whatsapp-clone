import { useAction } from "@dilane3/gx";
import { useNavigation } from "expo-router";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { CommonActions } from '@react-navigation/native';

const cards = [
  {
    id: 1,
    image: require("../../assets/images/img3.jpg"),
    title:
      "Les fleurs sont des meilleurs de DIEU. Il a pris son temps pour réaliser cette magnifique chose.",
  },
  {
    id: 2,
    image: require("../../assets/images/img4.jpg"),
    title: "Un peu de balade au coeur de la ville de Paris.",
  },
  {
    id: 3,
    image: require("../../assets/images/img5.jpg"),
    title:
      "Qu'il fait beau aujourd'hui sous ce soleil doux et paisible. C'est apaisant de se balader sous un soleil non agressif comme celui ci",
  },
  {
    id: 4,
    image: require("../../assets/images/img6.jpg"),
    title:
      "La ville de tokyo est si riche de part sa culture et sa population.",
  },
  {
    id: 5,
    image: require("../../assets/images/img7.jpg"),
    title: "Une discussion entre potes fait toujours plaisir.",
  },
  {
    id: 6,
    image: require("../../assets/images/img8.jpg"),
    title: "Une discussion entre potes fait toujours plaisir.",
  },
  {
    id: 7,
    image: require("../../assets/images/img9.jpg"),
    title: "Une discussion entre potes fait toujours plaisir.",
  },
  {
    id: 8,
    image: require("../../assets/images/img10.jpg"),
    title: "Une discussion entre potes fait toujours plaisir.",
  },
  {
    id: 9,
    image: require("../../assets/images/img11.jpg"),
    title: "Une discussion entre potes fait toujours plaisir.",
  },
];

type CardImageProps = {
  card: {
    id: number;
    image: any;
    title: string;
  };
};

const CardImage = ({ card }: CardImageProps) => {
  // Actions
  const selectImage = useAction("image", "selectImage");

  // Navigation
  const navigation = useNavigation();

  // Some handlers
  const handleDisplayImage = () => {
    selectImage(card.image)

    navigation.dispatch(
      CommonActions.navigate("(post)")
    )
  }

  return (
    <View style={styles.card}>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("#f5f5f5", false)}
        onPress={handleDisplayImage}
        useForeground={true}
      >
        <View>
          <Image source={card.image} style={styles.cardImage} />
        </View>
      </TouchableNativeFeedback>

      <Text style={styles.cardTitle}>{card.title}</Text>
    </View>
  );
};

export default function Communauté() {
  return (
    <ScrollView style={styles.container}>
      {cards.map((card) => (
        <CardImage key={card.id} card={card} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },

  card: {
    width: "100%",
    borderRadius: 10,
    marginBottom: 20,
  },

  cardImage: {
    width: "100%",
    height: 250,
    borderRadius: 10,
  },

  cardTitle: {
    fontFamily: "PoppinsRegular",
    fontSize: 14,
    marginTop: 10
  },
});
