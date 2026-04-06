pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/krishnasanjayj/cndoor'
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
                    -Dsonar.login=squ_70db5226b04dffafe66cc5f281bf4525bd64ab87
                    '''
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: false
                }
            }
        }
    }
}
