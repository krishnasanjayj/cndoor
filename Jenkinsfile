pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/krishnasanjayj/cndoor.git'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('My Sonar Server') {
                    sh 'sonar-scanner'
                }
            }
        }
    }
}
