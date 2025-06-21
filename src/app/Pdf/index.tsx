import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { ref, query, orderByKey, startAt, endAt, get } from 'firebase/database';
import { database } from '../../../firebaseConfig';

export default function PDFGenerator() {
  const [inicio, setInicio] = useState(new Date());
  const [fim, setFim] = useState(new Date());
  const [dados, setDados] = useState<any[]>([]);
  const [mostrarInicio, setMostrarInicio] = useState(false);
  const [mostrarFim, setMostrarFim] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const buscarLeiturasPorIntervalo = async (startDate: Date, endDate: Date) => {
    try {
      setIsLoading(true);
      if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
        throw new Error('Datas inválidas');
      }

      if (startDate > endDate) {
        throw new Error('Data inicial maior que data final');
      }

      startDate.setHours(0,0,0,0);
      endDate.setHours(23,59,59,99);
      
      const formatFirebaseKey = (date: Date) => {
        const pad = (num: number) => num.toString().padStart(2, '0');
        return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}_${pad(date.getHours())}-${pad(date.getMinutes())}`;
      };

      const startKey = formatFirebaseKey(startDate);
      const endKey = formatFirebaseKey(endDate);

      
      const historicoRef = ref(database, 'HistoricoSensores');
      
      
      const historicoQuery = query(
        historicoRef,
        orderByKey(),
        startAt(startKey),
        endAt(endKey)
      );

      
      const snapshot = await get(historicoQuery);
      
      if (!snapshot.exists()) {
        return [];
      }

      
      const resultados: any[] = [];
      snapshot.forEach((childSnapshot) => {
        const dado = childSnapshot.val();
        const key = childSnapshot.key; 
        

        const [datePart, timePart] = key.split('_');
        const [year, month, day] = datePart.split('-').map(Number);
        const [hour, minute] = timePart.split('-').map(Number);
        
        
        const dataRegistro = new Date(year, month-1, day, hour, minute);
        
       
        resultados.push({
          id: childSnapshot.key,
          timestamp: dado.timestamp || dataRegistro.getTime(),
          CO2In: dado.CO2 || 0,
          CO: dado.CO || 0,
          CCOV: dado.CCOV || 0,
          Temperatura: dado.Temperatura || null
        });
      });

      
      resultados.sort((a, b) => b.timestamp - a.timestamp);

      return resultados;
    } catch (error) {
      console.error('Erro na busca de leituras:', error);
      throw new Error('Falha ao buscar dados do Firebase');
    } finally {
      setIsLoading(false);
    }
  };

  const gerarRelatorio = async () => {
    if (inicio > fim) {
      Alert.alert('Datas inválidas', 'A data inicial deve ser anterior à data final');
      return;
    }

    try {
      const resultados = await buscarLeiturasPorIntervalo(inicio, fim);
      setDados(resultados);
    } catch (e) {
      Alert.alert('Erro', 'Falha ao buscar dados do Firebase');
    }
  };

  const generateHTML = () => {
    const rows = dados.map((dado, i) => `
      <tr>
        <td style="${stylesPDF.tableCell}">${new Date(dado.timestamp).toLocaleString()}</td>
        <td style="${stylesPDF.tableCell}">${dado.CO2In} ppm</td>
        <td style="${stylesPDF.tableCell}">${dado.CO} ppm</td>
        <td style="${stylesPDF.tableCell}">${dado.CCOV} ppb</td>
        ${dado.Temperatura ? `<td style="${stylesPDF.tableCell}">${dado.Temperatura} °C</td>` : ''}
      </tr>
    `).join('');

    return `
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: 'Arial', sans-serif;
              margin: 0;
              padding: 0;
              color: #333;
              background-color: #f8fafb;
            }
            .page {
              padding: 30px 40px;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 2px solid #eaeaea;
            }
            .logo {
              height: 80px;
              margin-bottom: 15px;
            }
            .title {
              font-size: 28px;
              font-weight: 700;
              color: #1a1a1a;
              margin: 10px 0 5px;
              letter-spacing: 0.5px;
            }
            .subtitle {
              font-size: 16px;
              color: #666;
              margin-bottom: 0;
            }
            .info-box {
              margin-bottom: 30px;
              padding: 25px;
              background-color: white;
              border-radius: 12px;
              border-left: 5px solid #45f6cb;
              box-shadow: 0 3px 10px rgba(0,0,0,0.05);
            }
            .info-box h2 {
              margin-top: 0;
              color: #1a1a1a;
              font-size: 18px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 30px 0;
              box-shadow: 0 3px 10px rgba(0,0,0,0.05);
              overflow: hidden;
              border-radius: 10px;
            }
            th {
              background-color: #45f6cb;
              color: #1a1a1a;
              padding: 15px;
              text-align: left;
              font-weight: 600;
              font-size: 14px;
            }
            td {
              padding: 14px;
              border-bottom: 1px solid #f0f0f0;
              font-size: 13px;
            }
            tr:nth-child(even) {
              background-color: #fdfdfd;
            }
            tr:nth-child(odd) {
              background-color: white;
            }
            tr:hover {
              background-color:rgb(245, 255, 253);
            }
            .footer {
              margin-top: 50px;
              font-size: 11px;
              color: #999;
              text-align: center;
              border-top: 1px solid #eee;
              padding-top: 15px;
              font-family: 'Arial Narrow', sans-serif;
            }
            .highlight {
              color: #1a1a1a;
              font-weight: 600;
            }
          </style>
        </head>
        <body>
          <div class="page">
            <div class="header">
            

            <div class="info-box">
              <h2>Dados do Monitoramento</h2>
              <p><strong>Período analisado:</strong> <span class="highlight">${inicio.toLocaleDateString()} - ${fim.toLocaleDateString()}</span></p>
              <p><strong>Total de medições:</strong> <span class="highlight">${dados.length}</span></p>
              <p><strong>Data de emissão:</strong> <span class="highlight">${new Date().toLocaleDateString()}</span></p>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Data/Hora</th>
                  <th>CO₂ (ppm)</th>
                  <th>CO (ppm)</th>
                  <th>CCOV (ppb)</th>
                  ${dados.some(d => d.Temperatura) ? '<th>Temperatura (°C)</th>' : ''}
                </tr>
              </thead>
              <tbody>
                ${rows}
              </tbody>
            </table>

            <div class="footer">
              EcoBreath © ${new Date().getFullYear()} | Sistema de Monitoramento Ambiental<br>
              Relatório gerado automaticamente em ${new Date().toLocaleString()}
            </div>
          </div>
        </body>
      </html>
    `;
};

  const generatePDF = async () => {
    if (dados.length === 0) {
      Alert.alert('Atenção', 'Nenhum dado disponível para gerar o relatório');
      return;
    }

    setIsGenerating(true);
    try {
      const html = generateHTML();
      
    
      const { uri } = await Print.printToFileAsync({ 
        html,
        width: 595,   
        height: 842,  
      });

      
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Compartilhar Relatório',
        UTI: 'com.adobe.pdf'
      });
      
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      Alert.alert(
        'Erro', 
        'Não foi possível gerar o PDF. Tente novamente.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Gerar Relatório EcoBreath</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Data Inicial:</Text>
          <Button
            title={inicio.toLocaleDateString()}
            onPress={() => setMostrarInicio(true)}
            color="#2c6e49"
          />
          {mostrarInicio && (
            <DateTimePicker
              value={inicio}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(_, date) => {
                setMostrarInicio(false);
                if (date) setInicio(date);
              }}
            />
          )}

          <Text style={[styles.label, { marginTop: 15 }]}>Data Final:</Text>
          <Button
            title={fim.toLocaleDateString()}
            onPress={() => setMostrarFim(true)}
            color="#2c6e49"
          />
          {mostrarFim && (
            <DateTimePicker
              value={fim}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(_, date) => {
                setMostrarFim(false);
                if (date) setFim(date);
              }}
            />
          )}

          <View style={styles.buttonContainer}>
            <Button
              title={isLoading ? "Buscando..." : "Buscar Dados"}
              onPress={gerarRelatorio}
              color="#40916c"
              disabled={isLoading}
            />
            {isLoading && <ActivityIndicator style={styles.loadingIndicator} color="#2c6e49" />}
          </View>
        </View>

        {dados.length > 0 && (
          <View style={styles.pdfButtonContainer}>
            {isGenerating ? (
              <ActivityIndicator size="large" color="#2c6e49" />
            ) : (
              <Button
                title="Gerar e Compartilhar PDF"
                onPress={generatePDF}
                color="#2c6e49"
              />
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9f0e7',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#1b4332',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c6e49',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#d9f0db',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#7cc47f',
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingIndicator: {
    marginLeft: 10,
  },
  pdfButtonContainer: {
    marginTop: 20,
    width: '100%',
  },
});

const stylesPDF = {
  tableCell: `
    padding: 10px;
    border-bottom: 1px solid #e0e0e0;
    text-align: left;
    font-size: 14px;
  `,
};