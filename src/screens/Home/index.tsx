import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, Modal, StyleSheet, ToastAndroid } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import firestore from '@react-native-firebase/firestore';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';
import uuid from 'react-native-uuid';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { Header } from '../../components/Header';
import { BarCodeArea } from '../../components/BarCodeArea';
import {
  Container,
  ScannerContent,
  ModalContent
} from './styles';
import { useTheme } from 'styled-components/native';

//constants
const finderWidth: number = 280;
const finderHeight: number = 230;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const viewMinX = (width - finderWidth) / 2;
const viewMinY = (height - finderHeight) / 2;

export function Home() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanning, setScanning] = useState(false);
  const [barCode, setBarCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const { colors } = useTheme();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const askForPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      }
      askForPermissions();
      setScanning(false);
      setBarCode('');
    });

    return unsubscribe;

  }, [navigation]);

  function onBarCodeScanned(scanningResult: BarCodeScannerResult) { //type = qrcode, code128, ean, etc, data = code
    if (!scanning) {
      const { type, data, bounds: { origin } = {} } = scanningResult;
      const { x, y } = origin;
      if (x >= viewMinX && y >= viewMinY && x <= (viewMinX + finderWidth / 2) && y <= (viewMinY + finderHeight / 2)) {
        setScanning(true);
        console.log("Tipo: ", type, " - Código: ", data);
        setBarCode(data);
      }
    } else {
      console.log('erro')
    }
  }

  function copyBarCode() {
    Clipboard.setString(barCode);
    return ToastAndroid.show('Copiado para área de transferência!', ToastAndroid.LONG);
  }

  async function handleAddCodeToList() {
    if (!barCode) {
      return Alert.alert('Opa,', 'nenhum código selecionado');
    } else {
      setIsLoading(true);
      await firestore()
        .collection('products')
        .add({
          id: uuid.v4(),
          code: barCode
        })
        .then(() => {
          ToastAndroid.show('Adicionado à lista com sucesso!', ToastAndroid.LONG);
          setScanning(false);
          setIsLoading(false);
        })
        .catch(error => {
          console.log(error);
          Alert.alert('Opa,', 'não foi possível adicionar à lista!');
          setIsLoading(false);
        });
    }
  }

  function handleClearBarCode() {
    setBarCode('');
    setScanning(false);
  }

  if (hasPermission === null) {
    return ToastAndroid.show('Obtendo permissões...', ToastAndroid.LONG);
  }

  if (hasPermission === false) {
    return Alert.alert('Opa,', 'sem permissões para acessar a câmera');
  }

  return (
    <Container>
      <Header title='Easy BarCode Scanner' />
      <ScannerContent>
        {
          isFocused ? (
            <>
              <BarCodeScanner
                onBarCodeScanned={onBarCodeScanned}
                style={[StyleSheet.absoluteFillObject, styles.scanner]}
              >
                <BarcodeMask edgeColor={colors.primary} />
              </BarCodeScanner>
            </>
          ) : null
        }
      </ScannerContent>
      {
        scanning && (
          <Modal
            style={{ width: '100%', height: '50%', justifyContent: 'flex-end', margin: 0 }}
            animationType="slide"
            transparent
          >
            <ModalContent>
              <BarCodeArea
                code={barCode}
                onClear={handleClearBarCode}
                onCopyArea={copyBarCode}
                onAddCode={handleAddCodeToList}
                isLoading={isLoading}
              />
            </ModalContent>
          </Modal>
        )
      }
    </Container>
  );
}

const styles = StyleSheet.create({
  scanner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

/*
  return (
    <Container>
      <Header title='Easy BarCode Scanner' />
      <ScannerContent>
        {
          isFocused ? (
            <BarCodeScanner
              onBarCodeScanned={onBarCodeScanned}
              style={[StyleSheet.absoluteFillObject, styles.scanner]}
            />
          ) : null
        }
      </ScannerContent>
      {
        scanning && (
          <Modal
            style={{ width: '100%', height: '50%', justifyContent: 'flex-end', margin: 0 }}
            animationType="slide"
            transparent
          >
            <ModalContent>
              <BarCodeArea
                code={barCode}
                onClear={handleClearBarCode}
                onCopyArea={copyBarCode}
                onAddCode={handleAddCodeToList}
                isLoading={isLoading}
              />
            </ModalContent>
          </Modal>
        )
      }
    </Container>
  );
*/