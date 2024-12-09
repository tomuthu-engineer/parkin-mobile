import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomInput';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Loginscreen: React.FC = ({navigation}) => {
  const [isChecked, setIsChecked] = useState(false);
  const {control, watch, handleSubmit} = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormInputs) => {
    console.log('Form Data:', data);
    ToastAndroid.show('Signed in successfully!', ToastAndroid.SHORT);
  };

  const onInvalid = (errors: any) => {
    const firstErrorMessage =
      Object.values(errors)?.[0]?.message || 'Validation failed';
    ToastAndroid.show(firstErrorMessage, ToastAndroid.SHORT);
  };

  const handleSignUp = () => {
    navigation.navigate('SignUpScreen');
  };

  const handleForgotButton = () => {
    navigation.navigate('ForgotPasswordScreen');
  };

  const formValues = watch();

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      keyboardShouldPersistTaps="handled"
      style={styles.scrollView}>
      <View style={styles.container}>
        <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

        {/* Logo Container */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.logoText}>ParkQR</Text>
        </View>

        {/* Sign In Text */}
        <Text style={styles.signInText}>Sign In</Text>

        {/* Input Boxes */}
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="email"
            render={({field: {onChange, value}}) => (
              <CustomTextInput
                placeholder="Enter your email"
                icon={require('../../assets/images/icons/mail.png')}
                keyboardType="email-address"
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({field: {onChange, value}}) => (
              <CustomTextInput
                placeholder="Enter your password"
                icon={require('../../assets/images/icons/password.png')}
                rightIcon={require('../../assets/images/icons/eye.png')}
                secureTextEntry={true}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        </View>

        {/* Remember Me & Forgot Password */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.rememberMeContainer}
            onPress={() => setIsChecked(!isChecked)}>
            <View style={styles.radioButton}>
              {isChecked && <View style={styles.radioButtonInner} />}
            </View>
            <Text style={styles.rememberMeText}>Remember me</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={styles.forgotPasswordText}
              onPress={handleForgotButton}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sign In Button */}
        <CustomButton
          text="Sign In"
          icon={require('../../assets/images/icons/arrow.png')}
          onPress={handleSubmit(onSubmit, onInvalid)}
          iconPosition="right"
          variant="primary"
        />

        {/* Sign Up Section */}
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText} onPress={handleSignUp}>
            Don't have an account?{' '}
            <Text style={styles.signUpLink}>Register</Text>
          </Text>
        </View>
      </View>

      {/* Product By Section */}
      <View style={styles.footer}>
        <Text style={styles.productByText}>Product by secQR</Text>
      </View>
    </ScrollView>
  );
};

export default Loginscreen;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  logoText: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  signInText: {
    alignSelf: 'flex-start',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    gap: 20,
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    marginBottom: 40,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#333',
  },
  rememberMeText: {
    fontSize: 16,
    color: '#333',
  },
  forgotPasswordText: {
    fontSize: 16,
    color: '#000',
    textDecorationLine: 'underline',
  },
  signUpContainer: {
    marginTop: 20,
  },
  signUpText: {
    fontSize: 16,
    color: '#333',
  },
  signUpLink: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
  productByText: {
    fontSize: 14,
    color: '#666',
  },
});
