import React from 'react';
import { 
    View, 
    Text,
    ImageBackground,
    StyleSheet,
    Platform,
    TouchableOpacity,
    TouchableNativeFeedback,
} from 'react-native';

import SubtitleText from './SubtitleText';
import DefaultText from './DefaultText';
import MyButton from './MyButton';

const ProductItem = props => {
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android') {
        TouchableCmp = TouchableNativeFeedback;
    }
    return (
        <View style={styles.shopItem}>
            <TouchableCmp 
                onPress={props.onSelectedItem}
            >
                <View>
                    <View style={{...styles.itemRow, ...styles.itemHeader}}>
                        <ImageBackground 
                            source={{uri: props.imageUrl}} 
                            style={styles.bgImage}
                        >
                        </ImageBackground>
                    </View>
                    <View style={{...styles.itemColumn, ...styles.itemDetail}}> 
                        <SubtitleText     
                            numberOfLines={1}
                        >
                            {props.title}
                        </SubtitleText>
                        <DefaultText>{props.price}€</DefaultText>
                    </View>
                    <View style={{...styles.itemRow, ...styles.itemButtons}}>
                        <MyButton
                            onPress={props.onClickOnDetails}
                        >
                            Details
                        </MyButton>
                        <MyButton
                            onPress={props.onClickOnCart}
                        >
                            Add to cart
                        </MyButton>
                    </View>
                </View>
            </TouchableCmp>
        </View>  
    )
};

const styles = StyleSheet.create({
    shopItem: {
        height: 320,
        width: '95%',
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 10,
        elevation: 5,
    },
    bgImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    },
    itemRow: {
        flexDirection: 'row',
    },
    itemColumn: {
        flexDirection: 'column',
    },
    itemHeader: {
        height: '64%'
    },
    itemDetail: {
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '18%',
        paddingTop: 10,
    },
    itemButtons: {
        paddingHorizontal: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '18%'
    },
});

export default ProductItem;