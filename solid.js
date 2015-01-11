/// <reference path="typings/node/node.d.ts" />

var Vector = require('./vector');

/**
 * @param {{
 *  mass: number?,
 *  position: Vector?,
 *  velocity: Vector?,
 *  acceleration: Vector?
 * }} params
 * @constructor
 */
function Solid(params) {

    if (!(this instanceof Solid)) {
        return new Solid(params);
    }

    params = params || {};

    /**
     * @type {number}
     */
    this.mass = params.mass || 1;
    /**
     * @type {number}
     */
    this.radius = params.radius || 0;
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

Solid.prototype = {
    /**
     * @returns {Solid}
     */
    clone: function() {
        return new Solid({
            mass: this.mass,
            radius: this.radius,
            position: this.position.clone(),
            velocity: this.velocity.clone(),
            acceleration: this.acceleration.clone()
        });
    }
};

module.exports = Solid;