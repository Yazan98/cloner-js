import fs from 'fs';
import {startCloneRepositories} from "./executer.js";

/**
 * Export Available Commands For This CLI
 * This Variables Should Be Only For Arguments Validation
 * @type {string}
 */
export const HELP_COMMAND = "-h";
export const GENERATE_CONFIG_FILE_COMMAND = "-g";
export const CLONER_CONFIG_FILE_CHECK_COMMAND = "-k";
export const CLONE_REPOS_COMMAND = "-c";

/**
 * Json Configuration File Props
 */
export const CONFIG_JSON_FILE = "cloner.json";
export const PROJECTS_FILE_NAME = "Projects";

export function getHelpCommands() {
    console.log("Command [-g] To Generate Json File For Your Cloned Repositories To Start Cloning")
    console.log("Command [-c] To Clone All Repos Inside Configuration Json File")
    console.log("Command [-k] To Check If The Cloner File Exists Or Not")
}

export function checkConfigFileExists(workingPath) {
    try {
        return fs.existsSync(`${workingPath}/${CONFIG_JSON_FILE}`);
    } catch (error) {
        console.log("[ERROR] Something Error : " + error)
        return false;
    }
}

export function generateJsonConfigurationFile(workingPath) {
    console.log("[DEBUG] Start Generating Json Configuration File ...")
    try {
        const generatedFileContent = {
            "github_token": "",
            "user": "",
            "repos": []
        };

        const jsonConfig = JSON.stringify(generatedFileContent, null, "\t")
        fs.writeFile(`${workingPath}/${CONFIG_JSON_FILE}`, jsonConfig,  function(err, result) {
            if(err) console.log('[ERROR] Something Error :', err);
        });
        console.log(`[DEBUG] Configuration File Generated Inside : ${workingPath}/${CONFIG_JSON_FILE}`)
    } catch (exception) {
        console.log("[ERROR] Something Error : " + exception)
    }
}

export function startCloningRepositories(workingPath) {
    if (!fs.existsSync(`${workingPath}/${PROJECTS_FILE_NAME}`)){
        fs.mkdirSync(`${workingPath}/${PROJECTS_FILE_NAME}`);
    }

    if (checkConfigFileExists(workingPath)) {
        startCloneRepositories(workingPath);
    } else {
        console.log("[DEBUG] Cloner Configuration Json File Not Found .. Please Generate Config File Before Start Cloner")
    }

}
