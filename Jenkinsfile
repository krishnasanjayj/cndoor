pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
    }

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
                    withCredentials([string(credentialsId: 'SONAR_AUTH_TOKEN', variable: 'SONAR_TOKEN')]) {
                        sh '''
                        sonar-scanner \
                        -Dsonar.projectKey=react-app \
                        -Dsonar.sources=src \
                        -Dsonar.exclusions=node_modules/**,build/** \
                        -Dsonar.login=squ_9b8b9677491b2e4b3ba5e60359e71c365fb535b4
                        '''
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    script {
                        def qg = waitForQualityGate abortPipeline: false
                        echo "Quality Gate Status: ${qg.status}"
                    }
                }
            }
        }
    }
}
