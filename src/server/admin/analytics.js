import ck from "ckey";
import {BetaAnalyticsDataClient} from '@google-analytics/data';

const propertyId = ck.PROPERTY_ID;

// Using a default constructor instructs the client to use the credentials
// specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.
const analyticsDataClient = new BetaAnalyticsDataClient();

// Runs a simple report.
async function runReport() {
    const [response] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [
                {
                    startDate: '7daysAgo',
                    endDate: 'today',
                },
        ],
        dimensions: [
                {
                    name: 'date',
                },
        ],
        metrics: [
                {
                    name: 'screenPageViews',
                }
                ],
    });
    
    console.log('Report result:');
    
    response.rows.forEach(row => {
        console.log(row.dimensionValues[0], row.metricValues[0]);
    });
}

runReport();