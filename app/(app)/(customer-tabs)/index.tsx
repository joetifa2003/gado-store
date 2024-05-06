import React from 'react';
import { StyleSheet, View , Text} from 'react-native';
import { productDao } from '@/lib/dao/products';
const Home = () => {
    console.log(productDao.getAll());
    return (
        <View>
            <Text>i will fetch the data later</Text>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Home;
