import React from 'react';
import { StyleSheet } from 'react-native';
import { Paragraph, Button, Portal, Dialog } from 'react-native-paper';

const styles = StyleSheet.create({
  dialog: {
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 14,
  },
});

const CustomDialog = ({ visible, close }: { visible: boolean; close: () => void }) => (
  <Portal>
    <Dialog onDismiss={close} visible={visible} style={styles.dialog}>
      <Dialog.Title>Confirmation</Dialog.Title>
      <Dialog.Content>
        <Paragraph>Are you sure?</Paragraph>
      </Dialog.Content>
      <Dialog.Actions>
        <Button color="black" labelStyle={styles.buttonText} onPress={close}>
          Cancel
        </Button>
        <Button color="black" labelStyle={styles.buttonText} onPress={close}>
          OK
        </Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
);

export default CustomDialog;
