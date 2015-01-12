define([
    "underscore",
    "ge/rgba",
    "ge/point",
    "ge/sprite"
], function(_, RGBA, Point) {
    "use strict";

    /**
     * Gradient. Linear or radial.
     * @class Gradient
     * @param {Object} [config]
     * @param {Point} [config.from] From point. Default: [0; 0].
     * @param {Point} [config.to] To point. Default: equals from.
     * @param {Number|Point} [config.radius] From/to radius.
     * @param {Object} [config.gradient] Color stops. Default: {}.
     * @constructor
     */
    function Gradient(config) {
        config = config || {};

        /**
         * Start point.
         * @type {Point}
         */
        this.from = config.from || new Point(0, 0);

        /**
         * End point.
         * @type {Point}
         */
        this.to = config.to || this.from;

        /**
         * Radius or new Point(startRadius, endRadius).
         * @type {Number|Point}
         */
        this.radius = config.radius || null;

        /**
         * Color stops.
         * @type {Object}
         */
        this.gradient = config.gradient || {};
    }

    /**
     * Adds a color stop.
     * @param {Number} i
     * @param {String|RGBA} color
     * @returns {*}
     */
    Gradient.prototype.add = function(i, color) {
        this.gradient[i] = color;

        return this;
    };

    /**
     * Compiles the gradient.
     * @param {CanvasRenderingContext2D} ctx
     * @returns {CanvasGradient}
     */
    Gradient.prototype.compile = function(ctx) {
        var compiled;

        if (this.radius) {

            var radius = this.radius instanceof Point ?
                this.radius
              : new Point(0, this.radius);

            compiled = ctx.createRadialGradient(
                this.from.x,
                this.from.y,
                radius.x,
                this.to.x,
                this.to.y,
                radius.y
            );

        } else {

            compiled = ctx.createLinearGradient(
                this.from.x,
                this.from.y,
                this.to.x,
                this.to.y
            );

        }

        for (var i in this.gradient) {
            if (this.gradient.hasOwnProperty(i)) {
                var color = this.gradient[i];
                if (color instanceof RGBA) {
                    color = color.toString();
                }
                compiled.addColorStop(i, color);
            }
        }

        return compiled;
    };

    return Gradient;
});