import { SafeAreaView, StyleSheet, View, FlatList, Pressable, Text, Image, ScrollView } from "react-native"
import Bar from "../../components/Bar"
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from "expo-router";
import { useEffect, useState } from "react";

const Memoria = () => {
    const [memorias, setMemorias] = useState(null);

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('memoria');
            const parsedValue = jsonValue != null ? JSON.parse(jsonValue) : null;
            setMemorias(parsedValue);
        } catch (error) {
            console.error('Error retrieving memory data:', error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <Bar
                Titulo={'Memória'}
                href={'/'}
                icon={<Entypo name="home" size={24} color="white" />}
                cor={'#6600FF'}
            />
            <SafeAreaView style={styles.container}>
                <Pressable style={styles.btnNew}>
                    <Link href={'/memoria/novamemoria'}>
                        <View style={styles.center}>
                            <Entypo name="plus" size={34} color="white" />
                        </View>
                    </Link>
                </Pressable>

                {memorias ? (
                    <ScrollView showsVerticalScrollIndicator={false} style={styles.list}>
                        {memorias.map((memoria, index) => (
                            <View style={styles.card} key={index}>
                                <Image
                                    style={styles.img}
                                    source={{ uri: memoria.Img }}
                                />
                                <Text style={styles.h1}>{memoria.Titulo}</Text>
                                <Text style={styles.description}>{memoria.Descricao}</Text>
                                <View style={styles.details}>
                                    <View style={styles.extraBox}>
                                        <FontAwesome name="map-marker" size={14} color='#6600FF' />
                                        <Text style={styles.extra}>{memoria.Localizacao}</Text>
                                    </View>
                                    <View style={styles.extraBox}>
                                        <Entypo name="calendar" size={12} color='#6600FF' />
                                        <Text style={styles.extra}>{memoria.Ano}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                ) : (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>Nenhuma memória salva</Text>
                    </View>
                )}
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    list: {
        padding: 10,
        width: '100%',
        marginVertical: 14,
    },
    btnNew: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6600FF',
        borderRadius: 50,
        position: 'absolute',
        bottom: 20,
        right: 20,
        zIndex: 1,
    },
    center: {
        alignItems: 'center',
    },
    img: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        resizeMode: 'cover',
    },
    card: {
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        padding: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
    },
    h1: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 8,
        color: '#333',
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    details: {
        marginTop: 10,
    },
    extra: {
        fontSize: 12,
        color: '#6600FF',
    },
    extraBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
    },
});

export default Memoria;
