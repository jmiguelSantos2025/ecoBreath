import React from 'react';
import { Alert } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { ref, query, orderByKey, startAt, endAt, get } from 'firebase/database';
import { database } from '../../firebaseConfig';

type Props = {
  inicio: Date;
  fim: Date;
};

const RelatorioPDF = async ({ inicio, fim }: Props) => {
  try {
    if (inicio > fim) {
      Alert.alert('Datas inválidas', 'A data inicial deve ser anterior à data final');
      return;
    }

    const buscarLeiturasPorIntervalo = async (startDate: Date, endDate: Date) => {
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 99);

      const formatFirebaseKey = (date: Date) => {
        const pad = (num: number) => num.toString().padStart(2, '0');
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}_${pad(date.getHours())}-${pad(date.getMinutes())}`;
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
      if (!snapshot.exists()) return [];

      const resultados: any[] = [];
      snapshot.forEach((childSnapshot) => {
        const dado = childSnapshot.val();
        const key = childSnapshot.key;
        const [datePart, timePart] = key.split('_');
        const [year, month, day] = datePart.split('-').map(Number);
        const [hour, minute] = timePart.split('-').map(Number);
        const dataRegistro = new Date(year, month - 1, day, hour, minute);

        resultados.push({
          id: key,
          timestamp: dado.timestamp || dataRegistro.getTime(),
          CO2In: dado.CO2 || 0,
          CO: dado.CO || 0,
          CCOV: dado.CCOV || 0,
          Temperatura: dado.Temperatura || null,
        });
      });

      resultados.sort((a, b) => b.timestamp - a.timestamp);
      return resultados;
    };

    const dados = await buscarLeiturasPorIntervalo(inicio, fim);

    if (dados.length === 0) {
      Alert.alert('Aviso', 'Nenhum dado encontrado para o período.');
      return;
    }

    const rows = dados.map((dado) => `
      <tr>
        <td style="padding:10px;border-bottom:1px solid #e0e0e0;text-align:left;">${new Date(dado.timestamp).toLocaleString()}</td>
        <td style="padding:10px;border-bottom:1px solid #e0e0e0;text-align:left;">${dado.CO2In} ppm</td>
        <td style="padding:10px;border-bottom:1px solid #e0e0e0;text-align:left;">${dado.CO} ppm</td>
        <td style="padding:10px;border-bottom:1px solid #e0e0e0;text-align:left;">${dado.CCOV} ppb</td>
        ${dado.Temperatura ? `<td style="padding:10px;border-bottom:1px solid #e0e0e0;text-align:left;">${dado.Temperatura} °C</td>` : ''}
      </tr>
    `).join('');

    const html = `
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; background-color: #f8fafb; color: #333; }
            .page { padding: 30px 40px; }
            .header { text-align: center; margin-bottom: 30px; }
            .info-box { background: white; padding: 20px; border-left: 5px solid #45f6cb; margin-bottom: 20px; border-radius: 12px; }
            table { width: 100%; border-collapse: collapse; border-radius: 10px; box-shadow: 0 3px 10px rgba(0,0,0,0.05); }
            th { background-color: #45f6cb; color: #1a1a1a; padding: 10px; text-align: left; }
            td { padding: 10px; border-bottom: 1px solid #f0f0f0; }
            tr:nth-child(even) { background: #fdfdfd; }
            tr:nth-child(odd) { background: #ffffff; }
            .footer { margin-top: 30px; font-size: 11px; text-align: center; color: #999; }
          </style>
        </head>
        <body>
          <div class="page">
            <div class="header">
              <h1>Relatório EcoBreath</h1>
            </div>
            <div class="info-box">
              <p><strong>Período:</strong> ${inicio.toLocaleDateString()} - ${fim.toLocaleDateString()}</p>
              <p><strong>Total de leituras:</strong> ${dados.length}</p>
              <p><strong>Gerado em:</strong> ${new Date().toLocaleString()}</p>
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
              <tbody>${rows}</tbody>
            </table>
            <div class="footer">
              EcoBreath &copy; ${new Date().getFullYear()} — Monitoramento Ambiental
            </div>
          </div>
        </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({
      html,
      width: 595,
      height: 842,
    });

    await Sharing.shareAsync(uri, {
      mimeType: 'application/pdf',
      dialogTitle: 'Compartilhar Relatório',
      UTI: 'com.adobe.pdf',
    });

  } catch (error) {
    console.error(error);
    Alert.alert('Erro', 'Erro ao gerar o relatório PDF.');
  }
};

export default RelatorioPDF;
