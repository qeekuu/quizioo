import React, { useRef, useState } from "react";
import {Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View, Image, Pressable,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, styles } from "./LoginScreen.styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/RootNavigator";
import { useNavigation } from "@react-navigation/native";

type Nav = NativeStackNavigationProp<RootStackParamList, "Login">;

export default function LoginScreen() {
  const navigation = useNavigation<Nav>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);

  const passwordRef = useRef<TextInput>(null);

  const handleSignIn = () => navigation.navigate("Home");
  const handleSignUp = () => navigation.navigate("Register");
  const handleForgot = () => Alert.alert("Forgot password");

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
          <Image
            style={styles.logo}
            source={require("../../../assets/quizio.png")}
            resizeMode="contain"
          />

          <View style={styles.card}>
            <Text style={styles.h1}>Welcome back 👋</Text>
            <Text style={styles.sub}>Sign in to continue</Text>

            {/* Email */}
            <View style={styles.field}>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
                placeholder="email"
                placeholderTextColor={colors.textPlaceholder}
                selectionColor={colors.primary}
                cursorColor={colors.primary}
              />
            </View>

            {/* Password */}
            <View style={styles.field}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputRow}>
                <TextInput
                  ref={passwordRef}
                  style={styles.inputFlex}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={secure}
                  returnKeyType="done"
                  placeholder="********"
                  placeholderTextColor={colors.textPlaceholder}
                  selectionColor={colors.primary}
                  cursorColor={colors.primary}
                />
                <Pressable onPress={() => setSecure(s => !s)} hitSlop={8}>
                  <Text style={styles.toggle}>{secure ? "Show" : "Hide"}</Text>
                </Pressable>
              </View>
            </View>

            <Pressable onPress={handleForgot} style={styles.forgot}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </Pressable>

            <TouchableOpacity style={styles.button} onPress={handleSignIn} activeOpacity={0.9}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <View style={styles.bottomRow}>
              <Text style={styles.bottomText}>Don't have an account?</Text>
              <Pressable onPress={handleSignUp}>
                <Text style={styles.link}>Sign Up</Text>
              </Pressable>
            </View>
          </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

