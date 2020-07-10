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
            const newScreenWidth = Dimensions.get('window').width;
            const newScreenHeight = Dimensions.get('window').height;
            let newOrientation;
            if (newScreenWidth > newScreenHeight) {
                newOrientation = 'horizontal';
            } else {
                newOrientation = 'vertical';
            };
            setOrientation(newOrientation);
            setScreenWidth(newScreenWidth);
            saveDirection(newOrientation, newScreenWidth);
        };
    
        Dimensions.addEventListener('change', updateLayout);
        
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });

    const dispatch = useDispatch();
    //dispatch(setScreenOrientation(orientation, screenWidth));
    const saveDirection = useCallback((newOrientation, newScreenWidth) => {
        dispatch(setScreenOrientation(newOrientation, newScreenWidth));
    }, [orientation]);

    return ( 
        <ShopNavigator />
    );
};

export default AppContainer;