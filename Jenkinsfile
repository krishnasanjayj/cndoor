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
                        -Dsonar.login=squ_70db5226b04dffafe66cc5f281bf4525bd64ab87
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
