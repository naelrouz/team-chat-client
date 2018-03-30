## Build Setup

```bash
# install dependencies
yarn

# serve with hot reload at localhost:8000
yarn dev

# build for production with minification
---
```

## Project Structure

* `src/assets` - folder with static assets (images)
* `src/components` - folder with custom `.vue` components
* `src/main.js` - main app file where you include/import all required libs and init app
* `src/routes.js` - app routes
* `src/App.vue` - main app structure/component

## Apollo 2.0 Migration

https://github.com/apollographql/apollo-client/blob/master/docs/source/2.0-migration.md

## Testing

## JOIN WTF !!! I DON'T UNDERSTAND :) READ DOCS!

```SQL
SELECT * FROM "Teams" INNER JOIN ( "members" AS "Users->member" INNER JOIN "Users" AS "Users" ON "Users"."id" = "Users->member"."user_id") ON "Team"."id" = "Users->member"."team_id" AND "Users"."id" = 1;


select * from "Teams" join "members" on "Teams"."id" = "members"."team_id" where user_id = ?
```
