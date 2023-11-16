# French Learning Pronouniciation App

This app gives students a chance to practice their french pronouniciation. The students can use the audio in the learning section to practice their french. The audio being played has been scraped from https://www.rocketlanguages.com/french/lessons/french-alphabet in the backend. The audio offers good pronouniciation that the students can gauge themselves against.

Since the platform serves as a learning plarform, there is a section that allows users to add their todo lists and also notes of what they have learnt so far. As students they are meant to complete their tasks at given time, hence they are encouraged to set reminders for their tasks. If they do not set reminders, reminders are automatically set for the todo list items 20 minutes apart.

The calendar section shows their list of tasks mapped throught their day.

### Technologies used

The app is built on vuejs3 , Vite , Tailwind , Pinia for the store, ApolloClient and vuejs3 composables.
For Authentication the project utilizes firebase auth.
We have also utilized docker for containeraization and Jenkins for CI/CD.

### Design Inspo

Design inspo for the project was gotten from dribble and other live sites.
Here are the various designs that were reproduced.

https://dribbble.com/shots/16876423-Learning-Online-Education-Landing-Page - For the landing page
https://dribbble.com/shots/19120351-Noted-Notes-Dashboard - For the notes and todolist section
https://dribbble.com/shots/20542598-Project-Timeline-Dashboard-SaaS - For the calendar section
https://industrydigitaltalentprogram.safaricom.co.ke/ - For the sidebar menu

Some of the images used were gotten from Flaticon

### Getting Started

On cloning the application the following files need to be filled with their respective data
- The env file will need a base url and a crytpojs encryption key. The encryption key is necessary when encrypting data to send to the backend

To build the image run 

```docker build -t vue-prod -f Dockerfile . ```

To run the container

``` docker run --network=french-network -it -p 5173:80 vue-prod ```

NB: Please also ensure to create a network that will be used by all the containers of the project (frontend, backend, db)


### CI/CD and Hosting

The app is hosted on AWS EC2 instance on docker. 
There is a CI/CD pipeline setup using jenkins and github webhooks in place.
Once changes are made and merged to the dev branch, the image is rebuilt and pushed to the docker hub repository using jenkins.
There is a watchtower container in the AWS EC2 instance that checks for changes in the docker images of the container every hour and if there are changes it brings down the container and brings it back up with the new image from the docker hub repository.

The env file is saved in the jenkins credentials and it is added to the docker image during the build stage in jenkins

### Contribution

As much as students can play the sounds of the vowels in french, they are not able to gauge whether they are pronouning well or not.
The remaining portion of the project is to come up with a machine learning model to compare the students pronounciation and the teachers (the played vowel) pronounication.

