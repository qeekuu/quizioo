import React, { useRef, useState } from "react";
import {Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View, Image, Pressable, ScrollView} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { colors, styles } from "./auth.styles";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/(navigation)/types";
import {useNavigation} from "expo-router";
import { api } from "@/app/(api)/client";
import {useAuth} from "@/app/(context)/AppContext";

type Nav = NativeStackNavigationProp<RootStackParamList, 'Register'>

export default function RegisterScreen() {
	const { register } = useAuth();
	const navigation = useNavigation<Nav>();

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [secure, setSecure] = useState(true);
	const [confirmPassword, setConfirmPassword] = useState("");

	const passwordRef = useRef<TextInput>(null);
	const confirmRef = useRef<TextInput>(null);
	const emailRef = useRef<TextInput>(null);

const handleSignUp = async () => {
    const e = email.trim().toLowerCase();
    const p = password;
    const u = username.trim();

    if (!u || !e || !p) return Alert.alert("Validation", "Username, email and password are required.");
    if (p !== confirmPassword) return Alert.alert("Validation", "Passwords do not match.");

    try {
      await register({
        username: u,
        email: e,
        password: p,
        createdAt: new Date().toISOString(),
      });


    navigation.navigate("Home");

    } catch (err: any) {
      Alert.alert("Error", err?.message ?? "Registration failed");
    }
  };

  return (
<SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >

	  <ScrollView
		keyboardShouldPersistTaps="handled"
		contentContainerStyle={{flexGrow: 1}}
	  >
          <Image
            style={styles.logo}
            source={require("../../../assets/images/quizio.png")}
            resizeMode="contain"
          />

          <View style={styles.card}>
            <Text style={styles.h1}>Welcome 👋</Text>
            <Text style={styles.sub}>Sign up</Text>

			{/* UserName */}
			<View style={styles.field}>
				<Text style={styles.label}>Username</Text>
				<TextInput
					style={styles.input}
					value={username}
					onChangeText={setUsername}
					autoCapitalize="none"
					autoCorrect={false}
					returnKeyType="next"
					onSubmitEditing={() => emailRef.current?.focus()}
					placeholder="username"
					placeholderTextColor={colors.textPlaceholder}
					selectionColor={colors.primary}
					cursorColor={colors.primary}
				/>
			</View>

            {/* Email */}
            <View style={styles.field}>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
				ref={emailRef}
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
				  autoCapitalize="none"
                  returnKeyType="next"
				  onSubmitEditing={() => confirmRef.current?.focus()}
                  placeholder="••••••••"
                  placeholderTextColor={colors.textPlaceholder}
                  selectionColor={colors.primary}
                  cursorColor={colors.primary}
                />
				<Pressable onPress={() => setSecure(s => !s)} hitSlop={8}>
					<Text style={styles.toggle}>{secure ? "Show" : "Hide"}</Text>
				</Pressable>
			  </View>
			</View>

			{/*Confirm password */}
			<View style={styles.field}>
				<Text style={styles.label}>Confirm password</Text>
				<View style={styles.inputRow}>
				<TextInput
					ref={confirmRef}
					style={styles.inputFlex}
					value={confirmPassword}
					onChangeText={setConfirmPassword}
					secureTextEntry={secure}
					autoCapitalize="none"
					returnKeyType="done"
					placeholder="••••••••"
					placeholderTextColor={colors.textPlaceholder}
					selectionColor={colors.primary}
					cursorColor={colors.primary}
				/>
                <Pressable onPress={() => setSecure(s => !s)} hitSlop={8}>
                  <Text style={styles.toggle}>{secure ? "Show" : "Hide"}</Text>
                </Pressable>
				</View>
			</View>

			<TouchableOpacity style={styles.button} onPress={handleSignUp}>
				<Text style={styles.buttonText}>Sign Up</Text>	
			</TouchableOpacity>
          </View>
		  </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
