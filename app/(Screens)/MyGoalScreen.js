
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Circle, Svg, Text as SVGText } from 'react-native-svg';

const daysOfWeek = ['S', 'M', 'T', 'W', 'Th', 'F', 'Sa'];


const MyGoalScreen = () => {

  const [selectedDay, setSelectedDay] = useState(null);
  const [dailyProgress, setDailyProgress] = useState({
    'S': 0.5, 
    'M': 0.75, 
    'T': 0.6, 
    'W': 0.9, 
    'Th': 0.2, 
    'F': 0.3,
    'Sa': 0.6, 
  });

  const [highlights, setHighlights] = useState({
    dayStreak: 5,
    goalPercentage: 75, 
    bottlesToGo: 2,
  });


  const goalInOz = 90.9;

  
  const ProgressCircleWithGoal = ({ percentage }) => {
    const radius = 100;
    const stroke = 10;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

  
    const progressInOz = (goalInOz * percentage) / 100;
    const progressDisplay = `${progressInOz.toFixed(1)} oz`;

    // make it start from top position
    const rotation = 270;
    const rotationTransform = `rotate(${rotation} ${radius} ${radius})`;

    return (
      <Svg height="450" width="450" viewBox="0 0 200 200">
        <Circle
          stroke="#e6e6e6"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx="100"
          cy="100"
        />
        <Circle
          stroke="#00aaff"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx="100"
          cy="100"
          transform={rotationTransform}
        />
        <SVGText
          x="100"
          y="95" 
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize="20"
          fill="black"
        >
          {progressDisplay}
        </SVGText>
        <SVGText
          x="76"
          y="120" 
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize="12"
          fill="black"
        >
          Goal {goalInOz}oz
        </SVGText>
      </Svg>
    );
  };


  const handleDayPress = (day) => {
    setSelectedDay(day);
  };


  const renderHighlight = (label, value, unit) => (
    <View style={styles.highlight}>
      <Text style={styles.highlightLabel}>{label}</Text>
      <Text style={styles.highlightValue}>{value}{unit}</Text>
    </View>
  );

  return (
    <View style={styles.container}>

      <View style={styles.dayContainer}>
      {daysOfWeek.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayCircle,
              selectedDay === day && styles.selectedDayCircle,
            ]}
            onPress={() => handleDayPress(day)}
          >
            <Text style={styles.dayText}>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.progressContainer}>
      <ProgressCircleWithGoal
          percentage={selectedDay ? dailyProgress[selectedDay] * 100 : 0}
        />
      </View>
      <Text style={styles.highlightTitle}>Highlights</Text>
      <View style={styles.highlightsContainer}>
        {renderHighlight('Day Streak', highlights.dayStreak, '')}
        {renderHighlight('Goal', highlights.goalPercentage, '%')}
        {renderHighlight('Bottles To Go', highlights.bottlesToGo, '')}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white', 
  },
  highlightsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    paddingVertical: 10,
  },
  highlight: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  highlightLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  highlightValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  dayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    padding: 10,
    width: '100%',
    borderRadius: 20,
  },
  progressContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    marginHorizontal: 5,
  },
  selectedDayCircle: {
    backgroundColor: '#ADD8E6',
  },
  dayText: {
    color: 'black',
  },
  progressChart: {
    height: 200,
  },
  highlightTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  highlightsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  highlight: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1, 
    marginHorizontal: 5, 
  },
  highlightLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  highlightValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});


export default MyGoalScreen;
