pipeline {
    agent any

    stages {

        stage('Run Ansible') {
            steps {
                sh '''
                docker run --rm \
                -v $(pwd):/ansible \
                -w /ansible \
                alpine/ansible:latest \
                ansible-playbook -i inventory.ini playbook.yml
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t krishnasanjay/devops-project .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                sh '
                
                docker push krishnasanjay/devops-project
                '
            }
        }
    }
}
