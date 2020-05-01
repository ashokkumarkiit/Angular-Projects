***********************************
TOTAl LINES OF CODES
***********************************
Total 3180 lines of code written from scratch
***********************************
Frontend - 1775
        barchart-analytics - 55
        covid-prediction - 230
        exercide-detail - 180
        exercises - 50
        health-analytics - 200
        map-analytics - 100
        search - 230
        search-item - 50
        workout - 130
        Other Helper Classes - 170
        app classes - 200
        angular services - 180
Backend - 560
Python Scripts - 845 

**************
Instructions:- 
**************
The folder structure of the Health Analytics folder consists of below folders :-
1) backend :-
        This folder consists of all the backed related code. Here all the node API is build which is communicating to the postgreSQL database.
2) frontend :-
        All the Angular related code is present here.
3) COVID Predictor-Tensorflow :- 
        Contains python script for predicting confirmed and death time-series using Tensorflow Recurrent Neural Network with LSTM calls.
4) backend-build-WGER :-
        Python script which pulls data from API and stores it into the database.
5) NPODB :- 
        Pulls the CDC data and stores it into the database.
Version - 
1) npm - 6.13.4
2) node - 12.14.1
3) python - 3.7.4

*****************************
Credentials for PostgreSQL :-
*****************************
Username - postgres
Password - root
Database - uml_project

**********************
Project Installation :- 
**********************
For Backend and Frontend :- 
    For building the backend please follow the below details :- 
        1) Remove the node_modules folder from backend.
        2) Use terminal or cmd to redirect to the "backend" folder inside HealthAnalytics.
        3) Now run command "npm install" to install all the dependencies.
        4) The folder consists of package.json file which contains all the dependencies required for the project.
        5) Dependencies
            - axios
            - express
            - pg

    For building the frontend please follow the below details :- 
        1) Remove the node_modules folder from frontend folder.
        2) Use terminal or cmd to redirect to the "frontend" folder inside HealthAnalytics.
        3) Now run command "npm install" to install all the dependencies.
        4) The folder consists of package.json file which contains all the dependencies required for the project.
        5) Dependencies
            - d3
            - c3
            - datamaps

************
Execution :-
************
Once all the dependencies have been installed for both frontend and backend, we can start below commands - 
1) For Server - node server
2) For Frontend - ng serve

Both the backend and frontend needs to be executed.
Backend - localhost:4000 
Frontend - localhost:4200

Note- Backend need to be started before frontend.

