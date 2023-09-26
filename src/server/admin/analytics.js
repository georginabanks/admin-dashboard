import { google } from 'googleapis'

const scopes = "https://www.googleapis.com/auth/analytics.readonly";

const jwt = new google.auth.JWT(
  process.env.CLIENT_EMAIL,
  null,
  process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
  scopes
);

const view_id = process.env.view_id;

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