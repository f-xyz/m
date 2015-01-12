/// <reference path="typings/node/node.d.ts" />

var Vector = require('./vector');
var Solid = require('./solid');
var sqrt = Math.sqrt;

/**
 * P = V*t + a*t^2/2
 * V = A*t
 * Recalculates position and velocity
 * by a time delta in seconds and acceleration.
 * @param {Solid} s
 * @param {number} dt seconds
 */
function step(s, dt) {
    var dtSqrHalf = dt * dt / 2;
    var newPosition = new Vector(
        s.position.x + s.velocity.x*dt + s.acceleration.x*dtSqrHalf,
        s.position.y + s.velocity.y*dt + s.acceleration.y*dtSqrHalf,
        s.position.z + s.velocity.z*dt + s.acceleration.z*dtSqrHalf
    );
    var newVelocity = new Vector(
        s.velocity.x + s.acceleration.x*dt,
        s.velocity.y + s.acceleration.y*dt,
        s.velocity.z + s.acceleration.z*dt
    );
    return new Solid({
        mass: s.mass,
        position: newPosition,
        velocity: newVelocity,
        acceleration: s.acceleration
    });
}
/**
 * A = G*m / r^2
 * @param {Solid} s
 * @param {Solid} d
 * @param G
 */
function gravity(s, d, G) {
    var r = s.position.distanceTo(d.position);
    var A = G * d.mass / (r*r);
    var dir = d.position.sub(s.position);
    var newAcceleration = dir.div(A, A, A);

    return new Solid({
        mass: s.mass,
        position: s.position,
        velocity: s.velocity,
        acceleration: s.acceleration.addVector(newAcceleration)
    });
}

/**
 * A = G*m / r^2
 * @param {Solid} s
 * @param {Solid} d
 * @param G
 */
function gravityCowel(s, d, G) {
    return new Solid({
        mass: s.mass,
        position: s.position,
        velocity: s.velocity,
        acceleration: s.acceleration
    });
}


module.exports = { step: step, gravity: gravity };