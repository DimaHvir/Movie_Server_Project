## Local installation
1. Run ```npm install```
2. touch .env
3. In .env, set DATABASE_URL to a new postgreSQL database instance
4. (optional) set DEBUG in .env for debugging 
5. Run ```npm run start:dev```

## Deployed server
Visit deployed server at https://agile-hollows-94305.herokuapp.com/

| Request                | Description                                                                                                           |
| ------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `GET /movies`        | Returns array of all movie objects                                                                         |
| `GET movies/?is_showing=true`     | Returns array of all movies that are showing at some theater                                                                      |
| `GET movies/:movieId`     | Returns the movie with the speicifed ID, if it exists       |
| `GET movies/:movieId/reviews`   | Returns all the reviews for movie with id movieId; critic information appended |
| `GET movies/:movieId/theaters`    | Returns all theaters showing specified movie   |
| `PUT reviews/:reviewId`           | Expects a body with the content property, will update review with new content |
| `DEL reviews/:reviewId`           | Deletes specified review         |
| `GET theaters`           | Returns information for all theaters, including all movies being shown at each theater  |
