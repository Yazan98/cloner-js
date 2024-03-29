#!/usr/bin/env node

import {
    checkConfigFileExists,
    GENERATE_CONFIG_FILE_COMMAND,
    CLONER_CONFIG_FILE_CHECK_COMMAND,
    CLONE_REPOS_COMMAND,
    generateJsonConfigurationFile,
    getHelpCommands,
    HELP_COMMAND, startCloningRepositories
} from "./src/commands.js";

export function init() {
    const args = getProcessArgument();
    printHeaderInterface(args)
}

function printHeaderInterface(args) {
    console.log("Cloner CLI Started ...")
    console.log("Welcome To Cloner.js To Clone Your Github Repositories")
    console.log("Project Powered By [Github Api] V3")
    console.log("Created By Yazan98 : https://github.com/Yazan98/cloner-js")
    console.log("Version : 1.0.0")

    if (validateArguments(args)) {
        executeArguments(args)
    } else {
        console.log("Cloner Execution Failed ...")
    }
}

function executeArguments(args) {
    for (let i = 0; i < args.length; i++) {
        if (args[i] === HELP_COMMAND) {
            getHelpCommands();
            break;
        } else if (args[i] === GENERATE_CONFIG_FILE_COMMAND) {
            generateJsonConfigurationFile(getCurrentWorkingPath())
            break;
        } else if (args[i] === CLONER_CONFIG_FILE_CHECK_COMMAND) {
            checkConfigFile();
            break;
        } else if (args[i] === CLONE_REPOS_COMMAND) {
            startCloningRepositories(getCurrentWorkingPath());
            break;
        }
    }
}

function checkConfigFile() {
    if (checkConfigFileExists(getCurrentWorkingPath())) {
        console.log("[DEBUG] Cloner Configuration File Exists ... You Can Run Cloner To Clone Projects")
    } else {
        console.log("[DEBUG] Cloner Configuration File Not Exists ... You Can Run Cloner To Generate Config File")
    }
}

function validateArguments(args) {
    if (args.length === 2) {
        console.log("Cloner Failed To Select Task, Specify Argument or Add -h To See the Available Commands ...")
        return false
    }

    return true
}

function getProcessArgument() {
    return process.argv
}

function getCurrentWorkingPath() {
    return process.cwd()
}

// Start The CLI Arguments Validation
init();
