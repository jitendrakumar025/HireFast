import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Link, router } from "expo-router";

const ContractorRegistration = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNo: "",
    currentAddress: "",
  });

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = () => {
    // Handle registration logic
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="light" />
      <View className="bg-orange-400 p-4 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <View className="flex-row gap-2 items-center">
            <Image
              className="h-8 w-8 rounded-md"
              source={require("../../assets/images/contractor.png")}
            />
            <Text className="text-white text-lg font-bold mr-2">
              Registration
            </Text>
          </View>
        </View>
        <Link href="/language_choose" asChild>
          <TouchableOpacity>
            <View className="bg-white px-3 py-2 rounded-full flex-row items-start justify-center">
              <Text className="text-Black">Change Language</Text>
              <Image
                source={require("../../assets/icons/languages.png")}
                className="w-4 h-4 ml-2"
              />
            </View>
          </TouchableOpacity>
        </Link>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="border border-gray-300 rounded-lg p-3 mb-6">
          <Text className="text-center">
            Fill this form to register as a contractor
          </Text>
        </View>

        <Text className="mb-2">Full Name:</Text>
        <View className="flex-row gap-0 justify-between">
          <View className="w-10 h-10 flex justify-center items-center bg-slate-200 mb-4 text-center left-1">
            <Image
              source={require("../../assets/icons/user.png")}
              className="w-5 h-5 "
            />
          </View>
          <TextInput
            className="border flex-1 border-gray-300 rounded-md px-2 py-1 mb-4 border-l-0"
            placeholder="Enter Your Full Name"
            value={formData.fullName}
            onChangeText={(text) => handleInputChange("fullName", text)}
          />
        </View>

        <Text className="mb-2">Mobile No:</Text>
        <View className="flex-row gap-0 justify-start">
          <View className="w-10 h-10 flex justify-center items-center bg-slate-200 mb-4 text-center left-1">
            <Image
              source={require("../../assets/icons/call.png")}
              className="w-5 h-5 "
            />
          </View>
          <TextInput
            className="border  border-gray-300 rounded-md px-2 py-1 mb-4 border-l-0"
            placeholder="Enter your mobile no."
            keyboardType="phone-pad"
            value={formData.mobileNo}
            onChangeText={(text) => handleInputChange("mobileNo", text)}
          />
        </View>

        <Text className="mb-2">Current Address:</Text>
        <TextInput
          className="border border-gray-300 rounded-md p-2 mb-6"
          placeholder="Enter Your Current Address"
          multiline
          numberOfLines={3}
          value={formData.currentAddress}
          onChangeText={(text) => handleInputChange("currentAddress", text)}
        />

        <View className="flex flex-row gap-5 mt-8 justify-between items-center">
          <TouchableOpacity
            className="bg-blue-500 py-2 px-4 rounded-md"
            onPress={() => router.back()}
          >
            <Text className="text-white text-center text-lg font-semibold">
              Back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-green-500 py-2 px-4 rounded-md mt-4"
            onPress={() => {
              /* Handle registration */
            }}
          >
            <Text className="text-white text-center text-lg font-semibold">
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContractorRegistration;
