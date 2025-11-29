import React, { useRef, useState } from "react";
import {Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View, Image, Pressable,} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { colors, styles } from "./auth.styles";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/(navigation)/RootNavigator";
import {useNavigation} from "expo-router";

type Nav = NativeStackNavigationProp<RootStackParamList, 'Register'>

export default function RegisterScreen() {
	const navigation = useNavigation<Nav>();
	
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [secure, setSecure] = useState(true);

	const passwordRef = useRef<TextInput>(null);
	const confirmRef = useRef<TextInput>(null);

  const handleSignUp = () => navigation.navigate("Login");

  return (
<SafeAreaProvider>
<SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
          <Image
            style={styles.logo}
            source={require("../../../assets/images/quizio.png")}
            resizeMode="contain"
          />

          <View style={styles.card}>
            <Text style={styles.h1}>Welcome 👋</Text>
            <Text style={styles.sub}>Sign up</Text>

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
					value={password}
					onChangeText={setPassword}
					secureTextEntry={secure}
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
      </KeyboardAvoidingView>
    </SafeAreaView>
</SafeAreaProvider>
  );
}
