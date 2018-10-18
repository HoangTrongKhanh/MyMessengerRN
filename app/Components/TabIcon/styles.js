import { StyleSheet } from 'react-native';
import AppStyles from '../../Config/styles';

const styles = StyleSheet.create({
    rounded: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: AppStyles.colors.inactiveGreyColor,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;
