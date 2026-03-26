stage('SonarQube Analysis') {
    steps {
        withSonarQubeEnv('My Sonar Server') {
            sh 'mvn sonar:sonar'
        }
    }
}
