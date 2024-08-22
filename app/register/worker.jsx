import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ToastAndroid,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Link, useRouter } from "expo-router";

const WorkerRegistration = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    mobileNo: "",
    currentAddress: "",
    villageAddress: "",
    sameAsCurrentAddress: false,
    photo: null,
    aadhaar: null,
  });

  const [reqErrors, setReqErrors] = useState({
    fullName: false,
    age: false,
    mobileNo: false,
    currentAddress: false,
    villageAddress: false,
    photo: false,
    aadhaar: false,
    workOptions: false,
  });

  const handleInputChange = (name, value) => {
    setReqErrors((prev) => ({ ...prev, [name]: false }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (formData.sameAsCurrentAddress) {
      setReqErrors((prev) => ({ ...prev, villageAddress: false }));
      setFormData((prev) => ({ ...prev, villageAddress: formData.currentAddress }));
    }
  }, [formData.sameAsCurrentAddress]);

  const handleNext = async () => {
    if (!formData.fullName) {
      setReqErrors((prev) => ({ ...prev, fullName: true }));
      return;
    }
    if (!formData.age) {
      setReqErrors((prev) => ({ ...prev, age: true }));
      return;
    }
    if (!formData.mobileNo) {
      setReqErrors((prev) => ({ ...prev, mobileNo: true }));
      return;
    }
    if (!formData.currentAddress) {
      setReqErrors((prev) => ({ ...prev, currentAddress: true }));
      return;
    }
    if (!formData.villageAddress && !formData.sameAsCurrentAddress) {
      setReqErrors((prev) => ({ ...prev, villageAddress: true }));
      return;
    }
    console.log("Form Data", formData);
    router.push({
      pathname: "register/worker-other-info",
      params: { formData: JSON.stringify(formData) },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="light" />
      <View className="bg-orange-400 p-4 flex-row justify-between items-center">
        <View className="flex-row gap-2 items-center">
          <Image
            className="h-8 w-8 rounded-md"
            source={require("../../assets/images/worker.png")}
          />
          <Text className="text-white text-lg font-bold mr-2">
            Registration
          </Text>
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

      <ScrollView className="flex-1 px-4 pt-4">
        <View className="bg-green-100 rounded-lg p-3 mb-6">
          <Text className="text-center">Fill this form to register</Text>
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
        {reqErrors.fullName && (
          <Text className="text-red-500 text-sm mb-2">Name field required</Text>
        )}

        <View className="flex-row justify-between mb-4">
          <View className="mr-2">
            <Text className="mb-2">Age:</Text>
            <TextInput
              className="border border-gray-300 w-[120px] rounded-md px-2 py-1 mb-4"
              placeholder="Enter Your Age"
              keyboardType="numeric"
              value={formData.age}
              onChangeText={(text) => handleInputChange("age", text)}
            />
            {reqErrors.age && (
              <Text className="text-red-500 text-sm mb-2">
                Age field required
              </Text>
            )}
          </View>
          <View className="flex-1 ml-2">
            <Text className="mb-2">Mobile No:</Text>
            <View className="flex-row gap-0 justify-between">
              <View className="w-10 h-10 flex justify-center items-center bg-slate-200 mb-4 text-center left-1">
                <Image
                  source={require("../../assets/icons/call.png")}
                  className="w-5 h-5 "
                />
              </View>
              <TextInput
                className="border flex-1 border-gray-300 rounded-md px-2 py-1 mb-4 border-l-0"
                placeholder="Enter your mobile no."
                keyboardType="phone-pad"
                value={formData.mobileNo}
                onChangeText={(text) => handleInputChange("mobileNo", text)}
              />
            </View>
            {reqErrors.mobileNo && (
              <Text className="text-red-500 text-sm mb-2">
                Mobile No. field required
              </Text>
            )}
          </View>
        </View>

        <Text className="mb-2">Current Address:</Text>
        <TextInput
          className="border border-gray-300 rounded-md p-1 mb-4"
          placeholder="Enter Your Current Address"
          multiline
          numberOfLines={3}
          value={formData.currentAddress}
          onChangeText={(text) => handleInputChange("currentAddress", text)}
        />
        {reqErrors.currentAddress && (
          <Text className="text-red-500 text-sm mb-2">
            Current Address field required
          </Text>
        )}

        <View className="flex-row mb-2 gap-5">
          <Text className="">Village Address:</Text>
          <View className="flex-row items-center mb-4">
            <TouchableOpacity
              onPress={() =>
                handleInputChange(
                  "sameAsCurrentAddress",
                  !formData.sameAsCurrentAddress
                )
              }
              className="flex-row items-center"
            >
              <View className="w-5 h-5 border border-gray-400 mr-1 flex justify-center items-center rounded">
                <View
                  className={`w-4 h-4 rounded ${
                    formData.sameAsCurrentAddress ? "bg-blue-500" : "bg-white"
                  }`}
                />
              </View>
              <Text>Same As Current Address</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TextInput
          className="border border-gray-300 rounded-md p-2 mb-6"
          placeholder="Enter Your Village Address"
          multiline
          numberOfLines={3}
          value={
            formData.sameAsCurrentAddress
              ? formData.currentAddress
              : formData.villageAddress
          }
          onChangeText={(text) => handleInputChange("villageAddress", text)}
          editable={!formData.sameAsCurrentAddress}
        />
        {reqErrors.villageAddress && (
          <Text className="text-red-500 text-sm mb-2">
            Village Address field required
          </Text>
        )}

        <View className="flex-row gap-5 justify-between items-center">
          <TouchableOpacity
            className="bg-blue-500 py-2 px-4 rounded-md"
            onPress={() => router.back()}
          >
            <Text className="text-white text-center text-lg font-semibold">
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-green-500 py-2 px-4 rounded-md mt-4"
            onPress={() => handleNext()}
          >
            <Text className="text-white text-center text-lg font-semibold">
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkerRegistration;
