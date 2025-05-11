import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function TransitionScreenOne() {
    const scale = useSharedValue(1);
    const router = useRouter();

    useEffect(() => {
        scale.value = withTiming(6, { duration: 2500 });

        const timeout = setTimeout(() => {
            router.push('/TransitionScreenThird');
        }, 2000);

        return () => clearTimeout(timeout);
    }, []);

    const animatedContainerStyle = useAnimatedStyle(() => {
        const scaledSize = width * scale.value;
        return {
            width: scaledSize,
            height: scaledSize,
            borderRadius: scaledSize / 2,
            justifyContent: 'center',
            alignItems: 'center',
        };
    });

    return (
        <View style={style.fullScreen}>
            <Animated.View style={[style.container, animatedContainerStyle]}>
                <Image source={require('../../../assets/LogoBrancaSplash.png')} style={style.image} />
            </Animated.View>
        </View>
    );
}

const style = StyleSheet.create({
    image: {
        width: width * 0.4,
        height: width * 0.3,
        position: 'absolute',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#13D8B0',
    },
    fullScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});