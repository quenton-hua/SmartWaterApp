
import { SafeAreaView, FlatList, StyleSheet, View, Text } from 'react-native'
import React from 'react'

const LeaderboardScreen = () => {
  const users = [
    { id: 1, name: "Khan", score: 0.90 },
    { id: 2, name: "Quenton", score: 0.75 },
    { id: 3, name: "Hyder", score: 0.55 },
    { id: 4, name: "Jacob", score: 0.25 },
  ];

  // Sort users by score in descending order
  const sortedUsers = users.sort((a, b) => b.score - a.score);

  const renderItem = ({ item, index}) => (
    <View style={[styles.item, index === 0 ? styles.firstPlace : index === 1 ? styles.secondPlace : index === 2 ? styles.thirdPlace: null]}>
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.barContainer}>
        <View style={[styles.filledBar, { width: `${item.score * 100}%` }]} />
      </View>
      <Text style={styles.score}>{(item.score * 100).toFixed(0)}%</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={sortedUsers}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10, // Optional: if you want rounded corners
  },
  name: {
    fontSize: 18,
    alignSelf: 'flex-start',
  },
  score: {
    fontSize: 18,
    // Ensures the score text is positioned below the bar and left-justified.
  },
  name: {
    fontSize: 18,
    flex: 0.5, // Adjusted for alignment
  },
  barContainer: {
    height: 25,
    flex: 1, // Adjusted for alignment
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    borderRadius: 25,
    marginHorizontal: 20, // Added for spacing
    overflow: 'hidden', // Ensures the filledBar does not overflow the container
  },
  filledBar: {
    backgroundColor: '#337cff',
    height: '100%',
    borderRadius: 10,
  },
  firstPlace: {
    borderColor: '#ffd700',
    borderWidth: 2,
  },
  secondPlace: {
    borderColor: 'silver',
    borderWidth: 2,
  },
  thirdPlace: {
    borderColor: '#c55a0e',
    borderWidth: 2,
  },
});


export default LeaderboardScreen