import axios from "axios";


/**
 * Send request to GitHub API.
 *
 * @param endpoint first api query param.
 * @param username username of Github user.
 * @param username data you want.
 * @returns {Promise<any>} Request response.
 */
const request = (endpoint,username, query ) => {

  if (!query) {
    return axios({
      url: `https://api.github.com/${endpoint}/${username}`,
      method: "get"
    })
  }

  // @ts-ignore
  return axios({
    url: `https://api.github.com/${endpoint}/${username}/${query}`,
    method: "get"
  });
};

export {
  request
}