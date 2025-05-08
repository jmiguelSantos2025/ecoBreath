import React from "react";
import { Modal, View, Text, Pressable, StyleSheet, Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


interface CustomModalProps {
  visible: boolean;
  title: string;
  message: string;
  icon: string;
  color: string;
  onClose: () => void;
}


interface CustomConfirmModalProps extends CustomModalProps {
  onConfirm: () => void;
  confirmMode?: boolean;
}

export function CustomConfirmModal({
  visible,
  title,
  message,
  icon,
  color,
  onClose,
  onConfirm,
}: CustomConfirmModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Icon name={icon} size={70} color={color} style={styles.icon} />
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalMessage}>{message}</Text>

          <View style={styles.buttonRow}>
            <Pressable style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={[styles.buttonText, { color: "#07C3C3" }]}>Cancelar</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.confirmButton]} onPress={onConfirm}>
              <Text style={[styles.buttonText, { color: "white" }]}>Sim</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default function CustomModal({
  visible,
  title,
  message,
  icon,
  color,
  onClose,
}: CustomModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Icon
            name={icon}
            size={70}
            color={color}
            style={[styles.icon, { transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }]}
          />
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalMessage}>{message}</Text>

          <View style={styles.buttonContainer}>
            <View style={styles.divider} />
            <Pressable style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "75%",
    backgroundColor: "white",
    padding: 40,
    borderRadius: 20,
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  icon: {
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalMessage: {
    fontSize: Platform.OS === "web" ? RFValue(12) : 14,
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 5,
    color: "#7B7B7B",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#D1D1D1",
    marginBottom: 20,
  },
  closeButton: {
    width: "100%",
    paddingVertical: 4,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#007AFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  
  buttonRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#07C3C3",
  },
  confirmButton: {
    backgroundColor: "#08C5C1",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
