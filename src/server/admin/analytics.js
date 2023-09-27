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

export async function getViews(){
  try {
    await jwt.authorize();

    const data = await google.analytics("v3").data.ga.get({
      auth: jwt,
      ids: "ga:" + view_id,
      "start-date": "30daysAgo",
      "end-date": "today",
      metrics: "ga:pageviews",
    });
    
    return data.data.rows[0][0];
  } catch (err) {
    console.log(err);
  }
}

export async function getTopPosts() {
  try {
    await jwt.authorize();

    const data = await google.analytics("v3").data.ga.get({
      auth: jwt,
      ids: "ga:" + view_id,
      "start-date": "30daysAgo",
      "end-date": "today",
      dimensions: "ga:pagePath,ga:pageTitle",
      metrics: "ga:pageviews",
      sort: "-ga:pageviews",
      "max-results": "10",
      filters: "ga:medium==organic",
    });
    
    return data.data.rows;
  } catch (err) {
    console.log(err);
  }
}