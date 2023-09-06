import algoliasearch from "algoliasearch";

const client = algoliasearch(
  process.env.ALGOLIA_APPID,
  process.env.ALGOLIA_ADMINAPIKEY
);

const missingPetsIndex = client.initIndex("missingpets");
const profilesIndex = client.initIndex("profiles");

export { missingPetsIndex, profilesIndex };
