import { useState, useEffect } from "react";
import { getAnalyticsData } from "../services/analyticsService.js";
import AnalyticsStats from "../components/analytics/AnalyticsStats.jsx";
import WeeklyActivityChart from "../components/analytics/WeeklyActivityChart.jsx";
import SubjectProgressAnalytics from "../components/analytics/SubjectProgressAnalytics.jsx";
import ProductivityInsights from "../components/analytics/ProductivityInsights.jsx";
import StatusDistributionCard from "../components/analytics/StatusDistributionCard.jsx";
import AnalyticsHeader from "../components/analytics/AnalyticsHeader.jsx";
import AnalyticsFilter from "../components/analytics/AnalyticsFilter.jsx";


const AnalyticsPage = () => {


    const [analytics, setAnalytics] = useState(null);

    const [loading, setLoading] = useState(true);

    // for the analytics filter
    const [range, setRange] = useState(30);

    useEffect(() => {

        const fetchAnalyticsData = async () => {

            try {

                const data = await getAnalyticsData(range);

                setAnalytics(data);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }
        }


        fetchAnalyticsData();

    }, [range])


    if (loading) {

        return (
            <div>
                Loading Analytics
            </div>
        );

    }

    return (
        <div className="space-y-6">

            <AnalyticsHeader />

            <AnalyticsFilter
                range={range}
                setRange={setRange}
            />

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