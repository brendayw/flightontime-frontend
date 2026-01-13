import { useTheme, useMediaQuery } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

const DistributionChart = ({ history }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!history.length) {
    return <p className='text-[#251A79] text-center'>No hay datos de predicciones</p>;
  }

  const counts = history.reduce((acc, { prevision }) => {
    acc[prevision] = (acc[prevision] || 0) + 1;
    return acc;
  }, {});

  const categories = ['A tiempo', 'Retraso'].filter(cat => counts[cat] !== undefined);
  const values = categories.map(cat => counts[cat]);

  // Ajustes responsivos
  const chartWidth =  isMobile ? 200 : 300;
  const chartHeight = isMobile ? 200 : 300;
  const chartMargin = isMobile
    ? { top: 5, bottom: 5, left: 10, right: 10 }
    : { top: 5, bottom: 5, left: 20, right: 50 };

  return (
    <div className='border border-[#F9F3F3] rounded-xl shadow p-4 flex flex-col items-center justify-center w-full'>
      <BarChart
        xAxis={[{ scaleType: 'band', data: categories }]}
        series={[{ data: values }]}
        width={chartWidth}
        height={chartHeight}
        margin={chartMargin}
        slotProps={{
          legend: { hidden: true },
          tooltip: { trigger: 'none' }
        }}
        sx={{
          '& .MuiBarElement-root:nth-of-type(1)': { fill: '#B0B8F9' },
          '& .MuiBarElement-root:nth-of-type(2)': { fill: '#FF854C' },
          '& .MuiBarElement-root:nth-of-type(3)': { fill: '#FF854C' }
        }}
      />
    </div>
  );
}

export default DistributionChart;