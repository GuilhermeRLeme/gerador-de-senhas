import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable, TextInput } from "react-native";

import useStorage from '../../hooks/useStorage';
import * as clipboard from 'expo-clipboard';

export function ModalPassword({ password, handleClose }) {
    const { saveItem } = useStorage();
    const [name, setName] = useState('');

    async function handleCopyPassword() {
        if (!name) {
            alert('Por favor, insira um nome para a senha.');
            return;
        }

        await clipboard.setStringAsync(password);
        await saveItem("@pass", { name, password });

        alert("Senha copiada e salva com sucesso!");

        handleClose();
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Senha gerada</Text>
                <TextInput
                    style={styles.nameInput}
                    placeholder="Nome da senha"
                    value={name}
                    onChangeText={setName}
                />
                <Pressable style={styles.innerPassword} onLongPress={handleCopyPassword}>
                    <Text style={styles.text}>{password}</Text>
                </Pressable>

                <View style={styles.buttonArea}>
                    <TouchableOpacity style={[styles.button, styles.buttonVoltar]} onPress={handleClose}>
                        <Text style={styles.buttonText}>voltar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.buttonSave]} onPress={handleCopyPassword}>
                        <Text style={styles.buttonSaveText}>salvar senha</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "rgba(24, 24, 24, 0.6)",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content:{
        backgroundColor: "#fff",
        width: "85%",
        paddingTop: 24,
        paddingBottom: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 24,
    },
    text:{
        color: "#fff",
        textAlign: 'center'
    },
    innerPassword:{
        backgroundColor: '#1C274C',
        width: '90%',
        padding: 14,
        borderRadius: 8,
    },
    buttonArea:{
        flexDirection: 'row',
        width: '90%',
        marginTop: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,
    },
    button:{
        flex: 1,
        alignItems: 'center',
        marginBottom: 14,
        marginTop: 14,
        padding: 8,
    },
    buttonSave:{
        backgroundColor: '#1C274C',
        borderRadius: 8,
    },
    buttonSaveText:{
        color: "#FFF",
        fontWeight: "bold"
    },
    buttonVoltar:{
        backgroundColor: "#AEB0B6",
        borderRadius: 8,
    },
    nameInput: {
        backgroundColor: '#F0F0F0',
        width: '90%',
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
    },
})