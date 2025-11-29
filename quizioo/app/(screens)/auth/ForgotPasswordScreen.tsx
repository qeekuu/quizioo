import React, { useRef, useState } from "react";
import {Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View, Image, Pressable,} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { colors, styles } from "./auth.styles";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/(navigation)/RootNavigator";
import {useNavigation} from "expo-router";

type Nav = NativeStackNavigationProp<RootStackParamList, 'ForgotPassword'>

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
            <Text style={styles.h1}>Recover your password</Text>

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
                placeholder="Enter your email"
                placeholderTextColor={colors.textPlaceholder}
                selectionColor={colors.primary}
                cursorColor={colors.primary}
              />
            </View>

			<TouchableOpacity style={styles.button} onPress={handleSignUp}>
				<Text style={styles.buttonText}>Submit</Text>	
			</TouchableOpacity>

	        <View style={styles.bottomRow}>
              <Text style={styles.bottomText}>Remember password?</Text>
              <Pressable onPress={handleSignUp}>
                <Text style={styles.link}>Sign In</Text>
              </Pressable>
            </View>
 			
          </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
</SafeAreaProvider>
  );
}
