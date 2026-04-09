pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                git 'https://github.com/krishnasanjay/cndoor.git'
            }
        }

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
    }
}
