/* global define */
define([], function() {
    "use strict";

    /**
     * Common math functions.
     */
    var GEMath = {

        /**
         * x * x
         * @param {Number} x
         * @returns {Number}
         */
        sqr: function(x) {
            return x * x;
        },

        /**
         * Random number from {min} to {max}.
         * @param {Number} min
         * @param {Number} max
         * @returns {Number}
         */
        random: function(min, max) {
            return min + Math.random() * (max - min);
        },

        /**
         * Math.min / Math.max composition.
         * @param {Number} x
         * @param {Number} min
         * @param {Number} max
         * @returns {Number}
         */
        limit: function(x, min, max) {
            return Math.min(Math.max(x, min), max);
        },

        /**
         * Distance between points or vector length.
         * @param {Number} fromX
         * @param {Number} fromY
         * @param {Number} [toX] Default: 0.
         * @param {Number} [toY] Default: 0.
         * @returns {Number}
         */
        distance: function(fromX, fromY, toX, toY) {
            toX = toX || 0;
            toY = toY || 0;
            return Math.sqrt(
                this.sqr(fromX - toX) + this.sqr(fromY - toY)
            );
        },

        /**
         * Angle between points or vector angle.
         * @param {Number} fromX
         * @param {Number} fromY
         * @param {Number} [toX] Default: 0.
         * @param {Number} [toY] Default: 0.
         * @returns {Number}
         */
        angle: function(fromX, fromY, toX, toY) {
            toX = toX || 0;
            toY = toY || 0;
            return Math.atan2(toY - fromY, toX - fromX);
        },

        /**
         * Math.log with base.
         * @param {Number} x
         * @param {Number} base
         * @returns {Number}
         */
        log: function(x, base) {
            return Math.log(x) / Math.log(base);
        },

        /**
         * Degree to radians.
         * @param {Number} x
         * @returns {Number}
         */
        degToRad: function(x) {
            return x / 180 * Math.PI;
        },

        /**
         * Radians to degree.
         * @param {Number} x
         * @returns {Number}
         */
        radToDeg: function(x) {
            return x / Math.PI * 180;
        },

        /**
         * Normalizes angle to fit in 0..2*PI
         * @param {Number} angle
         * @returns {Number}
         */
        normalizeAngle: function(angle) {
            angle = angle % (2 * Math.PI);
            if (angle < 0) {
                angle += 2 * Math.PI;
            }
            return angle;
        },

        /**
         * Is angle between two angles?
         * @param {Number} angle
         * @param {Number} startAngle
         * @param {Number} endAngle
         * @returns {Boolean}
         */
        isAngleInSector: function(angle, startAngle, endAngle) {
            angle      = this.normalizeAngle(angle);
            startAngle = this.normalizeAngle(startAngle);
            endAngle   = this.normalizeAngle(endAngle);

            if (startAngle < endAngle) {
                return startAngle <= angle && angle <= endAngle;
            } else {
                return startAngle <= angle || angle <= endAngle;
            }
        },

        /**
         * Difference between two angles.
         * @param {Number} firstAngle
         * @param {Number} secondAngle
         * @returns {Number}
         */
        angleDiff: function(firstAngle, secondAngle) {
            var diff = firstAngle - secondAngle;
            if (diff > Math.PI) {
                diff += -2 * Math.PI;
            } else if (diff < -Math.PI) {
                diff +=  2 * Math.PI;
            }
            return diff;
        },

        /**
         * Micro templating.
         * @param {String} template
         * @param {Object|Array} data
         * @returns {String}
         */
        template: function(template, data) {
            return template.replace(/{([^{}]*)}/g, function(a, b) {
                var r = data[b];
                return typeof r === 'string' || typeof r === 'number' ? r : a;
            });
        },

        /**
         * Easeing functions.
         */
        easein: {

            /**
             * Limits an easein function.
             * @param {Function} fn
             * @param {Number} from
             * @param {Number} to
             * @returns {Function}
             */
            limit: function(fn, from, to) {
                return function(t) {
                    return from + (to - from) * fn(t);
                };
            },

            /**
             * Sine transition.
             * @param {Number} t 0..1
             * @param {Number} [freq] Default: 1.
             * @returns {Number}
             */
            sine: function(t, freq) {
                freq = freq || 1;
                return Math.sin(t * Math.PI / 2 * freq);
            },

            /**
             * Elastic.
             * @param {Number} t 0..1
             * @returns {Number}
             */
            elastic: function(t) {
                var t2 = t  * t;
                var t3 = t2 * t;
                return -8.1525*t3*t2 + 
                        28.5075*t2*t2 + 
                       -35.105*t3 + 
                        16.0*t2 + 
                       -0.25*t;
            },

            /**
             * Another bounce.
             * @param {Number} t 0..1
             * @param {Number} [freq] Default: 0.3;
             * @returns {Number}
             */
            bounce: function(t, freq) {
                if (t === 0) { return 0; }
                if (t === 1) { return 1; }

                freq = freq || 0.3;

                return Math.pow(2, -10 * t) *
                       Math.sin((t - freq / 4) * Math.PI * 2 / freq) + 1;
            },

            /**
             * Another bounce.
             * @param {Number} t 0..1
             * @returns {Number}
             */
            jumps: function(t) {
                if (t < 1 / 2.75) {
                    return 7.5625 * t * t;
                } else if (t < 2 / 2.75) {
                    t -= 1.5 / 2.75;
                    return 7.5625 * t * t + 0.75;
                } else if (t < 2.5 / 2.75) {
                    t -= 2.25 / 2.75;
                    return 7.5625 * t * t + 0.9375;
                } else {
                    t -= 2.625 / 2.75;
                    return 7.5625 * t * t + 0.984375;
                }
            }
        }
    };

    return GEMath;
});
