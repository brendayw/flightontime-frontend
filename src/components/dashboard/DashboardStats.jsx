import useDashboard from "../../hooks/useDashboard";

const DashboardStats = () => {
    const { history, loading, error } = useDashboard();

    if (loading) return <p>Cargando estadísticas...</p>;
    if (error) return <p>Error al cargar estadísticas</p>;

  
    const total = history.length;
    const puntuales = total === 0
        ? 0
        : ((history.filter(h => h.prevision?.toLowerCase().trim() === "a tiempo").length / total) * 100).toFixed(1);

    const retrasos = total === 0
        ? 0
        : ((history.filter(h => h.prevision?.toLowerCase().trim() === "retraso").length / total) * 100).toFixed(1);


    return (
        <div className="dashboard-stats flex justify-center gap-6">
            <div className="stat w-[280px] text-center p-4 bg-gray-100 rounded-lg shadow">
                <span className="text-xl text-[#251A79] font-medium block">📊 Total de predicciones</span>
                <span className="text-3xl text-[#251A79] font-bold">{total}</span>
            </div>
            <div className="stat w-[280px] text-center p-4 bg-green-100 rounded-lg shadow">
                <span className="text-xl text-[#251A79] font-medium block">🟢 Puntuales</span>
                <span className="text-3xl text-[#2e7d32] font-bold">{puntuales}%</span>
            </div>
            <div className="stat w-[280px] text-center p-4 bg-red-100 rounded-lg shadow">
                <span className="text-xl text-[#251A79] font-medium block">🔴 Retrasos</span>
                <span className="text-3xl text-[#d32f2f] font-bold">{retrasos}%</span>
            </div>
        </div>
    );
};

export default DashboardStats;