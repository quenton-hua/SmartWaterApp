import { SafeAreaView, Text, View, StyleSheet, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import WaterMeter from "../components/WaterMeter";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    height: "100vh",
    width: "100vw",
    flexDirection: "row", // Arrange children in a row
    justifyContent: "flex-end",
  },
  leftcontent: {
    height: "100%",
    width: "40%",
    display: "flex",
    justifyContent: "center",
  },
  rightcontent: {
    padding: 20,
    height: "100%",
    width: "60%",
    display: "flex",
    justifyContent: "center",
  },
  percentage: {
    fontSize: 80,
    fontWeight: "bold",
    textAlign: "center",
  },
  details: {
    marginLeft: 20,
  },
});

const WaterLevelScreen = () => {
  const [currLiters, setCurrLiters] = useState(0.5); //liters of water in waterbottle
  const [waterData, setWaterData] = useState({
    maxLiters: 2,
    lastRefill: "1:35pm CST 3/1/2024",
  }); //max liters of water in waterbottle
  // Declare variables to hold calculated values
  const [percentage, setPercentage] = useState(0);
  const [gramsOfWater, setGramsOfWater] = useState(0);

  useEffect(() => {
    // Calculate the percentage of water remaining in the bottle
    const calculatedPercentage = Math.round(
      (currLiters / waterData.maxLiters) * 100
    );

    
    setPercentage(calculatedPercentage);

    // Calculate how many grams of water are in the bottle (assuming 1 liter of water weighs 1000 grams)
    const calculatedGramsOfWater = currLiters * 1000;
    setGramsOfWater(calculatedGramsOfWater);
  }, [currLiters]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.leftcontent}>
        <WaterMeter percentage= {percentage}/>
      </View>
      <View style={styles.rightcontent}>
        
        <Text style={styles.percentage}>{percentage}%</Text>
        <View style={styles.details}>
          <Text>
            {" "}
            <Text style={{ fontWeight: "bold" }}>{gramsOfWater}</Text> g water
          </Text>
          <Text>
            {" "}
            <Text style={{ fontWeight: "bold" }}>{currLiters}</Text> liters water
          </Text>
          <Text>
            {" "}
            <Text style={{ fontWeight: "bold" }}>Last Refill:</Text>
            {"\n"}{waterData.lastRefill}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WaterLevelScreen;
