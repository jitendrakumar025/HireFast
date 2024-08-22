import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const languages = [
  { name: "हिन्दी", english: "Hindi" },
  { name: "বাংলা", english: "Bangla" },
  { name: "ଓଡ଼ିଆ", english: "Odiya" },
  { name: "मराठी", english: "Marathi" },
  { name: "ಕನ್ನಡ", english: "Kannada" },
  { name: "English", english: "English" },
];

const ChooseLanguage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("Hindi");

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="light" />
      <TouchableOpacity
        className="bg-blue-500 flex-row justify-center items-center py-1 w-40 px-3 mx-3 rounded-md"
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
        <Text className="text-white text-center text-lg font-semibold">
          Go Back
        </Text>
      </TouchableOpacity>
      <ScrollView className="flex-1 px-4 py-6">
        <View className="bg-orange-400 rounded-lg p-4 mb-6">
          <Text className="text-xl text-center font-semibold">
            Choose Your Language
          </Text>
        </View>

        {languages.map((lang, index) => (
          <TouchableOpacity
            key={index}
            className="flex-row justify-between items-center py-3 border-b border-gray-200"
            onPress={() => setSelectedLanguage(lang.english)}
          >
            <Text className="text-lg">
              {lang.name}{" "}
              <Text className="text-gray-500">({lang.english})</Text>
            </Text>
            <View
              className={`w-6 h-6 rounded-full border-2 ${
                selectedLanguage === lang.english
                  ? "bg-blue-500 border-blue-500"
                  : "border-gray-400"
              }`}
            >
              {selectedLanguage === lang.english && (
                <View className="w-3 h-3 bg-white rounded-full m-auto" />
              )}
            </View>
          </TouchableOpacity>
        ))}

        {/* <Link href="/">
        <TouchableOpacity className="bg-green-500 py-3 rounded-md mt-6">
          <Text className="text-white text-center text-lg font-semibold">Confirm</Text>
        </TouchableOpacity>
        </Link> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChooseLanguage;
