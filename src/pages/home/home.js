import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused, useNavigation } from '@react-navigation/native'; 
import { PasswordItem } from './components/passwordItem';
import useStorage from '../../hooks/useStorage';


export default function Home() {

    const [listPasswords, setListPasswords] = useState([]);
    const focused = useIsFocused();
    const { getItem, removeItem } = useStorage();
    const navigation = useNavigation();  

    useEffect(() => {
        async function loadPasswords() {
            const passwords = await getItem("@pass");
            setListPasswords(passwords || []);
        }
        loadPasswords();
    }, [focused]);

    async function handleDeletePassword(item) {
        await removeItem("@pass", item);
        const updatedPasswords = await getItem("@pass");
        setListPasswords(updatedPasswords || []);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={styles.header}>
                <Text style={styles.title}>
                    minhas senhas
                </Text>
            </View>

            <View style={styles.content}>
                {listPasswords.length === 0 && (
                    <Text style={styles.emptyText}>Nenhuma senha salva</Text>
                )}

                <FlatList
                    style={styles.lista}
                    data={listPasswords}
                    keyExtractor={(item) => String(item)}
                    renderItem={({ item }) => <PasswordItem data={item} removePassword={() => handleDeletePassword(item)} />}
                />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={styles.button} onPress={() => navigation.navigate('Gerar_Senha')} >
                        <Text style={styles.buttonText}>
                            Gerar senha
                        </Text>
                    </TouchableOpacity>
                </View>
                
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#1C274C',
        paddingTop: 40,
        paddingBottom: 14,
        paddingLeft: 14,
        paddingRight: 14,
    },
    title: {
        color: "#fff",
        fontSize: 18,
        fontWeight: 'bold'
    },
    content: {
        flex: 1,
        paddingLeft: 14,
        paddingRight: 14,
        alignItems: 'center',  
    },
    lista: {
        flex: 1,
        paddingTop: 14,
    },
    emptyText: {
        fontSize: 16,
        textAlign: 'center',
        paddingTop: 250,
        color: "#6B6C71"
    },
    buttonContainer: {
        justifyContent: 'center',  
        alignItems: 'center',  
        flex: 1,
        width: '100%',
    },
    button: {
        justifyContent: "center",
        backgroundColor: "#1C274C",
        width: '80%',
        alignItems: 'center',  
        padding: 15,
        borderRadius: 8,
        paddingBottom: 10,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: 'bold'
    }
});