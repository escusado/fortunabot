'use strict'

require('neon');

/** TYPE DEFINITIONS **/

/**
 * This is the main callback type, and returns an array of
 * match objects.
 * @callback matchCallback
 * @param {?Error} error An error object, may be null if no error occurred.
 * @param {?String[]} matches The resulting matches.
 */

/**
 * The format of a user object for matching.
 * @typedef {object} userObject
 * @property {number} name Username.
 */


/**
 * Matcher is a class that given a pool of people will match them
 * in pairs with a topic at random, given enough members in the
 * user pool.
 *
 * ## Usage:
 *
 *     var Matcher = require('lib/matcher');
 *
 * ### Instantiating
 *
 *     var matcher = new Matcher({
 *       users : [{name: '@pigeonfolk'} ...],
 *       topics : ["What is your favorite pizza topping"...],
 *       minimumSize : 8
 *     });
 *
 * ### Matching
 *
 *     matcher.match(function (err, matchObject) {
 *       if (err) {
 *         console.log('darn!', err);
 *       }
 *
 *       // The users object now only contains the unpaired, if anyone was
 *       // left behind, or if no matches were made.
 *       console.log(matchObject, matcher.users);
 *     });
 *
 * @class Matcher
 */
var Matcher = Class({}, 'Matcher')({
  INVALID_USERS : "The users property is not an array. Please use an array.",
  INVALID_USER : "One or more users in the array is invalid. Please, use objects that have a name property as a string",
  INVALID_TOPICS : "The topics property is not an array. Please use an array.",
  INVALID_TOPIC : "One or more topics in the array is invalid. Please use strings.",

  prototype : {

    /**
     * Array of user objects
     * @memberof Matcher
     * @instance
     * @default []
     * @type {userObject[]}
     */
    users : null,

    /**
     * Array of topic strings
     * @memberof Matcher
     * @instance
     * @default []
     * @type {String[]}
     */
    topics : null,

    /**
     * Minimum number of users before attempting to match
     * @memberof Matcher
     * @instance
     * @default 10
     * @type {Number}
     */
    minimumSize : 10,

    /**
     * Matcher Constructor
     * @constructs
     * @param {object} [config] - The configuration to extend the instance
     */
    init : function init(config) {
      Object.keys(config).forEach(function (property) {
        this[property] = config[property];
      }, this);
    },

    /**
     * Clusters the points and returns an array of `Archipelago.Cluster` objects
     *
     * @function match
     * @memberof Matcher
     * @instance
     * @argument {matchCallback} [callback] function to be called for when
     *                                      matching is complete.
     */
    match : function match(callback) {
      this._validateData(function validateHandler(error) {
        if (error) {
          return callback && callback(error, null);
        }

        return callback && callback(null, []);
      });
    },

    /*
     * Checks the consistency of this.users and this.topics.
     * calls back with errors if any, calls back with null otherwise;
     */
    _validateData : function (callback) {
      var error, hasInvalidUsers, hasInvalidTopics;

      if (!(this.users instanceof Array)) {
        error = new Error(this.constructor.INVALID_USERS);
        return callback(error);
      }

      if (!(this.topics instanceof Array)) {
        error = new Error(this.constructor.INVALID_TOPICS);
        return callback(error);
      }

      hasInvalidUsers = this.users.some(this._validateUser)
      hasInvalidTopics = this.topics.some(this._validateTopic)

      if (hasInvalidUsers) {
        error = new Error(this.constructor.INVALID_USER);
        return callback(error);
      }

      if (hasInvalidTopics) {
        error = new Error(this.constructor.INVALID_TOPIC);
        return callback(error);
      }

      callback(null);
    },

    /*
     * Validates the structure of a user object.
     */
    _validateUser : function _validateUser(user) {
      return !(typeof user === 'object' && typeof user.name === 'string');
    },

    /*
     * Validates the structure of a topic object.
     */
    _validateTopic : function _validateTopic(topic) {
      return !(typeof topic === 'string');
    },
  }
});

module.exports = Matcher;
