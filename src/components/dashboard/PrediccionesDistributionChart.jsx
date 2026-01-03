import { BarChart } from '@mui/x-charts/BarChart';

const PrediccionesDistributionChart = ({ history }) => {
  if (!history.length) {
    return <p>No hay datos de predicciones</p>;
  }

  const counts = history.reduce((acc, { prevision }) => {
    acc[prevision] = (acc[prevision] || 0) + 1;
    return acc;
  }, {});

  const categories = ["A tiempo", "Retraso"].filter(
    (cat) => counts[cat] !== undefined
  );
  
  const values = categories.map((cat) => counts[cat]);

  return (
    <div className="border border-[#F9F3F3] rounded-xl shadow p-4 flex flex-col items-center justify-center">
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
            hidden: true,
          },
          tooltip: {
            trigger: 'none',
          },
        }}
        sx={{
          '& .MuiBarElement-root:nth-of-type(1)': {
            fill: '#B0B8F9', // A tiempo - Celeste
          },
          '& .MuiBarElement-root:nth-of-type(2)': {
            fill: '#FF854C', // Retraso - Naranja
          },
          '& .MuiBarElement-root:nth-of-type(3)': {
            fill: '#FF854C', // Por si hay una tercera categoría
          },
        }}
      />
    </div>
  );
};

export default PrediccionesDistributionChart;