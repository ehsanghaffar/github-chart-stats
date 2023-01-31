import axios from "axios";
// import toEmoji from "emoji-name-map";
// import wrap from "word-wrap";




/**
 * Send GraphQL request to GitHub API.
 *
 * @param {import('axios').AxiosRequestConfig['data']} data Request data.
 * @param {import('axios').AxiosRequestConfig['headers']} headers Request headers.
 * @returns {Promise<any>} Request response.
 */
const request = (data, headers) => {
  // @ts-ignore
  return axios({
    url: "https://api.github.com/graphql",
    method: "post",
    headers,
    data,
  });
};



/**
 * Custom error class to handle custom GRS errors.
 */
class CustomError extends Error {
  /**
   * @param {string} message Error message.
   * @param {string} type Error type.
   */
  constructor(message, type) {
    super(message);
    this.type = type;
    this.secondaryMessage = SECONDARY_ERROR_MESSAGES[type] || type;
  }

  static MAX_RETRY = "MAX_RETRY";
  static USER_NOT_FOUND = "USER_NOT_FOUND";
  static GRAPHQL_ERROR = "GRAPHQL_ERROR";
}


/**
 * Missing query parameter class.
 */
class MissingParamError extends Error {
  /**
   * @param {string[]} missedParams
   * @param {string?=} secondaryMessage
   */
  constructor(missedParams, secondaryMessage) {
    const msg = `Missing params ${missedParams
      .map((p) => `"${p}"`)
      .join(", ")} make sure you pass the parameters in URL`;
    super(msg);
    this.missedParams = missedParams;
    this.secondaryMessage = secondaryMessage;
  }
}


const noop = () => {};
// return console instance based on the environment
const logger =
  process.env.NODE_ENV !== "test" ? console : { log: noop, error: noop };

const CONSTANTS = {
  THIRTY_MINUTES: 1800,
  TWO_HOURS: 7200,
  FOUR_HOURS: 14400,
  ONE_DAY: 86400,
};


export {
  request,
  CustomError,
  MissingParamError,
  logger
}