#!groovy
def tryStep(String message, Closure block, Closure tearDown = null) {
    try {
        block()
    }
    catch (Throwable t) {
        slackSend message: "${env.JOB_NAME}: ${message} failure ${env.BUILD_URL}", channel: '#ci-channel', color: 'danger'
        throw t
    }
    finally {
        if (tearDown) {
            tearDown()
        }
    }
}

node {
    stage("Checkout") {
        checkout scm
    }

    stage('Unit tests') {
      options {
        timeout(time: 30, unit: 'MINUTES')
      }
      environment {
        PROJECT = "${PROJECT_PREFIX}unit"
      }
      steps {
        sh "docker-compose -p ${PROJECT} up --build --exit-code-from test-unit test-unit"
      }
      post {
        always {
          sh "docker-compose -p ${PROJECT} down -v || true"
        }
      }
    }

    stage('Build A') {
      when { expression { BRANCH_NAME ==~ /(master|develop)/ } }
      options {
        timeout(time: 30, unit: 'MINUTES')
      }
      tryStep "build", {
                docker.withRegistry("${DOCKER_REGISTRY_HOST}",'docker_registry_auth') {
                def image = docker.build("atlas/app:${env.BUILD_NUMBER}",
                    "--shm-size 1G " +
                    "--build-arg NODE_ENV=acc " +
                    ".")
                    image.push()
                }
            }
        }
    }



    node {
    stage('Deploy A (Master & Develop)') {
      when { expression { BRANCH_NAME ==~ /(master|develop)/ } }
      options {
        timeout(time: 5, unit: 'MINUTES')
      }
            tryStep "image tagging", {
                docker.withRegistry("${DOCKER_REGISTRY_HOST}",'docker_registry_auth') {
                    def image = docker.image("atlas/app:${env.BUILD_NUMBER}")
                    image.pull()
                    image.push("acceptance")
                }
            }
        }
    }

    node {
        stage("Deploy to ACC") {
            tryStep "deployment", {
                build job: 'Subtask_Openstack_Playbook',
                parameters: [
                    [$class: 'StringParameterValue', name: 'INVENTORY', value: 'acceptance'],
                    [$class: 'StringParameterValue', name: 'PLAYBOOK', value: 'deploy-client.yml'],
                ]
            }
        }
    }

    node {
    stage('Build P (Master)') {
      when { expression { BRANCH_NAME ==~ /(master|develop)/ } }
      options {
        timeout(time: 30, unit: 'MINUTES')
      }
      tryStep "build", {
                docker.withRegistry("${DOCKER_REGISTRY_HOST}",'docker_registry_auth') {
                def image = docker.build("atlas/app:${env.BUILD_NUMBER}",
                    "--shm-size 1G " +
                    ".")
                    image.push()
                    image.push("production")
                    image.push("latest")
                }
            }
        }
    }

    stage('Deploy pre P (Master & Develop)') {
      when { expression { BRANCH_NAME ==~ /(master|develop)/ } }
      options {
        timeout(time: 5, unit: 'MINUTES')
      }
      tryStep "deployment pre", {
          build job: 'Subtask_Openstack_Playbook',
          parameters: [
              [$class: 'StringParameterValue', name: 'INVENTORY', value: 'acceptance'],
              [$class: 'StringParameterValue', name: 'PLAYBOOK', value: 'deploy-client-pre.yml'],
          ]
      }
    }

    stage('Waiting for approval (Master)') {
      when { branch 'master' }
      steps {
        script {
          input "Deploy to Production?"
          echo "Okay, moving on"
        }
      }
    }

    node {
    stage('Deploy P (Master)') {
      when { branch 'master' }
      options {
        timeout(time: 5, unit: 'MINUTES')
      }
      tryStep {
        build job: 'Subtask_Openstack_Playbook', parameters: [
          [$class: 'StringParameterValue', name: 'INVENTORY', value: 'production'],
          [$class: 'StringParameterValue', name: 'PLAYBOOK', value: 'deploy-client.yml']
        ]
        }
      }
    }


  post {
    success {
      echo 'Pipeline success'
    }

    failure {
      echo 'Something went wrong while running pipeline'
      slackSend(
        channel: 'ci-channel',
        color: 'danger',
        message: "${JOB_NAME}: failure ${BUILD_URL}"
      )
    }
  }

