import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import WorkerCard from "../../components/WorkerCard";
import { StatusBar } from "expo-status-bar";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const ContractorLanding = () => {
  const [searchQuery, setSearchQuery] = useState("");

  //TODO: get chawks list from dataset

  const [chawks, setChawks] = useState([
    { id: "1", name: "Labour chawk 1" },
    { id: "2", name: "Labour chawk 2" },
    { id: "3", name: "Labour chawk 3" },
  ]);

  const handleChawkSelect = (chawkId, chawkName) => {
    router.push({ pathname: "workersList", params: { chawkId, chawkName } });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="light" />
      <View className="bg-orange-400 p-4 flex-row justify-between items-center">
        <View className="border rounded-full p-1 ">
          <Image
            source={require("../../assets/icons/user.png")}
            className="w-5 h-5 "
          />
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

      <View className="p-4 m-4 bg-slate-200">
        <Text className="text-lg">
          To find workers, please select a labour chawk from the list below
        </Text>
      </View>

      <View className="p-4">
        <View className="flex-row items-center bg-gray-100 rounded-md p-2 mb-4">
          <Ionicons name="search" size={20} color="gray" />
          <TextInput
            className="flex-1 ml-2"
            placeholder="Search for nearby labour chawk"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== "" && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Text className="text-blue-500">Cancel</Text>
            </TouchableOpacity>
          )}
        </View>

        <FlatList
          data={chawks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="flex-row items-center p-3 border-b border-gray-200 bg-slate-50"
              onPress={() => handleChawkSelect(item.id, item.name)}
            >
              <Ionicons name="location-outline" size={20} color="black" />
              <Text className="ml-2">{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default ContractorLanding;
