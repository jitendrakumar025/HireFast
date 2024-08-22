import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Link, router } from "expo-router";

const Login = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNo: "",
  });

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {
    // Handle login logic
    const userType = "contractor";
    if (userType == "contractor") {
      router.push("/landing/contractor");
    } else {
      router.push("/landing/worker");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="light" />
      <View className="bg-orange-400 p-4 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <View className="flex-row gap-2 items-center">
            <Image
              className="h-8 w-8 rounded-md"
              source={require("../assets/icons/login.png")}
            />
            <Text className="text-white text-lg font-bold mr-2">Login</Text>
          </View>
        </View>
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
      <View className="flex-1 justify-center px-4 py-6 bg-red-50">
        <View className="bg-gray-50 h-30 mb-4 p-3">
          <View className="bg-green-100 rounded-lg p-3 mb-6">
            <Text className="text-center">Fill this form to login</Text>
          </View>

          <Text className="mb-2">Full Name:</Text>
          <View className="flex-row gap-0 justify-between">
            <View className="w-10 h-10 flex justify-center items-center bg-slate-200 mb-4 text-center left-1">
              <Image
                source={require("../assets/icons/user.png")}
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
                source={require("../assets/icons/call.png")}
                className="w-5 h-5"
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
          <TouchableOpacity
            className="bg-green-500 py-2 px-4 rounded-md"
            onPress={handleLogin}
          >
            <Text className="text-white text-center">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
