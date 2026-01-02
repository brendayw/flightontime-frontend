import { BarChart } from '@mui/x-charts/BarChart';
import useDashboard from '../../hooks/useDashboard';

const PrediccionesDistributionChart = () => {
  const { history, loading, error } = useDashboard();

  if (loading) return <p>Cargando distribución...</p>;
  if (error) return <p>{error}</p>;
  if (!history || history.length === 0) return <p>No hay datos de predicciones</p>;

  // Contamos por tipo de previsión
  const counts = history.reduce((acc, item) => {
    acc[item.prevision] = (acc[item.prevision] || 0) + 1;
    return acc;
  }, {});

  const categories = Object.keys(counts);
  const values = Object.values(counts);

  // Colores específicos
  const colorMap = {
    'A tiempo': '#B0B8F9',
    'Retraso': '#FF854C'
  };

  // Crear dataset con la categoría incluida
  const chartData = categories.map((cat, idx) => ({
    category: cat,
    value: values[idx],
    color: colorMap[cat]
  }));

  return (
    <div className="border border-[#F9F3F3] rounded-xl shadow p-4 flex flex-col items-center justify-center">
      {/* <h2 style={{ marginBottom: '20px', color: '#333' }}>📊 Distribución de predicciones</h2>
      <svg width="0" height="0">
        <defs>
          {chartData.map((item, idx) => (
            <linearGradient key={idx} id={`barColor${idx}`}>
              <stop offset="0%" stopColor={item.color} />
              <stop offset="100%" stopColor={item.color} />
            </linearGradient>
          ))}
        </defs>
      </svg> */}
      <BarChart
        xAxis={[{ 
          scaleType: 'band', 
          data: categories,
        }]}
        series={[{
          data: values,
        }]}
        height={300}
        margin={{ top: 5, bottom: 10, left: 20, right: 50 }}
        slotProps={{
          xAxis: {
            line: { stroke: '#251A79', strokeWidth: 2 },
            tick: { stroke: '#251A79' },
            label: { fill: '#251A79' },
          },
          yAxis: {
            line: { stroke: '#251A79', strokeWidth: 2 },
            tick: { stroke: '#251A79' },
            label: { fill: '#251A79' },
          },
          legend: {
            hidden: 'true',
          },
          tooltip: {
            trigger: 'none',
          },
        }}
        sx={{
          [`& .MuiBarElement-root:nth-of-type(1)`]: {
            fill: colorMap['A tiempo'],
          },
          [`& .MuiBarElement-root:nth-of-type(2)`]: {
            fill: colorMap['Retraso'],
          },
        }}
      />
    </div>
  );
};

export default PrediccionesDistributionChart;