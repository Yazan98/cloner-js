import axios from 'axios';

export const GITHUB_API_KEY = "https://api.github.com/";
export const TIME_OUT_API_REQUEST = 8000;

export const GITHUB_USERS_KEY = "users";
export const GITHUB_REPOS_KEY = "repos";
export const GITHUB_URL = "https://github.com"

export function getAxiosInstance() {
    return axios.create({
        baseURL: GITHUB_API_KEY,
        timeout: TIME_OUT_API_REQUEST
    });
}

export function getUrlRequestForUserRepositories(userName) {
    return `${GITHUB_USERS_KEY}/${userName}/${GITHUB_REPOS_KEY}`
}

export function getRepoRequestUrl(repo) {
    return `${GITHUB_REPOS_KEY}/${repo}`
}