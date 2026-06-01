import { useState, useEffect } from "react";
import { getAnalyticsData } from "../services/analyticsService.js";
import AnalyticsStats from "../components/analytics/AnalyticsStats.jsx";
import WeeklyActivityChart from "../components/analytics/WeeklyActivityChart.jsx";
import SubjectProgressAnalytics from "../components/analytics/SubjectProgressAnalytics.jsx";
import ProductivityInsights from "../components/analytics/ProductivityInsights.jsx";
import StatusDistributionCard from "../components/analytics/StatusDistributionCard.jsx";
import AnalyticsHeader from "../components/analytics/AnalyticsHeader.jsx";


const AnalyticsPage = () => {


    const [analytics, setAnalytics] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchAnalyticsData = async () => {

            try {

                const data = await getAnalyticsData();

                setAnalytics(data);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }
        }


        fetchAnalyticsData();

    }, [])


    if (loading) {

        return (
            <div>
                Loading Analytics
            </div>
        );

    }

    return (
        <div className="space-y-6">

            <AnalyticsHeader/>

            <AnalyticsStats
                analytics={analytics}
            />

            <WeeklyActivityChart
                data={analytics.completedTrend}
            />

            <SubjectProgressAnalytics
                subjects={analytics.subjectProgress}
            />

            <ProductivityInsights
                insights={analytics.insights}
                completionRate={analytics.completionRate}
                totalStudyMinutes={analytics.totalStudyMinutes}
            />

            <StatusDistributionCard
                data={analytics.statusDistribution}
            />
        </div>
    )
}

export default AnalyticsPage;