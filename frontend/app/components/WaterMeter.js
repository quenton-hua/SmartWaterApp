import { View, Animated, StyleSheet } from "react-native";
import React, { useEffect, useRef } from "react";

const styles = StyleSheet.create({
  bottleContainer: {
    position: "absolute",
    display: "flex",
    width: "100%", // Example: 50vw
    height: "75%", // Example: 50vh

    display: "flex",
    flexDirection: "row", // Arrange items horizontally
    alignItems: "flex-end",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
    // justifyContent: "center",
    // alignItems: "center",
    borderWidth: 4,
    borderLeftWidth: 0,
  },
  mainBottle: {
    width: "100%",
    backgroundColor: "lightblue",
  },
});

function WaterMeter(props) {
  const heightAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(heightAnimation, {
      toValue: 1,
      duration: 2000, // Adjust the duration as needed
      useNativeDriver: false,
    }).start();
  }, []);

  const percentageString = `${props.percentage}%`;

  const interpolatedHeight = heightAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", percentageString],
  });
  return (
    <View style={styles.bottleContainer}>
      <Animated.View
        style={[styles.mainBottle, { height: interpolatedHeight }]}
      ></Animated.View>
    </View>
  );
}

export default WaterMeter;