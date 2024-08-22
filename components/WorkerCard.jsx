import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const WorkerCard = ({ worker }) => {
  const { name, age,contact, experience, domains, rating, reviewCount, isAvailable } = worker;

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? 'star' : 'star-outline'}
          size={16}
          color={i <= rating ? '#FFD700' : '#D3D3D3'}
        />
      );
    }
    return stars;
  };

  const handleContactPress = () => {
    const phoneNumber = `tel:${contact}`;
    Linking.openURL(phoneNumber).catch(err => 
      console.error('Failed to open dialer:', err)
    );
  };

  return (
    <View className="bg-gray-100 rounded-lg p-4 mx-10 my-3 shadow-md">
      <View className="flex-row gap-9">
        <Ionicons name="person" size={80} color="black" />
        <View className="ml-4">
          <Text className="text-lg font-bold">Name: {name}</Text>
          <Text>Age: {age}</Text>
          <Text>Experience: {experience}yr</Text>
        </View>
      </View>
      <Text className="mt-2">Domain: {domains?.join(', ')}</Text>
      <View className="flex-row items-center mt-2">
        {renderStars()}
        <Ionicons name="person" size={16} color="black" className="ml-2" />
        <Text className="ml-1">{reviewCount}</Text>
      </View>
      <View className="flex-row justify-between mt-4">
        <View
          className={`flex-row items-center justify-center px-4 py-2 rounded-full ${
            isAvailable ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          <Ionicons
            name={isAvailable ? 'checkmark-circle' : 'close-circle'}
            size={18}
            color="white"
          />
          <Text className="text-white ml-2">
            {isAvailable ? 'Available' : 'Unavailable'}
          </Text>
        </View>
        <TouchableOpacity className="flex-row items-center justify-center px-4 py-2 rounded-full bg-orange-500" onPress={handleContactPress}>
          <Ionicons name="call" size={18} color="white" />
          <Text className="text-white ml-2">Contact</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WorkerCard;