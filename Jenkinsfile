pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/krishnasanjay/cndoor.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('My Sonar Server') {
                    sh '''
                    sonar-scanner \
                    -Dsonar.projectKey=react-app \
                    -Dsonar.sources=src \
                    -Dsonar.exclusions=node_modules/**,build/** \
                    -Dsonar.host.url=http://localhost:9000
                    '''
                }
            }
        }
    }
}
