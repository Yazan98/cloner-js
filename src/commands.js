import fs from 'fs';

/**
 * Export Available Commands For This CLI
 * This Variables Should Be Only For Arguments Validation
 * @type {string}
 */
export const HELP_COMMAND = "-h";
export const GENERATE_CONFIG_FILE_COMMAND = "-g";

/**
 * Json Configuration File Props
 */
export const CONFIG_JSON_FILE = "cloner.json";
export const GITHUB_TOKEN_KEY = "github_token";
export const GITHUB_REPOS_LIST_KEY = "repos";
export const GITHUB_USERS_LIST_KEY = "users";
export const GITHUB_ORGS_LIST_KEY = "orgs";

export function getHelpCommands() {
    console.log("Command [-g] To Generate Json File For Your Cloned Repositories To Start Cloning")
    console.log("Command [-c] To Clone All Repos Inside Configuration Json File")
}

export function generateJsonConfigurationFile(workingPath) {
    console.log("[DEBUG] Start Generating Json Configuration File ...")
    try {
        const generatedFileContent = {
            "github_token": "",
            "repos": [],
            "users": [],
            "orgs": []
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