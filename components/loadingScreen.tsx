import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import colors from "@/lib/colors";

const LoadingScreen = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={"large"} color={"gray"} />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.primary,
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})

export default LoadingScreen;
