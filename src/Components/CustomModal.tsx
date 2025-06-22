import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePicker from "@react-native-community/datetimepicker";

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

interface DatePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onGenerate: (inicio: Date, fim: Date) => void;
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
            <Pressable
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={[styles.buttonText, { color: "#07C3C3" }]}>
                Cancelar
              </Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.confirmButton]}
              onPress={onConfirm}
            >
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
            style={[
              styles.icon,
              { transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] },
            ]}
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

export function CustomModalLogin({
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
            style={[
              styles.icon,
              { transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] },
            ]}
          />
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalMessage}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
}

export function DatePickerModal({
  visible,
  onClose,
  onGenerate,
}: DatePickerModalProps) {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleGenerate = () => {
    if (startDate > endDate) {
      Alert.alert(
        "Datas inválidas",
        "A data inicial deve ser anterior à data final"
      );
      return;
    }
    onGenerate(startDate, endDate);
    onClose();
  };

  const onStartChange = (event: any, selectedDate?: Date) => {
    setShowStartPicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const onEndChange = (event: any, selectedDate?: Date) => {
    setShowEndPicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, styles.dateModalContainer]}>
          <Icon
            name="calendar-text"
            size={50}
            color="#08C5C1"
            style={styles.icon}
          />
          <Text style={styles.modalTitle}>Selecione o período</Text>

          <View style={styles.datePickerContainer}>
            <Text style={styles.label}>Data Inicial:</Text>
            <Pressable
              style={styles.dateButton}
              onPress={() => setShowStartPicker(true)}
            >
              <Text style={styles.dateText}>{formatDate(startDate)}</Text>
            </Pressable>

            <Text style={[styles.label, { marginTop: 20 }]}>Data Final:</Text>
            <Pressable
              style={styles.dateButton}
              onPress={() => setShowEndPicker(true)}
            >
              <Text style={styles.dateText}>{formatDate(endDate)}</Text>
            </Pressable>

            {showStartPicker && (
              <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={onStartChange}
                maximumDate={new Date()}
              />
            )}

            {showEndPicker && (
              <DateTimePicker
                value={endDate}
                mode="date"
                display="default"
                onChange={onEndChange}
                minimumDate={startDate}
                maximumDate={new Date()}
              />
            )}
          </View>

          <View style={styles.buttonRow}>
            <Pressable
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={[styles.buttonText, { color: "#07C3C3" }]}>
                Cancelar
              </Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.confirmButton]}
              onPress={handleGenerate}
            >
              <Text style={[styles.buttonText, { color: "white" }]}>
                Gerar PDF
              </Text>
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
  dateModalContainer: {
    width: "85%",
    padding: 25,
  },
  icon: {
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
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
  datePickerContainer: {
    width: "100%",
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#f9f9f9",
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
});