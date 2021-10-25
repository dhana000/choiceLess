import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StatusBar,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as firebase from "firebase";
import { useDispatch } from "react-redux";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { COLORS, FONTS, SIZES } from "../constants";
import firebaseConfig from "../firebase";
import { login } from "../redux/action";
const CAPTCHA_VISIBLE = false;

export default function LoginScreen({ navigation }) {
  const capchaModal = useRef(null);
  const [mobileNum, setMobileNum] = useState("");
  const [verificationId, setVerificationId] = useState();
  const [verificationCode, setVerificationCode] = useState();
  const [showMessage, setShowMessage] = useState("");
  const [showOtpInput, setOtpInput] = useState(false);
  const dispatch = useDispatch();

  const verifyUser = async () => {
    try {
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      const vericationId = await phoneProvider.verifyPhoneNumber(
        `+91${mobileNum}`,
        capchaModal.current
      );
      setVerificationId(vericationId);
      setShowMessage("Verification code has been sent to your phone");
      setOtpInput(true);
    } catch (err) {
      setShowMessage("Verification failed");
    }
  };

  const getCredentials = async () => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      await firebase.auth().signInWithCredential(credential);
      setShowMessage("verification Successful");
      dispatch(login(mobileNum));
    } catch (err) {
      setShowMessage("OTP is Wrong");
      setVerificationCode("");
      setOtpInput(false);
    }
  };

  StatusBar.setBackgroundColor(COLORS.white);
  return (
    <View
      style={{
        flex: 1,
        width: SIZES.width,
        height: SIZES.height,
        backgroundColor: COLORS.white,
      }}
    >
      <Title />
      <Text style={{ textAlign: "center", marginBottom: SIZES.padding2 * 1.5 }}>
        {showMessage}
      </Text>
      <LoginForm
        {...{
          mobileNum,
          setMobileNum,
          verifyUser,
          verificationCode,
          setVerificationCode,
          showOtpInput,
        }}
      />
      {showOtpInput && (
        <Button {...{ navigation }} onPress={getCredentials} title="Login" />
      )}
      <FirebaseRecaptchaVerifierModal
        ref={capchaModal}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={CAPTCHA_VISIBLE}
      />
    </View>
  );
}

const Title = () => {
  return (
    <View
      style={{
        marginTop: SIZES.height * 0.14,
        paddingLeft: SIZES.padding * 3,
        marginBottom: SIZES.padding * 3,
      }}
    >
      <Text style={{ ...FONTS.h1, fontSize: 36, color: COLORS.primary }}>
        ChoiceLess.
      </Text>
      <Text style={{ ...FONTS.body2, paddingLeft: 5 }}>Login or sign up</Text>
    </View>
  );
};

const Button = ({ navigation, title, ...props }) => {
  return (
    <View
      style={{
        width: SIZES.width,
        flexDirection: "row",
        justifyContent: "center",
        alignSelf: "center",
        marginBottom: SIZES.padding * 2,
      }}
    >
      <TouchableOpacity
        {...props}
        style={{
          backgroundColor: COLORS.black,
          borderRadius: SIZES.radius,
          paddingHorizontal: SIZES.width * 0.12,
          paddingVertical: SIZES.padding * 1.5,
        }}
      >
        <Text style={{ color: COLORS.white }}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const LoginForm = (props) => {
  return (
    <View>
      <View
        style={{
          paddingHorizontal: SIZES.padding * 4,
        }}
      >
        <View
          style={[styles.inputContainer, { marginBottom: SIZES.padding * 3 }]}
        >
          <Text style={{ ...FONTS.h4 }}>+91 </Text>
          <TextInput
            keyboardType="numeric"
            placeholder="Mobile Number"
            autoFocus
            style={[styles.input, { letterSpacing: 1.8 }]}
            value={props.mobileNum}
            extContentType="telephoneNumber"
            onChangeText={props.setMobileNum}
          />
        </View>
        {!props.showOtpInput && (
          <Button
            title="Send Me OTP"
            disabled={!props.mobileNum}
            onPress={props.verifyUser}
          />
        )}
        {props.showOtpInput && (
          <View style={styles.inputContainer}>
            <Text style={{ ...FONTS.h4 }}>OTP </Text>
            <TextInput
              value={props.verificationCode}
              onChangeText={props.setVerificationCode}
              keyboardType="numeric"
              maxLength={6}
              style={[
                styles.input,
                { letterSpacing: SIZES.padding * 2, fontWeight: "bold" },
              ]}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: COLORS.black,
    borderWidth: 1,
    paddingHorizontal: SIZES.padding,
    borderRadius: SIZES.padding / 2,
    marginBottom: SIZES.padding * 3,
  },
  input: {
    fontSize: SIZES.h4,
    padding: SIZES.padding2,
    color: COLORS.black,
    width: "80%",
  },
});
