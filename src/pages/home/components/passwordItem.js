import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';

export function PasswordItem({ data, removePassword }) {

    const isObject = typeof data === 'object' && data !== null && 'name' in data && 'password' in data;

    return (
        <Pressable onLongPress={() => removePassword(data)} style={styles.container}>
            {isObject ? (
                <>
                    <Text style={styles.name}>{data.name}</Text>
                    <Text style={styles.text}>{data.password}</Text>
                </>
            ) : (
                <Text style={styles.text}>{data}</Text>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1C274C",
        padding: 10,
        width: '100%',
        marginBottom: 14,
        borderRadius: 20,
        flexDirection: 'column',
        alignItems: 'center',
    },
    name: {
        color: "#FFF",
        fontWeight: 'bold',
        marginBottom: 5,
    },
    text: {
        color: "#FFF",
    }
});
