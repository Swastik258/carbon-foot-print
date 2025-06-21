- Jenkins
- Docker
- AWS EC2
- Docker Hub integration
- Screenshot of deployed frontend

---


```markdown
# 🌱 Carbon Footprint Tracker – CI/CD Pipeline Project

This project demonstrates a complete CI/CD pipeline using **Jenkins**, **Docker**, and **AWS EC2**. It automatically builds, pushes, and deploys a React-based Carbon Footprint Tracking web application using Docker and Docker Hub.

---

## 🚀 Project Architecture

- **Source Code Repo**: [GitHub](https://github.com/Swastik258/carbon-foot-print)
- **CI/CD Tool**: Jenkins (running on AWS EC2)
- **Containerization**: Docker
- **Image Registry**: Docker Hub
- **Deployment**: Docker run on EC2 (port 5173)
- **Live Preview**: https://www.emberate.tech/

---

## 🛠️ Tech Stack

- Jenkins (Pipeline-as-Code using `Jenkinsfile`)
- Docker (for building and running containers)
- GitHub (source repository)
- AWS EC2 (Ubuntu 22.04)
- Docker Hub (for image hosting)

---

## 📦 How It Works

1. **Code pushed to GitHub**
2. **Jenkins Pipeline triggered**
3. **Jenkins builds Docker image**
4. **Image pushed to Docker Hub**
5. **Jenkins runs the container on EC2**

---

## 📁 Jenkinsfile Used

```groovy
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
```

---

## 🔐 Jenkins Credentials Setup

In Jenkins:
- Go to **Manage Jenkins** → **Credentials** → **Global**
- Add a new credential:
  - Type: `Username with password`
  - ID: `dockerhub`
  - Username: Docker Hub username (e.g., `swastik802`)
  - Password: Docker Hub password or access token

---

## 📷 Output Screenshot

![Live App](./output.png)  
*Live at: [https://www.emberate.tech/](https://www.emberate.tech/)*

---

## ✅ What You’ll Learn

- How to build a Jenkins pipeline with Docker
- How to deploy React apps using containers
- How to host CI/CD jobs on AWS EC2
- Docker Hub integration with Jenkins

---

## 🙌 Author

**Swastik Pradhan**  
DevOps Engineer | AWS & Docker Enthusiast  
GitHub: [Swastik258](https://github.com/Swastik258)

---

## 📜 License

MIT License
```

---

