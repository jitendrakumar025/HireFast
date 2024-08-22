import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, ToastAndroid } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import { Link, router, useLocalSearchParams } from "expo-router";
import axios from "axios";

const WorkerOtherInfo = () => {
  const {formData}=useLocalSearchParams();
  const [photoImage, setPhotoImage] = useState(null);
  const [aadharFile, setAadharFile] = useState(null);
  const [reqErrors, setReqErrors] = useState({
    photo: false,
    aadhaar: false,
    workOptions: false,
  });
  const parsedFormData = formData ? JSON.parse(formData) : {};
  const [extendedFormData, setFormData] = useState(parsedFormData);
  const [selectedWorks, setSelectedWorks] = useState([]);
   
  const workOptions = [
    "Mistri",
    "Painter",
    "Loader/Unloader",
    "Helper",
    "Plumber",
    "Foundation Digging",
  ];

  // useEffect(() => {
  //     console.log("Extended Form Data",extendedFormData);
  // },[extendedFormData]);

  useEffect(() => {
    if (photoImage) {
      setReqErrors((prev) => ({ ...prev, photo: false }));
      setFormData((prev) => ({ ...prev, photo: photoImage }));
    }
  }, [photoImage]);

  useEffect(() => {
    if (aadharFile) {
      setReqErrors((prev) => ({ ...prev, aadhaar: false }));
      setFormData((prev) => ({ ...prev, aadhaar: aadharFile }));
    }
  }, [aadharFile]);

  const toggleWorkSelection = (work) => {
    setSelectedWorks((prev) =>
      prev.includes(work)
        ? prev.filter((item) => item !== work)
        : [...prev, work]
    );
  };

  const pickAadharImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAadharFile({
        name: result.assets[0].uri.split("/").pop(),
        uri: result.assets[0].uri,
      });
    }
  };

  const removeFile = () => {
    setAadharFile(null);
  };

  const pickImage = async (setImage) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotoImage(result.assets[0].uri);
    }
  };

  const handleRegister = async() => {
    if (selectedWorks.length === 0) {
      setReqErrors((prev) => ({ ...prev, workOptions: true }));
      return;
    }
    if (!photoImage) {
      setReqErrors((prev) => ({ ...prev, photo: true }));
      return;
    }
    if (!aadharFile) {
      setReqErrors((prev) => ({ ...prev, aadhaar: true }));
      return;
    }
    console.log("Form Data", extendedFormData);
    try {
       const response=await axios.post("http://localhost:5000/register/worker",extendedFormData);

      console.log("Response", response.data);
    } catch (error) {
      console.error("Registration Failed", error);
       ToastAndroid.showWithGravity("Registration Failed", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    }
  }

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

      <ScrollView className="flex-1 px-4 flex-grow">
        <Text className="text-xl font-semibold mb-4">Other Information</Text>
        <Text className="mb-2">Choose Type of Work:</Text>
        <View className="border border-gray-300 rounded-md mb-4">
          {workOptions.map((work, index) => (
            <TouchableOpacity
              key={index}
              className={`flex-row items-center p-3 border-b border-gray-200 ${
                index === workOptions.length - 1 ? "border-b-0" : ""
              }`}
              onPress={() => toggleWorkSelection(work)}
            >
              <View className="w-5 h-5 border border-gray-400 mr-1 flex justify-center items-center rounded">
                <View
                  className={`w-4 h-4 rounded ${
                    selectedWorks.includes(work) ? "bg-blue-500" : "bg-white"
                  }`}
                />
              </View>

              <Text>{work}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {reqErrors.workOptions && (
          <Text className="text-red-500 text-sm mb-2">Work field required</Text>
        )}

        <View>
          <Text className="mb-2">Upload Aadhaar:</Text>
          <View className="flex-row items-center mb-4">
            <TouchableOpacity
              className="bg-gray-200 py-2 px-4 rounded-md flex-1"
              onPress={pickAadharImage}
            >
              <View className="flex-row gap-4 items-center justify-center">
                <Text className="text-black text-center">
                  Click Here to upload
                </Text>
                <Image
                  source={require("../../assets/icons/image-upload.png")}
                  className="w-6 h-6"
                />
              </View>
            </TouchableOpacity>
            {aadharFile && (
              <TouchableOpacity
                className="ml-2 bg-red-500 p-2 rounded-full"
                onPress={removeFile}
              >
                <Text className="text-white font-bold">X</Text>
              </TouchableOpacity>
            )}
          </View>
          {aadharFile && (
            <View className="bg-gray-100 p-2 rounded-md mb-4">
              <Text className="text-sm">{aadharFile.name}</Text>
            </View>
          )}
           {reqErrors.aadhaar && (
            <Text className="text-red-500 text-sm mb-2">Aadhaar field required</Text>)}
        </View>

        <Text className="mb-2">Take Photo:</Text>
        <View className="flex-row justify-between mb-4">
          <TouchableOpacity
            className="bg-blue-500  py-2 px-2 rounded-md flex-1 mr-2"
            onPress={takePhoto}
          >
            <View className="flex-row gap-2 items-center justify-center">
              <Text className="text-white text-center">Open Camera</Text>
              <Image
                source={require("../../assets/icons/camera.png")}
                className="w-6 h-6"
              />
            </View>
          </TouchableOpacity>
          <Text className="self-center">OR</Text>
          <TouchableOpacity
            className="bg-blue-500 py-2 px-4 rounded-md flex-1 ml-2"
            onPress={() => pickImage(setPhotoImage)}
          >
            <View className="flex-row gap-4 items-center justify-center">
              <Text className="text-white text-center">Upload</Text>
              <Image
                source={require("../../assets/icons/image-upload.png")}
                className="w-6 h-6"
              />
            </View>
          </TouchableOpacity>
        </View>
        {photoImage && (
          <Image source={{ uri: photoImage }} className="w-full h-40 mb-4" />
        )}
        {reqErrors.photo && (
          <Text className="text-red-500 text-sm mb-2">Photo field required</Text>
        )}

        <View className="flex flex-row gap-5 py-3 justify-between items-center">
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
            onPress={() => handleRegister()}
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

export default WorkerOtherInfo;
