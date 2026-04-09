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
    }
}
