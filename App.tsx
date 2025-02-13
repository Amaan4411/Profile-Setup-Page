import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import DropDownPicker from "react-native-dropdown-picker";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PasswordSettingsScreen from "./PasswordSettingsScreen";

const Stack = createStackNavigator();

import { StackNavigationProp } from '@react-navigation/stack';
type RootStackParamList = {
  ProfileSetup: undefined;
  PasswordSettings: undefined;
};

type ProfileSetupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProfileSetup'>;

const ProfileSetupScreen = ({ navigation }: { navigation: ProfileSetupScreenNavigationProp }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordPlaceholder, setPasswordPlaceholder] = useState("******");

  // Dropdown state
  const [open, setOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState("Male");
  const [genderOptions] = useState([
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Prefer not to say", value: "Prefer not to say" },
  ]);

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleContinue = () => {
    if (!name) {
      Alert.alert("Error", "Please fill in your name.");
      return;
    }
    if (!email) {
      Alert.alert("Error", "Please fill in your email.");
      return;
    }
    if (!password) {
      Alert.alert("Error", "Please fill in your password.");
      return;
    }
    if (!location) {
      Alert.alert("Error", "Please fill in your address.");
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert("Invalid Password", "Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character.");
      return;
    }
    // Navigate to Password Settings Screen
    navigation.navigate("PasswordSettings");
  };

  const getProfileImage = () => {
    switch (selectedGender) {
      case "Male":
        return require("./man.png");
      case "Female":
        return require("./wom.png");
      case "Prefer not to say":
        return require("./pnts.png");
      default:
        return require("./pnts.png");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={[styles.header, { marginLeft: -20, marginRight: -20, marginTop: -50, height: 160, borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }]}>
          <Icon name="account-circle" size={30} color="white" style={{ marginTop: -90 }} />
          <Text style={[styles.headerText, { marginTop: -90 }]}>Profile Setup</Text>
        </View>

        <View style={styles.profileImageContainer }>
          <Image source={getProfileImage()} style={[styles.profileImage,{marginTop:-65}]} />
        </View>

        {/* Full Name Input */}
        <Text style={styles.label}> Name</Text>
        <View style={styles.inputContainer}>
          <Icon name="account-box" size={25} color="#000" style={{ marginRight: 10 }} />
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter Name"
            placeholderTextColor="#555"
          />
        </View>

        {/* Email Input */}
        <Text style={styles.label}> Email</Text>
        <View style={styles.inputContainer}>
          <Icon name="email" size={25} color="#000" style={{ marginRight: 10 }} />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter Email"
            placeholderTextColor="#555"
          />
        </View>

        {/* Password Input */}
        <Text style={styles.label}> Password</Text>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={25} color="#000" style={{ marginRight: 10 }} />
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholder={passwordPlaceholder}
            placeholderTextColor="#555"
            style={[styles.input, { color: "#000" }]}
            onFocus={() => setPasswordPlaceholder("")}
            onBlur={() => setPasswordPlaceholder("******")}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon name={showPassword ? "visibility" : "visibility-off"} size={25} color="#000" style={{ marginRight: 10 }} />
          </TouchableOpacity>
        </View>

        {/* Gender Dropdown */}
        <Text style={styles.label}> Gender</Text>
        <View style={styles.inputContainer}>
          <Icon name="wc" size={25} color="#000" style={{ marginRight: 10 }} />
          <DropDownPicker
            open={open}
            value={selectedGender}
            items={genderOptions}
            setOpen={setOpen}
            setValue={setSelectedGender}
            style={[styles.dropdown, { width: "90%", borderColor: "transparent" }]}
            dropDownContainerStyle={[styles.dropdownBox, { width: "85%", borderColor: "#000" }]}
            placeholder="Select Gender"
            arrowIconStyle={{ marginRight: 5 }}
            zIndex={3000}
            zIndexInverse={1000}
          />
        </View>

        {/* Location */}
        <Text style={styles.label}> Address</Text>
        <View style={styles.inputContainer}>
          <Icon name="location-on" size={25} color="#000" style={{ marginRight: 10 }} />
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholder="Enter Address"
            placeholderTextColor="#555"
          />
        </View>

        {/* Continue Button */}
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue →</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
        <Stack.Screen name="PasswordSettings" component={PasswordSettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
  },
  headerText: {
    fontFamily: "Inter_18pt-Bold.ttf",
    fontWeight: "bold",
    color: "#fff",
    fontSize: 18,
    marginLeft: 10,
  },
  profileImageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ddd",
  },
  inputContainer: {
    
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f2994a",
    padding: 10,
    borderRadius: 90,
    marginVertical: 5,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#000",
  },
  button: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 90,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#f2994a",
    borderRadius: 10,
    padding: 10,
  },
  dropdownBox: {
    borderWidth: 1,
    borderColor: "#f2994a",
    borderRadius: 10,
  },
  label: {
    fontWeight: "bold",
    color: "#000",
    fontSize: 16,
    marginBottom: 5,
  },
});

export default App;
