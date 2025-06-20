import { Dimensions, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

interface ChartData {
  timestamp: number;
  CO2In?: number;
  CO?: number;
  CCOV?: number;
  Temperatura?: number | null;
}

interface ChartComponentProps {
  data: ChartData[];
  yAxisLabel?: string;
  yAxisSuffix?: string;
  chartTitle: string;
  dataKey: keyof ChartData;
  color: string;
}

// Componente de gráfico separado
const ChartComponent: React.FC<ChartComponentProps> = ({ 
  data, 
  yAxisLabel = '', 
  yAxisSuffix = '', 
  chartTitle,
  dataKey,
  color 
}) => {
  if (data.length === 0) return null;

  // Extrair rótulos e valores dos dados
  const labels = data.map(item => 
    new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );
  
  const values = data.map(item => item[dataKey] as number);

  return (
    <View style={{ marginVertical: 10 }}>
      <LineChart
        data={{
          labels,
          datasets: [
            {
              data: values,
              color: (opacity = 1) => color,
              strokeWidth: 2
            }
          ],
          legend: [chartTitle]
        }}
        width={Dimensions.get('window').width - 40}
        height={220}
        yAxisLabel={yAxisLabel}
        yAxisSuffix={yAxisSuffix}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: color
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </View>
  );
};