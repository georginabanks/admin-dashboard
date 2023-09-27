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

async function getViews(){
  try {
    await jwt.authorize();

    return await google.analytics("v3").data.ga.get({
      auth: jwt,
      ids: "ga:" + view_id,
      "start-date": "30daysAgo",
      "end-date": "today",
      metrics: "ga:pageviews",
    });
  } catch (err) {
    console.log(err);
  }
}

async function getTopPosts() {
  try {
    await jwt.authorize();

    return await google.analytics("v3").data.ga.get({
      auth: jwt,
      ids: "ga:" + view_id,
      "start-date": "2019-01-01",
      "end-date": "today",
      dimensions: "ga:pagePath,ga:pageTitle",
      metrics: "ga:pageviews",
      sort: "-ga:pageviews",
      "max-results": "10",
      filters: "ga:medium==organic",
    });
  } catch (err) {
    console.log(err);
  }
}