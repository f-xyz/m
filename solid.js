/// <reference path="typings/node/node.d.ts" />

var Class = require('better-inherits').Class;
var Vector = require('./vector');

var Solid = new Class({
    prototype: Vector,

    /** @type {Vector} */
    position: new Vector(),

    /** @type {Vector} */
    velocity: new Vector(),

    /** @type {Vector} */
    acceleration: new Vector(),

    get x() { return this.position.x },
    get y() { return this.position.y },
    get z() { return this.position.z },

    set x(v) { this.position.x = v },
    set y(v) { this.position.y = v },
    set z(v) { this.position.z = v },

    constructor: function(params) {
        if (!(this instanceof Solid)) {
            return new Solid(params);
        }

        params = params || {};

        this.mass = params.mass || 1;
        this.radius = params.radius || 0;
        this.position = params.position || new Vector(0, 0, 0);
        this.velocity = params.velocity || new Vector(0, 0, 0);
        this.acceleration = params.acceleration || new Vector(0, 0, 0);
    },

    clone: function() {
        return new Solid({
            mass: this.mass,
            radius: this.radius,
            position: this.position.clone(),
            velocity: this.velocity.clone(),
            acceleration: this.acceleration.clone()
        });
    }
});

module.exports = Solid;