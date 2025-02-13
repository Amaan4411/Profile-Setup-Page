import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const PasswordSettingsScreen = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={30} color="#000"  />
        </TouchableOpacity>
        <Text style={styles.headerText}>Password Settings</Text>
      </View>

      {/* Current Password */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Current Password</Text>
        <View style={styles.passwordWrapper}>
          <TextInput
            style={styles.input}
            secureTextEntry={!showPassword.current}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="************"
          />
          <TouchableOpacity onPress={() => setShowPassword({ ...showPassword, current: !showPassword.current })}>
            <Icon name={showPassword.current ? "eye-slash" : "eye"} size={20} color="#000" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {/* New Password */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>New Password</Text>
        <View style={styles.passwordWrapper}>
          <TextInput
            style={styles.input}
            secureTextEntry={!showPassword.new}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="************"
          />
          <TouchableOpacity onPress={() => setShowPassword({ ...showPassword, new: !showPassword.new })}>
            <Icon name={showPassword.new ? "eye-slash" : "eye"} size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Confirm New Password */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm New Password</Text>
        <View style={styles.passwordWrapper}>
          <TextInput
            style={styles.input}
            secureTextEntry={!showPassword.confirm}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="************"
          />
          <TouchableOpacity onPress={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}>
            <Icon name={showPassword.confirm ? "eye-slash" : "eye"} size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Change Password Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
    </View>
  ); 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  backButton: {
    marginLeft: -20,
    position: "absolute",
    top: 20,
    left: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 20,
  },
  inputContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    borderRadius: 8,
    height: 45,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: 5,
    color: "#555",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#FECACA",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 20,
    marginTop: 30,
  },
  buttonText: {
    fontSize: 16,
    color: "#D97706",
    fontWeight: "bold",
  },
});

export default PasswordSettingsScreen;
