import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Colors from "../styles/Colors"
import * as Spacing from "../styles/Spacing"
import { FunFact } from "../types";

interface Props {
    funFact: FunFact;
}

const styles = StyleSheet.create({
    cardBackground: {
        width: "100%",
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: Colors.SECONDARY,
        borderColor: Colors.PRIMARY,
        ...Spacing.padding,
        ...Spacing.marginVertical,
      },
      likedBackground: {
        backgroundColor: "#a9ff9e",
        borderColor: "#129e00",
      },
      dislikedBackground: {
        backgroundColor: "#ff866e",
        borderColor: "#cf2200",
      },
      factText: {
        color: "black",
        fontSize: 20,
      },
})

const FunFactCard: React.FC<Props> = ({funFact}) => {
    let ratingBackground = {};
    if (funFact.rating === 1) ratingBackground = styles.likedBackground;
    else if (funFact.rating === -1) ratingBackground = styles.dislikedBackground;

    return (
        <View style={[styles.cardBackground, ratingBackground]}>
            <Text style={styles.factText}>{funFact.fact}</Text>
        </View>
    )
}

export default FunFactCard