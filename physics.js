/// <reference path="typings/node/node.d.ts" />

var Vector = require('./vector');
var Solid = require('./solid');

/**
 * P = V*t + a*t^2/2
 * Recalculates position and velocity
 * by a time delta in seconds and acceleration.
 * @param {Solid} S
 * @param {number} dt seconds
 */
function step(S, dt) {
    //S.position.add(S.velocity.clone().mul(dt));
    //S.position = S.velocity.clone().mul(dt)
}

/**
 *
 * @param {Solid} S
 * @param {Solid} D
 */
function accelerationFromGravity(S, D) {

}

module.exports = {};