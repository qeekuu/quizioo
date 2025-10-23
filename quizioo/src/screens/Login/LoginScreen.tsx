import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./LoginScreen.styles";

export default function LoginScreen() {
  const [count, setCount] = useState(0);

  const handleSignIn = () => Alert.alert("Sign In clicked");
  const handleSignUp = () => Alert.alert("Sign Up clicked");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Sign In</Text>

        <TextInput style={styles.input} placeholder="e-mail" keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="password" secureTextEntry />

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

