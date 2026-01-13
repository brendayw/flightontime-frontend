import { DataGrid } from '@mui/x-data-grid';
import { Box, Chip, LinearProgress, Typography } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'aerolinea', headerName: 'Aerolínea', width: 120 },
  { field: 'origen', headerName: 'Origen', width: 120 },
  { field: 'destino', headerName: 'Destino', width: 120 },

  { field: 'status', headerName: 'Estado', width: 140,
    renderCell: (params) => {
      const value = params.value || 'Desconocido';
      return (
        <Chip label={value} color={value === 'On Time' ? 'success' : 'warning'} size="small"/>
      );
    },
  },

  { field: 'probability', headerName: 'Probabilidad', width: 170,
    renderCell: (params) => {
      const value = Number(params.value) || 0;

      return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" value={value}
                sx={{
                    height: 8,
                    borderRadius: 4,
                    //backgroundColor: '#e0e0e0',
                    mb: 0.5,
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: value >= 80 ? '#4caf50' : '#FF854C',
                    }
                }}
            />
            <Typography variant="caption">{value}%</Typography>
        </Box>
      );
    },
  },

  //{ field: 'delay', headerName: 'Demora estimada (min)', width: 180, align: 'center', headerAlign: 'center' },

  { field: 'factors', headerName: 'Factores principales', width: 250,
    renderCell: (params) => {
      const factors = Array.isArray(params.value) ? params.value : [];

        return (
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                {factors.length > 0 ? (
                    factors.map((f) => (
                    <Chip key={f} label={f} size="small" variant="outlined" />
                    ))
                ) : (
                    <Typography variant="caption" color="text.secondary">
                        Sin datos
                    </Typography>
                )}
            </Box>
        );
    },
  },

  { field: 'date', headerName: 'Fecha y Hora', width: 140 }
];

const AdminPredictions = ({ predictions = [] }) => {
    
    return (
        <Box sx={{ height: 650, width: '100%', mb: 8 }} >
            <Typography variant="h5" gutterBottom fontWeight="bold">
                Usuarios registrados 
            </Typography>

            <DataGrid
                rows={predictions}
                columns={columns}
                pageSizeOptions={[10, 25, 50]}
                //checkboxSelection
                disableRowSelectionOnClick
                getRowHeight={() => 'auto'}
                sx={{
                    borderRadius: 4,
                    background: 'rgba(65, 64, 64, 0.35)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                    border: '0.5px solid #d9d9d954',
                    color: '#EAE8EC',
                    //fondo de la columna (encabezados)
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: 'transparent',
                        borderBottom: 'none',
                    },
                    '& .MuiDataGrid-columnHeader': {
                        backgroundColor: 'transparent !important',
                    },
                    '& .MuiDataGrid-columnHeadersInner': {
                    backgroundColor: 'transparent !important',
                    }, 
                    '& .MuiDataGrid-filler': {
                        backgroundColor: 'transparent !important',
                    },
                    //color de fondo (celdas con info)
                    '& .MuiDataGrid-overlay': {
                        backgroundColor: 'transparent',
                    },
                    //Color de texto y paginacion
                    '& .MuiTablePagination-displayedRows': {
                        color: '#EAE8EC',
                    },
                    '& .MuiTablePagination-actions .MuiSvgIcon-root': {
                        color: '#EAE8EC',
                    },
                    // '& .MuiDataGrid-main': {
                    //     backgroundColor: 'transparent',
                    // },
                    // '& .MuiDataGrid-columnHeader--sortable': {
                    //     backgroundColor: 'transparent !important',
                    // },
                    // '& .MuiDataGrid-columnHeader--last': {
                    //     backgroundColor: 'transparent !important',
                    // },
                    // '& .MuiDataGrid-withBorderColor': {
                    //     backgroundColor: 'transparent !important',
                    // },
                    // '& .MuiDataGrid-cell': {
                    //     backgroundColor: 'transparent',
                    //     borderBottom: 'none',
                    // },
                    // '& .MuiDataGrid-row': {
                    //     backgroundColor: 'transparent',
                    // },
                    // '& .MuiDataGrid-row:hover': {
                    //     backgroundColor: 'transparent',
                    // },
                    // '& .MuiDataGrid-row.Mui-selected': {
                    //     backgroundColor: 'transparent',
                    // },
                    // '& .MuiDataGrid-footerContainer': {
                    //     backgroundColor: 'transparent',
                    //     borderTop: 'none',
                    // },
                }}
            />
        </Box>
  );
};

export default AdminPredictions;