import React from 'react';
import { 
    Text 
} from 'react-native';

const ProductDetailsScreen = props => {
    
    return ( 
        <Text style={styles.screen}>ProductDetailsScreen !</Text>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default ProductDetailsScreen;