import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

const Home = () => {
  return (
    <View className="flex-1 bg-white mt-7">
      <StatusBar style="light" />
      <View className="bg-orange-400 p-2 flex-row justify-between items-center">
        <Text className="text-white text-lg font-bold">HOME</Text>
        <Link href="/language_choose" asChild>
          <TouchableOpacity>
            <View className="bg-white px-3 py-2 rounded-full flex-row items-start justify-center">
              <Text className="text-Black">Change Language</Text>
              <Image
                source={require("../assets/icons/languages.png")}
                className="w-4 h-4 ml-2"
              />
            </View>
          </TouchableOpacity>
        </Link>
      </View>

      <ScrollView className="p-2 flex-1">
        <Text className="text-green-600 text-center text-xl mb-4 px-8">
          Welcome! Find work or hire workers - easy and quick!
        </Text>

        <View className="bg-gray-200 h-30 mb-4 justify-center items-center">
          <Image source={require("../assets/images/IndianFlag.jpg")} />
        </View>

        <View className="mb-4">
          <Text className="mb-2 text-center">Already Registered ?</Text>
          <Link href="/login" asChild>
            <TouchableOpacity className="bg-blue-500 py-2 px-4 rounded-md">
              <Text className="text-white text-center">Login</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <Text className="mb-4 px-9 text-center">
          If you are not registered on the app Register Below
        </Text>

        <Text className="mb-2">Register As:</Text>
        <View className="flex-row justify-between">
          <Link href="/register/worker" asChild>
            <TouchableOpacity className="bg-green-500 py-2 px-4 rounded-md flex-1 mr-2 flex-row items-center justify-center">
              <Image
                source={require("../assets/images/worker.png")}
                className="w-6 h-6 mr-2"
              />
              <Text className="text-white">Worker</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/register/contractor" asChild>
            <TouchableOpacity className="bg-green-500 py-2 px-4 rounded-md flex-1 ml-2 flex-row items-center justify-center">
              <Image
                source={require("../assets/images/contractor.png")}
                className="w-6 h-6 mr-2"
              />
              <Text className="text-white">Contractor</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
