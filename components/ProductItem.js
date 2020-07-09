import React, { useState, useEffect } from 'react';
import { 
    Dimensions,
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
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

    useEffect(() => {
        const updateLayout = () => {
            setScreenWidth(Dimensions.get('window').width);
        };
    
        Dimensions.addEventListener('change', updateLayout);
        
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });

    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android') {
        TouchableCmp = TouchableNativeFeedback;
    }


    return (
        <View style={{
            ...styles.shopItem, 
            width: screenWidth < 400 ? '95%' : '47%',
        }}>
            <TouchableCmp 
                onPress={props.onSelectedItem}
            >
                <View>
                    <View style={{
                        ...styles.itemRow, 
                        height: screenWidth < 400 ? '64%' : '50%',
                        }}>
                        <ImageBackground 
                            source={{uri: props.imageUrl}} 
                            style={styles.bgImage}
                        >
                        </ImageBackground>
                    </View>
                    <View style={{
                        ...styles.itemColumn, 
                        ...styles.itemDetail
                        }}> 
                        <SubtitleText     
                            numberOfLines={1}
                        >
                            {props.title}
                        </SubtitleText>
                        <DefaultText>{props.price}€</DefaultText>
                    </View>
                    {props.screen === "Products" ?
                    <View style={{
                        ...styles.itemRow, 
                        ...styles.itemButtons,
                        flexDirection: screenWidth < 400 ? 'row' : 'column',
                        marginTop: screenWidth < 400 ? 0 : 15,
                        height: screenWidth < 400 ? '18%' : '25%',
                        }}>
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
                    : 
                    <View style={{...styles.itemRow, ...styles.itemButtons}}>
                        <MyButton
                         onPress={props.onClickOnEdit}
                        >
                            Edit
                        </MyButton>
                    
                        <MyButton
                            onPress={props.onClickOnDelete}
                        >
                            Delete
                        </MyButton>
                    </View>
                    }
                    
                </View>
            </TouchableCmp>
        </View>  
    )
};

const styles = StyleSheet.create({
    shopItem: {
        height: 340,
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 10,
        marginHorizontal: 10,
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
        //height: '18%'
    },
});

export default ProductItem;