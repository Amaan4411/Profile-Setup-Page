import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions, Linking, Platform } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import EditProfileScreen from "./screens/EditProfileScreen";
import PrivacyPolicyScreen from "./screens/PrivacyPolicyScreen";

const { width } = Dimensions.get("screen");
const CURVE_HEIGHT = 150;
const Stack = createNativeStackNavigator();

interface ProfileData {
  fullName: string;
  nickName: string;
  email: string;
  phoneNumber: string;
  country: string;
  genre: string;
  address: string;
}

const ProfileScreen = ({ navigation, route }: any) => {
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: "Puerto Rico",
    nickName: "puerto_rico",
    email: "youremail@domain.com",
    phoneNumber: "123-456-7890",
    country: "United States",
    genre: "Female",
    address: "45 New Avenue, New York",
  });

  const [notificationEnabled, setNotificationEnabled] = useState<boolean>(false);

  // Handle notification settings
  const handleNotificationSettings = async () => {
    try {
      if (Platform.OS === 'ios') {
        await Linking.openURL('app-settings:');
      } else {
        await Linking.openSettings();
      }
      // Toggle the notification state when settings are opened
      setNotificationEnabled(!notificationEnabled);
    } catch (error) {
      console.log('Error opening settings:', error);
    }
  };

  // Update profile data when returning from edit screen
  useEffect(() => {
    if (route.params?.updatedProfile) {
      setProfileData(route.params.updatedProfile);
    }
  }, [route.params?.updatedProfile]);

  const handleEditProfile = () => {
    navigation.navigate('EditProfile', { profileData });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Curved Top Bar */}
        <View style={styles.curvedTopBar}>
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={handleNotificationSettings}>
              <Icon 
                name={notificationEnabled ? "notifications" : "notifications-off"} 
                size={28} 
                color="#FFF" 
              />
            </TouchableOpacity>
            {/* <Icon name="history" size={28} color="#FFF" /> */}
            <Icon name="more-vert" size={28} color="#FFF" />
          </View>
        </View>
        
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileBackground}>
            <Image source={require("./profile.png")} style={styles.profileImage} />
            <TouchableOpacity style={styles.editIcon}>
              <Icon name="edit" size={20} color="#000" />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>{profileData.fullName}</Text>
          <Text style={styles.profileInfo}>{profileData.email} | {profileData.phoneNumber}</Text>
        </View>

        {/* Settings Sections */}
        <View style={styles.settingsContainer}>
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={handleEditProfile}
          >
            <Icon name="person" size={24} color="#000" />
            <Text style={styles.settingText}>Edit profile information</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.settingItem}
            onPress={handleNotificationSettings}
          >
            <Icon name={notificationEnabled ? "notifications" : "notifications-off"} size={24} color="#000" />
            <Text style={styles.settingText}>Notifications</Text>
            <Text style={styles.settingValue}>{notificationEnabled ? 'On' : 'Off'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Icon name="language" size={24} color="#000" />
            <Text style={styles.settingText}>Language</Text>
            <Text style={styles.settingValue}>English</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.settingsContainer}>
          <TouchableOpacity style={styles.settingItem}>
            <Icon name="security" size={24} color="#000" />
            <Text style={styles.settingText}>Security</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Icon name="brightness-6" size={24} color="#000" />
            <Text style={styles.settingText}>Theme</Text>
            <Text style={styles.settingValue}>Light mode</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.settingsContainer}>
          <TouchableOpacity style={styles.settingItem}>
            <Icon name="help-outline" size={24} color="#000" />
            <Text style={styles.settingText}>Help & Support</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Icon name="mail-outline" size={24} color="#000" />
            <Text style={styles.settingText}>Contact us</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => navigation.navigate('PrivacyPolicy')}
          >
            <Icon name="lock-outline" size={24} color="#000" />
            <Text style={styles.settingText}>Privacy policy</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="EditProfile" 
          component={EditProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="PrivacyPolicy" 
          component={PrivacyPolicyScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7F9" },
  scrollContainer: { paddingBottom: 50 },
  curvedTopBar: {
    width: width,
    height: CURVE_HEIGHT,
    backgroundColor: "#F47551",
    borderBottomLeftRadius: CURVE_HEIGHT / 2,
    borderBottomRightRadius: CURVE_HEIGHT / 2,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
  },
  headerIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 10,
  },
  profileSection: { alignItems: "center", marginTop: -50 },
  profileBackground: { 
    width: 130, 
    height: 130, 
    borderRadius: 65, 
    backgroundColor: "#E8EDF1", 
    alignItems: "center", 
    justifyContent: "center", 
    position: "relative"
  },
  profileImage: { width: 110, height: 110, borderRadius: 55 },
  editIcon: { 
    position: "absolute", 
    bottom: 5, 
    right: 5, 
    backgroundColor: "#FFF", 
    padding: 5, 
    borderRadius: 15
  },
  profileName: { fontSize: 22, fontWeight: "bold", marginTop: 10 },
  profileInfo: { color: "gray", marginTop: 3 },
  settingsContainer: { backgroundColor: "#FFF", margin: 10, borderRadius: 10, padding: 10 },
  settingItem: { flexDirection: "row", alignItems: "center", padding: 15 },
  settingText: { flex: 1, fontSize: 16, marginLeft: 10 },
  settingValue: { fontSize: 16, color: "#F47551" },
});

export default App;