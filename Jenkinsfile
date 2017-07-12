#!groovy

def tryStep(String message, Closure block, Closure tearDown = null) {
    try {
        block();
    }
    catch (Throwable t) {
        slackSend message: "${env.JOB_NAME}: ${message} failure ${env.BUILD_URL}", channel: '#ci-channel', color: 'danger'

        throw t;
    }
    finally {
        if (tearDown) {
            tearDown();
        }
    }
}


node {
    stage("Checkout") {
        checkout scm
    }

    stage("Build image") {
        tryStep "build", {
            withCredentials([[$class: 'StringBinding', credentialsId: 'PASSWORD_EMPLOYEE', variable: 'PASSWORD_EMPLOYEE'],
                             [$class: 'StringBinding', credentialsId: 'PASSWORD_EMPLOYEE_PLUS', variable: 'PASSWORD_EMPLOYEE_PLUS']]) {
                def image = docker.build("build.datapunt.amsterdam.nl:5000/atlas/app:${env.BUILD_NUMBER}")
                // The following line...
                //sh "docker run --rm --env PASSWORD_EMPLOYEE='$PASSWORD_EMPLOYEE' --env PASSWORD_EMPLOYEE_PLUS='$PASSWORD_EMPLOYEE_PLUS' --entrypoint grunt 'build.datapunt.amsterdam.nl:5000/atlas/app:${env.BUILD_NUMBER}' test-e2e"
                // ... is a workaround for ...
                image.inside() {
                    PASSWORD_EMPLOYEE='$PASSWORD_EMPLOYEE' PASSWORD_EMPLOYEE_PLUS='$PASSWORD_EMPLOYEE_PLUS' groovy test-e2e
                }
                // ... which will work in future versions of Jenkins.
                // See <https://issues.jenkins-ci.org/browse/JENKINS-36332>

                image.push()
            }
        }
    }
}


String BRANCH = "${env.BRANCH_NAME}"

if (BRANCH == "master") {

    node {
        stage('Push acceptance image') {
            tryStep "image tagging", {
                def image = docker.image("build.datapunt.amsterdam.nl:5000/atlas/app:${env.BUILD_NUMBER}")
                image.pull()
                image.push("acceptance")
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

    stage('Waiting for approval') {
        slackSend channel: '#ci-channel', color: 'warning', message: 'Atlas is waiting for Production Release - please confirm'
        input "Deploy to Production?"
    }

    node {
        stage('Push production image') {
            tryStep "image tagging", {
                def image = docker.image("build.datapunt.amsterdam.nl:5000/atlas/app:${env.BUILD_NUMBER}")
                image.pull()
                image.push("production")
                image.push("latest")
            }
        }
    }

    node {
        stage("Deploy") {
            tryStep "deployment", {
                build job: 'Subtask_Openstack_Playbook',
                parameters: [
                    [$class: 'StringParameterValue', name: 'INVENTORY', value: 'production'],
                    [$class: 'StringParameterValue', name: 'PLAYBOOK', value: 'deploy-client.yml'],
                ]
            }
        }
    }
}
