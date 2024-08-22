import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Picker } from "@react-native-picker/picker";
import WorkerCard from "../components/WorkerCard";
import { Ionicons } from "@expo/vector-icons";

const workersList = () => {
  const { chawkId,chawkName } = useLocalSearchParams();
  const [selectedWork, setSelectedWork] = useState("");
  const [workers, setWorkers] = useState([]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);

  const workTypes = [
    { label: "Mistri", value: "mistri", count: 12 },
    { label: "Painter", value: "painter", count: 8 },
    { label: "Loader/Unloader", value: "loader", count: 15 },
    { label: "Helper", value: "helper", count: 20 },
    { label: "Plumber", value: "plumber", count: 5 },
    { label: "Foundation Digging", value: "digging", count: 10 },
  ];

  useEffect(() => {
    // Fetch workers data based on chawkId and selectedWork
    // This is a mock implementation
    setWorkers([
      {
        id: "1",
        name: "Mukesh",
        age: 32,
        experience: 10,
        domains: ["Mistri", "Painter"],
        rating: 3,
        reviewCount: 52,
        isAvailable: false,
        contact: "1234567890",
      },
      {
        id: "2",
        name: "Raj",
        age: 32,
        experience: 9,
        domains: ["Helper", "Painter"],
        rating: 4,
        reviewCount: 110,
        isAvailable: true,
        contact: "1234567890",
      },
      {
        id: "3",
        name: "Ravi",
        age: 32,
        experience: 9,
        domains: ["Loader/Unloader", "Painter"],
        rating: 4,
        reviewCount: 110,
        isAvailable: true,
        contact: "1234567890",
      },
      {
        id: "4",
        name: "Rahul",
        age: 32,
        experience: 9,
        domains: ["Helper", "Painter"],
        rating: 4,
        reviewCount: 110,
        isAvailable: true,
        contact: "1234567890",
      },
      {
        id: "5",
        name: "Rajesh",
        age: 32,
        experience: 9,
        domains: ["Helper", "Painter"],
        rating: 4,
        reviewCount: 110,
        isAvailable: true,
        contact: "1234567890",
      },
      {
        id: "6",
        name: "Resh",
        age: 32,
        experience: 9,
        domains: ["Helper", "Painter"],
        rating: 4,
        reviewCount: 110,
        isAvailable: false,
        contact: "1234567890",
      },
      {
        id: "7",
        name: "Resh",
        age: 32,
        experience: 9,
        domains: ["Helper", "Painter"],
        rating: 4,
        reviewCount: 110,
        isAvailable: false,
        contact: "1234567890",
      },
    ]);
  }, [chawkId]);

  useEffect(() => {
    if (selectedWork) {
      const selectedWorkLabel = workTypes.find(
        (work) => work.value === selectedWork
      )?.label;
      const filtered = workers.filter((worker) =>
        worker.domains.includes(selectedWorkLabel)
      );
      setFilteredWorkers(filtered);
    } else {
      setFilteredWorkers(workers);
    }
  }, [selectedWork, workers]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="light" />
      <View className="bg-orange-400 p-4 flex-row justify-between items-center">
        <View className="border rounded-full p-1 ">
          <Image
            source={require("../assets/icons/user.png")}
            className="w-5 h-5 "
          />
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
      <View className=" flex-1 p-2">
        <TouchableOpacity className="flex-row m-2 w-20 items-center border rounded-md" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color="black" />
          <Text className="text-md">Go Back</Text>
        </TouchableOpacity>
        <View className="p-3 bg-green-200 rounded-md items-center">
          <Text className="text-lg">
            Registered Workers at labour chawk {chawkName}
          </Text>
        </View>
        
        <Text className="m-2">Select the work type</Text>
        <View className="border border-gray-300 rounded-md mb-4">
          <Picker
            selectedValue={selectedWork}
            onValueChange={(itemValue) => {
              setSelectedWork(itemValue);
            }}
          >
            <Picker.Item label="Select" value="" />
            {workTypes.map((work) => (
              <Picker.Item
                key={work.value}
                label={`${work.label} (${work.count})`}
                value={work.value}
              />
            ))}
          </Picker>
        </View>
        <View className="p-3 flex-row bg-red-50">
          <Ionicons name="information-circle" size={20} color="red" />
          <Text className="text-sm text-gray-400">
            Note:To hire a worker click on contact and call the worker
          </Text>
        </View>
        <FlatList
          data={filteredWorkers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <WorkerCard worker={item} />}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default workersList;
