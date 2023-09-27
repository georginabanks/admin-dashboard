import { google } from 'googleapis';
import ck from 'ckey';

const scopes = "https://www.googleapis.com/auth/analytics.readonly";

const jwt = new google.auth.JWT(
  ck.CLIENT_EMAIL,
  null,
  ck.PRIVATE_KEY.replace(/\\n/g, "\n"),
  scopes
);

const view_id = ck.VIEW_ID;

export async function getViews( startDate, endDate ){
  try {
    await jwt.authorize();

    const data = await google.analytics("v3").data.ga.get({
      auth: jwt,
      ids: "ga:" + view_id,
      "start-date": startDate,
      "end-date": endDate,
      metrics: "ga:pageviews",
    });
    
    return data.data.rows !== undefined ? data.data.rows[0][0] : 0;
  } catch (err) {
    console.log(err);
  }
}

export async function getViewsByDate( startDate, endDate ){
  try {
    await jwt.authorize();

    const data = await google.analytics('v3').data.ga.get({
      'auth': jwt,
      'ids': 'ga:' + view_id,
      'start-date': startDate,
      'end-date': endDate,
      'dimensions': 'ga:dayOfWeekName',
      'metrics': 'ga:pageviews',
    });
    
    return data.data.rows !== undefined ? data.data.rows : 0;
  } catch (err) {
    console.log(err);
  }
}

export async function getTopPosts( startDate, endDate ) {
  try {
    await jwt.authorize();

    const data = await google.analytics("v3").data.ga.get({
      auth: jwt,
      ids: "ga:" + view_id,
      "start-date": startDate,
      "end-date": endDate,
      dimensions: "ga:pagePath,ga:pageTitle",
      metrics: "ga:pageviews",
      sort: "-ga:pageviews",
      "max-results": "10",
      filters: "ga:medium==organic",
    });
    
    return data.data.rows !== undefined
            ? data.data.rows
            : []
  } catch (err) {
    console.log(err);
  }
}