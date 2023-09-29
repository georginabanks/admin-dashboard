import ck from "ckey";
import {BetaAnalyticsDataClient} from '@google-analytics/data';

const propertyId = ck.PROPERTY_ID;

// Using a default constructor instructs the client to use the credentials
// specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.
const analyticsDataClient = new BetaAnalyticsDataClient();

// Runs a simple report.
export async function runReport() {
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
	
	let res = [];
	response.rows.forEach(row => {
		const year = row.dimensionValues[0].value.slice(0, 4);
		const month = row.dimensionValues[0].value.slice(4, 6);
		const date = row.dimensionValues[0].value.slice(6, 8)
		
		res.push({
			id: row.dimensionValues[0].value,
			datetime: `${year}-${month}-${date}T00:00:00.000`,
			views: row.metricValues[0].value });
	});
	
	console.log('Report result: ', res)
	return res;
}