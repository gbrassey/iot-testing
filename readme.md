# IOT Test Server

## HTTP

### POST /http/votes/{candidate}
- Creates a candidate if one does not exist already by that name
- Increases the vote by one
- Responds w/ JSON of the candidate and their votes

### GET /http/votes/{candidate}
- Responds w/ JSON of the candidate and their votes

### DELETE /http/votes/{candidate}
- Deletes the candidate from the DB
