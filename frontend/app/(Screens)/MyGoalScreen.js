
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Circle, Svg, Text as SVGText, TSpan } from 'react-native-svg';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
    const screenWidth = Dimensions.get('window').width;
    const size = screenWidth * 0.9;
    const radius = size / 2;
    const stroke = radius * 0.1; 
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const progressInOz = (goalInOz * percentage) / 100;
    const progressDisplay = `${progressInOz.toFixed(1)} oz`;

    const rotation = 270; // make it start from top position
    const rotationTransform = `rotate(${rotation} ${radius} ${radius})`;

    return (
        <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
            <Circle
                stroke="#e6e6e6"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
            <Circle
                stroke="#00aaff"
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={`${circumference} ${circumference}`}
                style={{ strokeDashoffset }}
                strokeLinecap="round"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                transform={rotationTransform}
            />
           <SVGText
                x={radius}
                y={radius}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={`${radius * 0.2}px`}
                fill="black"
            >
                {progressDisplay}
                <TSpan
                    x={radius * 0.85}
                    dy={`${radius * 0.2}px`} 
                    fontSize={`${radius * .1}px`}
                >
                    Goal {goalInOz} oz
                </TSpan>
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
    <SafeAreaView style={styles.container}>
      <ScrollView>
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

      </ScrollView>
    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Use flex to fill the screen
    padding: 10,
    margin: 0,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: 'white',
  },
  highlightsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  highlight: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 5,
    minHeight: 60,
    maxHeight: 120,
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
    padding: 15,
    width: '100%',
    borderRadius: 25,
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
    fontSize: 14,
  },
  highlightTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
});




export default MyGoalScreen;
