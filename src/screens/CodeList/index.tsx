import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
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
  ListWrapper,
  ClearButton
} from './styles';

export function CodeList() {
  const [isLoading, setIsLoading] = useState(false);
  const [codes, setCodes] = useState([]);

  const { colors } = useTheme();

  async function fetchCodes(value: string) {
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
        console.log(data);
        setCodes(data);
      })
  }

  useFocusEffect(useCallback(() => {
    fetchCodes('');
  }, []));

  return (
    <Container>
      <Header title="Lista de Códigos" />
      <Content>
        {
          isLoading
            ? <Load />
            :
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
                    code={item.code}
                  />
                )}
              />
            </ListWrapper>
        }
        <ClearButton>
          <Feather name="x" size={24} color={colors.white} />
        </ClearButton>
      </Content>
    </Container>
  );
}
