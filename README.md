# About project
Testing how to create admin view using:
- react query (either as infinite queries or paginated queries)
- postgraphile (middleware between postgres db and generated types using graphql)
- react table
- vite
- authentication via firebase
- authorization via postgraphile's row access JWT most likely

# How to install project
```bash
cd postgraphile
npm i
cd ../frontend
npm i
npm run generate-graphql-types
```
In order to run postgraphile you will need a running database somewhere. I am including that in `docker-compose.yml`.
There are prepared data for database in `./postgraphile/resources` which should be run in ascending order 

# How to run project
- Make sure postres database is running
- Run postgraphile `npm run start`
- Then run frontend `npm run dev`
