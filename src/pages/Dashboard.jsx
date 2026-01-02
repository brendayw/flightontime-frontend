import { useEffect, useState } from "react";
import { getDashboardSummary, getGlobalHistory } from "../services/api/dashboard/dashboardApi.jsx";
import Header from "../components/layout/Header.jsx";
import Menu from "../components/layout/Menu.jsx";

const Dashboard = () => {
    const [predicted, setPredicted] = useState(false);

    useEffect(() => {
        const testEndpoints = async () => {
            try {
                const summary = await getDashboardSummary();
                console.log("SUMMARY:", summary);

                const history = await getGlobalHistory();
                console.log("GLOBAL HISTORY:", history);
            } catch (error) {
                console.error("Error probando dashboard", error);
            }
        };

        testEndpoints();
    }, []);

    return (
        <section id="home" className='min-h-screen bg-[#ffffff] scroll-smooth'>
            <Header predicted={predicted} />
            <Menu />

            <main>
                <p>Dashboard</p>
            </main>
        </section>
    );
};

export default Dashboard;
