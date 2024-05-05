import { Tabs } from 'expo-router';
import React, { useCallback } from 'react';
import colors from '@/lib/colors';
import Button from '@/components/button';
import { auth } from '@/lib/firebase';

const Layout = () => {
    const logout = useCallback(() => {
        auth.signOut();
      }, []);
      
    return (
        <Tabs screenOptions={{headerStyle:{backgroundColor:colors.dark}}}>
            <Tabs.Screen name='index'  options={{headerTitle:"Products",tabBarLabel:"Home",headerTitleAlign:"center" ,headerRight:()=>(<Button title='logout' onPress={logout}/>) }} />
        </Tabs>
    );
}

export default Layout;
