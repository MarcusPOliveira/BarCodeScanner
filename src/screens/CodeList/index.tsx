import React, { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, ToastAndroid } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';

import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

import { Header } from '../../components/Header';
import { Load } from '../../components/Load';
import { CodeCard } from '../../components/CodeCard';
import {
  Container,
  Content,
  TitleWrapper,
  Title,
  ListLenght,
  ListWrapper,
  ClearButton
} from './styles';

export function CodeList() {
  const [isLoading, setIsLoading] = useState(false);
  const [codes, setCodes] = useState([]);

  const { colors } = useTheme();

  async function fetchCodes() {
    setIsLoading(true);
    firestore()
      .collection('products')
      .get()
      .then(response => {
        const data = response.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
          }
        });
        setCodes(data);
        setIsLoading(false);
      })
  }

  async function handleDeleteCode() {
    //implementar exclusão clicando no card
    //console.log('deletar: ', id)
  }

  async function handleDeleteAllCodes(path: string) {
    const ref = firestore().collection(path);
    ref.onSnapshot((snapshot) => {
      snapshot.docs.forEach((doc) => {
        ref.doc(doc.id).delete();
      });
    });
    ToastAndroid.show('Lista deletada com sucesso!', ToastAndroid.LONG);
    // firestore()
    //   .collection('products')
    //   .doc('')
    //   .delete()
    //   .then(() => {
    //     ToastAndroid.show('Lista de Códigos deletada com sucesso!', ToastAndroid.LONG);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     Alert.alert('Opa, ', 'algo deu errado!');
    //   });
  }

  useFocusEffect(useCallback(() => {
    fetchCodes('');
    setIsLoading(false);
  }, [fetchCodes]));

  return (
    <Container>
      <Header title="Lista de Códigos" />
      <Content>
        {
          isLoading
            ? <Load />
            :
            <>
              <TitleWrapper>
                <Title>Toque para Deletar</Title>
                <ListLenght>{codes.length} códigos</ListLenght>
              </TitleWrapper>
              <ListWrapper>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    flex: 1,
                  }}
                  data={codes}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => (
                    <CodeCard
                      onPress={handleDeleteCode}
                      code={item.code}
                    />
                  )}
                />
              </ListWrapper>
            </>
        }
        <ClearButton onPress={() => handleDeleteAllCodes('products')} >
          <Feather name="x" size={24} color={colors.white} />
        </ClearButton>
      </Content>
    </Container>
  );
}
