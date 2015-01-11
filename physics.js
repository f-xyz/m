/// <reference path="typings/node/node.d.ts" />

var Vector = require('./vector');
var Solid = require('./solid');

/**
 * P = V*t + a*t^2/2
 * Recalculates position and velocity
 * by a time delta in seconds and acceleration.
 * @param {Solid} solid
 * @param {number} dt seconds
 */
function step(solid, dt) {
    var dtSquaredHalf = dt * dt / 2;

    solid.position.x += solid.velocity.x * dt + solid.acceleration.x * dtSquaredHalf;
    solid.position.y += solid.velocity.y * dt + solid.acceleration.y * dtSquaredHalf;
    solid.position.z += solid.velocity.z * dt + solid.acceleration.z * dtSquaredHalf;

    solid.velocity.x += solid.acceleration.x * dt;
    solid.velocity.y += solid.acceleration.y * dt;
    solid.velocity.z += solid.acceleration.z * dt;
}

/**
 * A = G*m / r^2
 * @param {Solid} S
 * @param {Solid} D
 */
function accelerationFromGravity(S, D) {

}

module.exports = {
    step: step,
    accelerationFromGravity: accelerationFromGravity
};