/// <reference path="typings/node/node.d.ts" />

var Vector = require('./vector');

/**
 * @param params
 * @constructor
 */
function Solid(params) {
    params = params || {};
    /**
     * @type {number}
     */
    this.mass = params.mass || 1;
    /**
     * @type {Vector}
     */
    this.position = params.position || new Vector(0, 0, 0);
    /**
     * @type {Vector}
     */
    this.velocity = params.velocity || new Vector(0, 0, 0);
    /**
     * @type {Vector}
     */
    this.acceleration = params.acceleration || new Vector(0, 0, 0);
}

module.exports = Solid;