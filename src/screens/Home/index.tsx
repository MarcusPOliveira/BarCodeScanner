import React, { useEffect, useState } from 'react';
import { Alert, Modal, ToastAndroid } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { Header } from '../../components/Header';
import {
  Container,
  ScannerContent,
  ModalContent
} from './styles';
import { BarCodeArea } from '../../components/BarCodeArea';
import Clipboard from '@react-native-clipboard/clipboard';

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
              />
            </ModalContent>
          </Modal>
        )
      }
    </Container>
  );
}
