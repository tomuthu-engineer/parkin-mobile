// components/CustomTextInput.tsx
import React, {useState} from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TextInputProps,
  ImageSourcePropType,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';

interface CustomTextInputProps extends TextInputProps {
  icon?: ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  secureTextEntry?: boolean; // To control visibility of the password
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  icon,
  rightIcon,
  style,
  inputStyle,
  secureTextEntry = false,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Internal state to manage password visibility

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible); // Toggle the state
  };

  return (
    <View style={[styles.inputWrapper, style]}>
      {icon && <Image source={icon} style={styles.icon} />}
      <TextInput
        style={[styles.input, inputStyle]}
        placeholderTextColor="#747688"
        secureTextEntry={secureTextEntry && !isPasswordVisible} // Toggle visibility based on internal state
        {...props}
      />
      {rightIcon && (
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Image
            source={
              isPasswordVisible
                ? require('../../assets/images/icons/eye.png')
                : require('../../assets/images/icons/eye.png')
            }
            style={styles.rightIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
    height: 56,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
    resizeMode: 'contain',
  },
  rightIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
    resizeMode: 'contain',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});
