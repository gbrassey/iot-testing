# Novalia Test Server

## HTTP

### POST /http/votes/{candidate}
- increases the votes of the candidate or creates if one does not exist already

### GET /http/votes/{candidate}
- returns a count of the number of votes

### DELETE /http/votes/{candidate}
- deletes the candidate and removes them from the DB
