def SKIP_ALL_STAGES
pipeline {
    agent any

    stages {
        stage('AUTHENTIFICATION CHECK') {
            when { expression { SKIP_ALL_STAGES != true } }
            steps {
                script {
                    echo '[!!!] Check Auth Commit [!!!]'
                    def commitMessage

                    for ( changeLogSet in currentBuild.changeSets){
                        for (entry in changeLogSet.getItems()){
                            commitMessage = entry.msg
                        }
                    }

                    echo env.BRANCH_NAME
                    if (commitMessage == "" || commitMessage == null) {
                        timeout(time: 5, unit: 'MINUTES') {
                            input message:'Lancement manuel détecté. Lancer un déploiement complet ?'
                        }
                    } else if (!commitMessage.startsWith('/bundle') && env.BRANCH_NAME != "main" && env.BRANCH_NAME != "rqt" && env.BRANCH_NAME != "dev") {
                        SKIP_ALL_STAGES = true
                    }
                }
            }
        }

        stage('GIT PULL & SYNC') {
            when { expression { SKIP_ALL_STAGES != true } }
            steps {
                withCredentials([gitUsernamePassword(credentialsId: 'GitHub_MaCaRoN', gitToolName: 'Default')]) {
                    sh "git pull"

                    sh "git clone https://github.com/MaCaRoN-Corporation/NeoSys_App-Releases.git"
                    sh "mv -n NeoSys_App-Releases/* Application/"
                    sh "mv -n NeoSys_App-Releases/android/app/* Application/android/app"
                    sh "rm -rf NeoSys_App-Releases/"

                    sh "git clone https://github.com/MaCaRoN-Corporation/Gradle-Dependencies.git"
                    sh "mv -n Gradle-Dependencies/Application/* Application/"
                    sh "mv -n Gradle-Dependencies/Application/android/* Application/android"
                    sh "rm -rf Gradle-Dependencies/"
                }
            }
        }
      
        // stage('TEST') {
        //     when { expression { SKIP_ALL_STAGES != true } }
        //     steps {
        //         // sh '''cd Application/
        //         // ionic cordova platform remove android
        //         // ionic cordova platform add android@latest
        //         // ionic cordova plugin rm cordova-plugin-ionic-webview
        //         // cordova plugin add cordova-plugin-ionic-webview
        //         // npm install @ionic-native/ionic-webview'''

        //         // sh '''cd Application/
        //         // ionic build
        //         // ionic capacitor build android
        //         // '''
        //     }
        // }
      
        stage('SIGN BUNDLE CREATION') {
            when { expression { SKIP_ALL_STAGES != true } }
            steps {
                echo '[!!!] Moving old version into folder & Creation of new Sign Bundle AAB ... [!!!]'
                script {
                    def rtGradle = Artifactory.newGradleBuild()
                    rtGradle.tool = "Gradle"
                    rtGradle.run rootDir: "Application/android/app/", tasks: 'bundleRelease' //prepareBundle
                }
            }
        }

        stage('GIT PUSH') {
            when { expression { SKIP_ALL_STAGES != true } }
            steps {
                echo '[!!!] Commiting and pushing... [!!!]'
                withCredentials([gitUsernamePassword(credentialsId: 'GitHub_MaCaRoN', gitToolName: 'Default')]) {
                    sh "git clone https://github.com/MaCaRoN-Corporation/NeoSys_App-Releases.git"
                    sh "rm -rf NeoSys_App-Releases/Releases/"
                    sh "rm -rf NeoSys_App-Releases/android/"

                    sh "cp -r Application/Releases/ NeoSys_App-Releases/"
                    sh "mkdir NeoSys_App-Releases/android/"
                    sh "mkdir NeoSys_App-Releases/android/app/"
                    sh "cp Application/android/app/version.properties.txt NeoSys_App-Releases/android/app/"

                    sh '''cd NeoSys_App-Releases
                    git add Releases/*
                    git add android/app/version.properties.txt
                    git commit -m \"auto-publish commit\"
                    git push
                    '''

                    sh "rm -rf NeoSys_App-Releases/"
                }
            }
        }

        stage('PLAY STORE UPLOAD') {
            when { expression { SKIP_ALL_STAGES != true } }
            steps {
                script {
                    echo '[!!!] Choose Releases/[beta_version - release_version] .aab version [!!!]'
                    def versionProps = readProperties file: "Application/android/app/version.properties.txt"
                    def VERSION_TYPE = versionProps['VERSION_TYPE'].toString()

                    if (VERSION_TYPE == "internal") {
                        echo '[!!!!!!!!!!!!!!!!] INTERNAL VERSION [!!!!!!!!!!!!!!!!!]'
                        echo '[!!!] Publishing Android Bundle in Play Store ... [!!!]'
                        echo '[!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!]'
                        androidApkUpload googleCredentialsId: 'Google_Play_Store-NeoSys_App', apkFilesPattern: 'Application/Releases/internal_versions/*-release.aab', rolloutPercentage: '100', trackName: 'internal' // internal/alpha/beta/production
                    } else if (VERSION_TYPE == "alpha") {
                        echo '[!!!!!!!!!!!!!!!!!!] ALPHA VERSION [!!!!!!!!!!!!!!!!!!]'
                        echo '[!!!] Publishing Android Bundle in Play Store ... [!!!]'
                        echo '[!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!]'
                        androidApkUpload googleCredentialsId: 'Google_Play_Store-NeoSys_App', apkFilesPattern: 'Application/Releases/alpha_versions/*-release.aab', rolloutPercentage: '100', trackName: 'alpha' // internal/alpha/beta/production
                    } else if (VERSION_TYPE == "beta") {
                        echo '[!!!!!!!!!!!!!!!!!!] BETA VERSION [!!!!!!!!!!!!!!!!!!!]'
                        echo '[!!!] Publishing Android Bundle in Play Store ... [!!!]'
                        echo '[!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!]'
                        // timeout(time: 5, unit: 'MINUTES') { input message:'Voulez-vous vraiment livrer en TEST OUVERT ?' }
                        // androidApkUpload googleCredentialsId: 'Google_Play_Store-NeoSys_App', apkFilesPattern: 'Application/Releases/beta_versions/*-release.aab', rolloutPercentage: '100', trackName: 'beta' // internal/alpha/beta/production
                    } else if (VERSION_TYPE == "production") {
                        echo '[!!!!!!!!!!!!!!!] PRODUCTION VERSION [!!!!!!!!!!!!!!!!]'
                        echo '[!!!] Publishing Android Bundle in Play Store ... [!!!]'
                        echo '[!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!]'
                        // timeout(time: 5, unit: 'MINUTES') { input message:'Voulez-vous vraiment livrer en PRODUCTION ?' }
                        // androidApkUpload googleCredentialsId: 'Google_Play_Store-NeoSys_App', apkFilesPattern: 'Application/Releases/production_versions/*-release.aab', rolloutPercentage: '100', trackName: 'production' // internal/alpha/beta/production
                    } else {
                        echo 'Publishing failed, try again looser !'
                    }
                }
            }
        }
    }
}
