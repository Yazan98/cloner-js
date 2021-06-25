import {CONFIG_JSON_FILE, PROJECTS_FILE_NAME} from "./commands.js";
import fs from 'fs';
import {getAxiosInstance, getUrlRequestForUserRepositories, getUrlRequestForUserAuthRepositories, GITHUB_URL} from "./api.js";
import { exec } from 'child_process';

export function startCloneRepositories(workingPath) {
    validateRequiredClones(workingPath);
}

function validateRequiredClones(workingPath) {
    try {
        fs.readFile(`${workingPath}/${CONFIG_JSON_FILE}`, 'utf8', (err, jsonString) => {
            if (err) {
                console.log("[ERROR] Something Error : " + err)
                return
            }
            try {
                const configuration = JSON.parse(jsonString)
                if (configuration.user !== "") {
                    console.log("[DEBUG] : Cloner Start Fetch From User [" + configuration.user + "]")
                }

                if (configuration.github_token === "") {
                    console.log("[DEBUG] : Cloner Start Fetch From User [Github Token Not Exists]")
                }

                if (configuration.repos.length !== 0) {
                    console.log("[DEBUG] : Cloner Start Fetch From Repositories [" + configuration.repos + "]")
                }

                executeProcess(configuration)
            } catch (err) {
                console.log("[ERROR] Something Error : " + err)
            }
        })
    } catch (error) {
        console.log("[ERROR] Something Error : " + error)
    }
}

function executeProcess(configuration) {
    console.log("[DEBUG] Please Wait Until Script Finish All Pending Repositories ...")
    if (configuration.user !== "") {
        if (configuration.github_token !== "") {
            getUserRepositoriesWithToken(configuration.user, configuration.github_token);
        } else {
            getUserRepositories(configuration.user);
        }
    }

    if (configuration.repos.length !== 0) {
        getRepositories(configuration.repos)
    }
}

function getUserRepositoriesWithToken(userName, github_token) {
    getAxiosInstance().get(getUrlRequestForUserAuthRepositories(), {
        auth: {
            username: userName,
            password: github_token
        }
    }).then(function (response) {
            exec("cd " + process.cwd() + "/" + PROJECTS_FILE_NAME)
            for (let i = 0; i < response.data.length; i++) {
                const name = response.data[i].full_name
                console.log("[DEBUG] Start Cloning : " + name)
                exec(`git clone https://${userName}:${github_token}@github.com/${name}.git`)
            }
        })
        .catch(function (error) {
            console.log(error);
        })
}


function getUserRepositories(userName) {
    getAxiosInstance().get(getUrlRequestForUserRepositories(userName))
        .then(function (response) {
            exec("cd " + process.cwd() + "/" + PROJECTS_FILE_NAME)
            for (let i = 0; i < response.data.length; i++) {
                const name = response.data[i].full_name
                console.log("[DEBUG] Start Cloning : " + name)
                exec(`git clone ${GITHUB_URL}/${name}.git`)
            }
        })
        .catch(function (error) {
            console.log(error);
        })
}

function getRepositories(repos) {
    for (let i = 0; i < repos.length; i++) {
        console.log("[DEBUG] Start Cloning : " + repos[i])
        exec(`git clone ${GITHUB_URL}/${repos[i]}.git`)
    }
}
