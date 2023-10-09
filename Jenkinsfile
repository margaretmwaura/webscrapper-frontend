pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        sh 'docker build -t french-front -f Dockerfile .'
        sh 'docker tag french-front $DOCKER_FRENCH_FRONT_END_IMAGE'
      }
    }
    // stage('Test') {
    //   steps {
    //     sh 'docker run my-flask-app python -m pytest app/tests/'
    //   }
    // }
    stage('Deploy') {
      steps {
        withCredentials([usernamePassword(credentialsId: "${DOCKER_REGISTRY_CREDS}", passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
          sh "echo \$DOCKER_PASSWORD | docker login -u \$DOCKER_USERNAME --password-stdin docker.io"
          sh 'docker push $DOCKER_FRENCH_FRONT_END_IMAGE'
        }
      }
    }
  }
  post {
    always {
      sh 'docker logout'
    }
  }
}