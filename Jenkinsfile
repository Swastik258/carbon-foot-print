pipeline {
    agent any

    stages {
        stage('Git Clone') {
            steps {
                git url: 'https://github.com/Swastik258/carbon-foot-print.git', branch: 'main'
                echo "Successfully cloned repository"
            }
        }

        stage('Build Docker image') {
            steps {
                sh 'docker build -t swastik802/carbonfootprintproject:latest .'
            }
        }

        stage('Login to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
                }
            }
        }

        stage('Upload the image to DockerHub') {
            steps {
                sh 'docker push swastik802/carbonfootprintproject:latest'
            }
        }

        stage('Run Docker container') {
            steps {
                sh 'docker run -d -p 5173:5173 swastik802/carbonfootprintproject:latest'
            }
        }
    }
}
