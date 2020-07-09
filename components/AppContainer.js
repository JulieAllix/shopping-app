import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dimensions } from 'react-native';

import { setScreenOrientation, setScreenWidth } from '../store/actions/screen';

import ShopNavigator from '../navigation/ShopNavigator';

const AppContainer = props => {
    
    const [orientation, setOrientation] = useState();
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

    useEffect(() => {
        const updateLayout = () => {
            const screenWidth = Dimensions.get('window').width;
            const screenHeight = Dimensions.get('window').height;
            let newOrientation;
            if (screenWidth > screenHeight) {
                newOrientation = 'horizontal';
            } else {
                newOrientation = 'vertical';
            };
            setOrientation(newOrientation);
            setScreenWidth(screenWidth);
            saveDirection();
        };
    
        Dimensions.addEventListener('change', updateLayout);
        
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });

    const dispatch = useDispatch();
    dispatch(setScreenOrientation(orientation, screenWidth));
    const saveDirection = useCallback(() => {
        dispatch(setScreenOrientation(orientation, screenWidth));
    }, [orientation]);

    return ( 
        <ShopNavigator />
    );
};

export default AppContainer;