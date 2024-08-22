import { View, Text } from 'react-native'
import React from 'react'
import WorkerCard from '../../components/WorkerCard';

const WorkerLanding = () => {

  const workerData = {
    name: 'Ram',
    age: 32,
    experience: 9,
    domains: ['Helper', 'Painter'],
    rating: 4,
    reviewCount: 110,
    isAvailable: false,
  };

  return (
    <View >
      <WorkerCard worker={workerData} />
    </View>
  );
}

export default WorkerLanding