#!/bin/bash

###Pré-requis:
#-------------
#
#
##Outis
#........
#docker
#docker-compose
#
#
##Avant de faire les tests
#..........................
#Pour pouvoir lancer les tests unitaires, il faut d'abord lancer mongoDB
#Pour cela il faut naviguer dans le dossier require et lancer la commande
#sudo docker-compose up


## Test pour la gestion des utilisateurs
npm test ./test/application_business_rules/use_cases/CreateUser.test.js

npm test ./test/application_business_rules/use_cases/GetUser.test.js

npm test ./test/application_business_rules/use_cases/GetAndVerifyAccessToken.test.js


##Test pour le tracking des symptômes
npm test ./test/application_business_rules/use_cases/CreateTracking.test.js

npm test ./test/application_business_rules/use_cases/GetTracking.test.js

npm test ./test/application_business_rules/use_cases/UpdateCurrentDaySymptome.test.js
