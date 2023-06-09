import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  Keyboard,
} from "react-native";
import * as Colors from "../styles/Colors"
import * as Spacing from "../styles/Spacing"
import FunFactCard from "../common/FunFactCard";
import { useTypedDispatch, useTypedSelector } from "../store";
import { upsertFact } from "../store/modules/Facts";
import { getNewFact } from "../store/modules/Facts";


const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.DARK,
    ...Spacing.largePadding,
  },
  inputPromptContainer: {
    flex: 1,
  },
  enterANumberText: {
    color: Colors.PRIMARY,
    fontSize: 24,
    fontWeight: "bold",
  },
  inputContainer: {
    ...Spacing.marginVertical,
    ...Spacing.padding,
    backgroundColor: Colors.LIGHT,
    color: "black",
    fontSize: 18,
    borderRadius: 8,
  },
  feedbackContainer: {
    flexDirection: "row",
    width: "100%",
  },
  feedbackButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  feebackButtonText: {
    fontSize: 30,
    fontWeight: "bold",
  },
});

const HomeScreen: React.FC = () => {
    const [num, setNum] = useState(6);

    const dispatch = useTypedDispatch();
    const pendingFact = useTypedSelector((state: any) => state.facts.pendingFact);
    const factError = useTypedSelector((state: any) => state.facts.error)

    useEffect(() => {
        if (factError) {
            alert(factError.message)
        }
    }, [factError])
  return (
    <View style={styles.background}>
      <View style={styles.inputPromptContainer}>
         <Text style={styles.enterANumberText}>Enter a number :</Text>
         <TextInput 
         value = {num >= 0 ? num.toString() : ""}
         onChangeText = {(val) => {
            if (val.length) setNum(parseInt(val));
            else setNum(-1)
         }}
         style={styles.inputContainer}
         keyboardType = "number-pad"
         />

         <Button
         title="Submit"
         color={Colors.DARK}
         onPress={() => {
            Keyboard.dismiss();
            dispatch(getNewFact(num))
         }}
         />
         {pendingFact && <FunFactCard funFact={pendingFact} />}

         </View>

         {/* <FunFactCard
             funFact={{ fact: "Placeholder unrated fact", rating: 0}}
          />
          <FunFactCard
             funFact={{ fact: "Placeholder liked fact", rating: 1}}
          />
          <FunFactCard
             funFact={{ fact: "Placeholder disliked fact", rating: -1}}
          /> */}
      

      <View style={styles.feedbackContainer}>
        <TouchableOpacity style={styles.feedbackButton}
        onPress={() => {
            if (!pendingFact) return;
            const newFact = {
              ...pendingFact,
              rating: 1 as 1,
            };
            dispatch(upsertFact(newFact));
            dispatch(getNewFact(num));
          }}
        >
            <Text style={[styles.feebackButtonText, {color: Colors.PRIMARY}]}>
                LIKE
            </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.feedbackButton}
        onPress={() => {
            if (!pendingFact) return;
            const newFact = {
              ...pendingFact,
              rating: -1 as -1,
            };
            dispatch(upsertFact(newFact));
            dispatch(getNewFact(num));
          }}
        >
            <Text style={[styles.feebackButtonText, {color: Colors.SECONDARY}]}>
                DISLIKE
            </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
