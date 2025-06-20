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
            <img src="data:image/png;base64,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" class="logo" alt="EcoBreath Logo">
              <p class="subtitle">Período: <span class="highlight">${inicio.toLocaleDateString()}</span> a <span class="highlight">${fim.toLocaleDateString()}</span></p>
            </div>

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