import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Dimensions } from 'react-native';

import { setScreenOrientation } from '../store/actions/screen';

import ShopNavigator from '../navigation/ShopNavigator';

const AppContainer = props => {
    const [orientation, setOrientation] = useState('vertical');

    useEffect(() => {
        const updateLayout = () => {
            const screenWidth = Dimensions.get('window').width;
            const screenHeight = Dimensions.get('window').height;
            let orientation = '';
            if (screenWidth > screenHeight) {
                orientation = 'horizontal';
            } else {
                orientation = 'vertical';
            };
            setOrientation(orientation);
            saveDirection();
        };
    
        Dimensions.addEventListener('change', updateLayout);
        
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });

    const dispatch = useDispatch();

    const saveDirection = useCallback(() => {
        console.log(orientation);
        dispatch(setScreenOrientation(orientation));
    }, [orientation]);

    return ( 
        <ShopNavigator />
    );
};

export default AppContainer;