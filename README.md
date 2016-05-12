# Architecture
2 serveurs:
 - Serveur WEB (Scala/JS) [S1]
 - API (JS)               [S2]

1 database:
 - PGSQL                  [D1]

```
client --> [S1] -----------> [S2] --> [D1]
        |-- via client JS -> [S2]
```

# [S1] Serveur WEB

## Partie Scala

Role: Gerer l'authentification et servir le client js de messagerie instantanee

## Partie JS

Role: Envoyer les messages a l'api et synchroniser le chat

# [S2] API

Role:
 - Stocker les messages dans la base de donnee
 - Servir les conversations aux clients
 - Gerer l'authentification

## Endpoints

 - POST `/auth`: Permet l'authentification des clients js
 - POST `/messages`: Permet d'enregister un nouveau message dans [D1]
 - GET  `/messages?timestamp`: Permet de recuperer les messages depuis [D1]
 - POST `/user`: Permet d'enregistrer un nouvel user dans [D1]
 - GET  `/user?user_id`: Permet de recuperer les information du user `user_id`
 - DELETE `/user?user_id`: Permet de delete un user
 - PUT `/user?user_id`: Permet de update un user avec les informations fournies

### POST /messages

`POST /messages` acceptera ce type de donnees:
```
{
  content: String,
  user_id: String
}
```
et renvera les status suivant:
 - `400`: Si le format de donnees ne correspond pas
 - `200`: Si les messages ont bien ete enregistres

### GET /messages?timestamp

`GET /messages` renverra en cas de succes:
```
[
  {
    message_id: uuid,
    content: String,
    user_id: uuid
  },
  ...
]
```

`GET /messages` prend optionnellement un timestamp dans le query param `timestamp`
 - En cas d'absence de timestamp, renvoyer une 400 vide
 - En case de presence de timestamp, revoyer une 200 comprenant tout les messages ayant un timestamp superieur a celui precise

### POST /user

`POST /user` acceptera ce type de donnees:
```
{
  username: String,
  localisation: String,
  password: String,
  mail: String
}
```
et renverra `200` une fois l'utilisateur enregistre

### GET /user?user_id

`GET /user` renverra en cas de succes:
```
{
  user_id: uuid,
  username: String,
  localisation: String,
  mail: String
}
```
Ses differentes reponses sont:
 - `200` en cas de succes
 - `400` si le user_id n'est pas specifie
 - `404` si le user n'existe pas

### DELETE /user?user_id

Les differentes reponse possible sont:
 - `200` en cas de success
 - `400` si `user_id` n'est pas specife
 - `404` si le user n'existe pas

### PUT /user?user_id

Cet endpoint prend en body un object ayant optionelement les champs suivant:
 - username: String
 - localisation: String
 - mail: String

Les differentes reponse sont
 - `200` si l'update s'est bien passe
 - `400` si `user_id` n'est pas specifie
 - `404` si le user n'existe pas

# [D1] Base de donnees

Role: Stocker les users et les messages

Le schema de base de donnee est le suivant:
```
| me_user             |
| :-----------------: |                            | me_message             |
| me_user_id: UUID PK |                            | :--------------------: |
| username: text      | 0..n                     1 | me_message_id: UUID PK |
| password: text      | -------------------------- | content: text          |
| localisation: text  |                            | timestamp: timestamp   |
| mail: text          |                            | me_user_id: UUID FK    |
```

Le script sql de creation de la base peut etre trouve dans le ficher db/db.sql
