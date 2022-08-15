import React, { useEffect, useState } from 'react';
import { Alert, Modal, ToastAndroid } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Clipboard from '@react-native-clipboard/clipboard';
import firestore from '@react-native-firebase/firestore';

import { Header } from '../../components/Header';
import { BarCodeArea } from '../../components/BarCodeArea';
import {
  Container,
  ScannerContent,
  ModalContent
} from './styles';

type Code = {
  id: string;
  code: string;
}

export function Home() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanning, setScanning] = useState(false);
  const [barCode, setBarCode] = useState('');

  useEffect(() => {
    const askForPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    }
    askForPermissions();
  }, []);

  function onBarCodeScanned(payload: { type: string, data: string }) { //type = qrcode, code128, ean, etc, data = code
    setScanning(true);
    setBarCode(payload.data);
    console.log(payload.data)
  }

  function copyBarCode() {
    Clipboard.setString(barCode);
    return ToastAndroid.show('Copiado para área de transferência!', ToastAndroid.LONG);
  }

  async function handleAddCodeToList() {
    if (!barCode) {
      return Alert.alert('Opa,', 'nenhum código selecionado');
    } else {
      firestore()
        .collection('products')
        .add({
          id: firestore.Timestamp,
          code: barCode
        })
        .then(() => {
          ToastAndroid.show('Adicionado à lista com sucesso!', ToastAndroid.LONG);
        })
        .catch(error => {
          console.log(error);
          Alert.alert('Opa,', 'não foi possível adicionar à lista!');
        })
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
        <BarCodeScanner
          onBarCodeScanned={onBarCodeScanned}
          style={{
            width: '100%',
            height: 500,
            flex: 1,
          }}
        />
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
              />
            </ModalContent>
          </Modal>
        )
      }
    </Container>
  );
}
