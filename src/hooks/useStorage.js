import AsyncStorage from '@react-native-async-storage/async-storage';

const useStorage = () => {
    const getItem = async (key) => {
        try {
            const passwords = await AsyncStorage.getItem(key);
            return JSON.parse(passwords) || [];
        } catch (error) {
            console.log("erro ao buscar", error);
            return [];
        }
    }

    const saveItem = async (key, value) => {
        try {
            let passwords = await getItem(key);
            passwords.push(value);
            await AsyncStorage.setItem(key, JSON.stringify(passwords));
        } catch (error) {
            console.log("erro ao salvar", error);
        }
    }

    const removeItem = async (key, itemToRemove) => {
        try {
            let passwords = await getItem(key);
            let updatedPasswords = passwords.filter((item) => {
                return item.name !== itemToRemove.name || item.password !== itemToRemove.password;
            });
            await AsyncStorage.setItem(key, JSON.stringify(updatedPasswords));
        } catch (error) {
            console.log("erro ao deletar", error);
        }
    }

    return {
        getItem,
        saveItem,
        removeItem
    }
}

export default useStorage;
