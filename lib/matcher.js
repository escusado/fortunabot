'use strict'

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
      return callback && callback(null, []);
    }
  }
});

module.exports = Matcher;
