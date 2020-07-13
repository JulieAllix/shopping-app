import React from 'react';
import { 
    View, 
    ImageBackground,
    StyleSheet,
    Platform,
    TouchableOpacity,
    TouchableNativeFeedback,
} from 'react-native';
import { useSelector } from 'react-redux';

import SubtitleText from './SubtitleText';
import DefaultText from './DefaultText';
import MyButton from './MyButton';

const ProductItem = props => { 
    let orientation = useSelector(state => state.screen.orientation);
    let screenWidth = useSelector(state => state.screen.width);
    let numColumns;

    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android') {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <View style={{
            ...styles.shopItem, 
            width: orientation === 'vertical' ? screenWidth*0.95 : screenWidth*0.45,
        }}>
            <TouchableCmp 
                onPress={props.onSelectedItem}
            >
                <View>
                    <View style={{
                        ...styles.itemRow, 
                        height: orientation === 'vertical' ? '64%' : '49%',
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
                        flexDirection: orientation === 'vertical' ? 'row' : 'column',
                        marginTop: orientation === 'vertical' ? 0 : 15,
                        height: orientation === 'vertical' ? '18%' : '27%',
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
                    <View style={{
                        ...styles.itemRow, 
                        ...styles.itemButtons,
                        flexDirection: orientation === 'vertical' ? 'row' : 'column',
                        marginTop: orientation === 'vertical' ? 0 : 15,
                        height: orientation === 'vertical' ? '18%' : '27%',
                        }}>
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
    },
});

export default ProductItem;