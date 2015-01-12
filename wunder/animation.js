define([
    "underscore",
    "ge/math",
    "ge/event_emitter",
    "ge/requestAnimationFrame"
], function(_, GEMath, EventEmitter) {
    "use strict";

    /**
     * Time and/or frame based animation.
     * @class Animation
     * @param {Object} config
     * @param {Boolean}     [config.start] Auto start. Default: false.
     * @param {Number}      [config.duration] Duration in milliseconds or Infinity. Default: Infinity.
     * @param {Number}      [config.frames] Duration in frames or Infinity. Default: Infinity.
     * @param {Number}      [config.timeout] Time between frames. Default: null - uses requestAnimationFrame (~60 FPS).
     * @param {Function}    [config.onFrame] Frame callback. Default: null.
     * @param {Function}    [config.onStart] Start callback. Default: null.
     * @param {Function}    [config.onComplete] Complete callback function. Default: null.
     * @param {*}           [config.data] Custom data. Default: null.
     * @constructor
     */
    function Animation(config) {
        EventEmitter.call(this);

        config = _.extend({
            duration:       Infinity,
            frames:         Infinity,
            timeout:        null,
            onFrame:        null,
            onStart:        null,
            onComplete:     null,
            data:           null
        }, config || {});

        /**
         * Duration in milliseconds or Infinity.
         * @type {Number}
         */
        this.duration = config.duration;

        /**
         * Time between frames or null - uses requestAnimationFrame (~60 FPS).
         * @type {Number}
         */
        this.timeout = config.timeout;

        /**
         * Duration in frames or Infinity.
         * @type {Number}
         */
        this.frames = config.frames;

        /**
         * Frame callback.
         * @type {Function}
         */
        this.onFrame = config.onFrame;

        /**
         * Start callback.
         * @type {Function}
         */
        this.onStart = config.onStart;

        /**
         * Complete callback.
         * @type {Function}
         */
        this.onComplete = config.onComplete;

        /**
         * Custom data.
         * @type {Object}
         */
        this.data = config.data;

        /**
         * Start timestamp.
         * @type {Number}
         */
        this.timeStart = null;

        /**
         * Pause timestamp.
         * @type {Number}
         */
        this.timePause = null;

        /**
         * Time elapsed from start time.
         * @type {Number}
         */
        this.time = 0;

        /**
         * Current frame. -1 if not started.
         * @type {Number}
         */
        this.frame = -1;

        /**
         * Is running?
         * @type {Boolean}
         * @private
         */
        this._running = false;

        /**
         * Is complete?
         * @type {Boolean}
         * @private
         */
        this._complete = false;

        /**
         * setTimeout handle.
         * @type {Number}
         * @private
         */
        this._timeoutHandle = null;

        /**
         * requestAnimationFrame handle.
         * @type {Number}
         * @private
         */
        this._animationFrameHandle = null;

        // events
        if (this.onStart) {
            this.bind("start", this.onStart);
        }
        if (this.onFrame) {
            this.bind("frame", this.onFrame);
        }
        if (this.onComplete) {
            this.bind("complete", this.onComplete);
        }

        // start?
        if (config.start) {
            this.start();
        }
    }

    Animation.prototype = Object.create(EventEmitter.prototype);
    Animation.prototype.constructor = Animation;

    /**
     * Cancel frame timeout.
     * @private
     */
    Animation.prototype._clearTimeout = function() {
        if (this._timeoutHandle) {
            clearTimeout(this._timeoutHandle);
            this._timeoutHandle = null;
        }

        if (this._animationFrameHandle) {
            window.cancelAnimationFrame(this._animationFrameHandle);
            this._animationFrameHandle = null;
        }
    };

    /**
     * Next frame. Calls onFrame.
     * @returns {Animation} this
     */
    Animation.prototype.next = function() {
        this._clearTimeout();

        if (this._running) {

            var time = Date.now() - this.timeStart;
            if (time <= this.duration && this.frame < this.frames - 1) {

                this.time = time;
                this.frame++;

                this.trigger("frame");

                var that = this;
                var next = function() {
                    that.next();
                };

                if (this.timeout) {
                    this._timeoutHandle =
                        setTimeout(next, this.timeout);
                } else {
                    this._animationFrameHandle =
                        window.requestAnimationFrame(next);
                }

            } else {

                // last frame for time-base animation
                if (isFinite(this.duration)) {

                    this.time = this.duration;
                    this.frame++;

                    this.trigger("frame");
                }

                this.stop();
            }
        }

        return this;
    };

    /**
     * Fresh start. Calls onStart.
     * @returns {Animation} this
     */
    Animation.prototype.start = function() {
        this._running  = true;
        this._complete = false;

        this.timeStart = Date.now();
        this.timePause = null;
        this.time      = 0;
        this.frame     = -1;

        this.trigger("start");

        this.next();

        return this;
    };

    /**
     * Full stop. Calls onComplete.
     * @returns {Animation} this
     */
    Animation.prototype.stop = function() {
        this._running  = false;
        this._complete = true;

        this.timePause = null;

        this.trigger("complete");

        return this;
    };

    /**
     * Pause.
     * @returns {Animation} this
     */
    Animation.prototype.pause = function() {
        if (this.isRunning()) {
            this._running  = false;

            this.timePause = Date.now();
        }

        return this;
    };

    /**
     * Resume.
     * @returns {Animation} this
     */
    Animation.prototype.resume = function() {
        if (this.isPaused()) {

            this._running  = true;

            this.timeStart = this.timeStart + (Date.now() - this.timePause);
            this.timePause = null;

            this.next();
        }

        return this;
    };

    /**
     * Seek by frame.
     * @param {Number} frame
     * @returns {Animation} this
     */
    Animation.prototype.seek = function(frame) {
        this.frame = frame;

        return this;
    };

    /**
     * Seek by time.
     * @param {Number} time
     * @returns {Animation} this
     */
    Animation.prototype.seekTime = function(time) {
        this.time = time;

        return this;
    };

    /**
     * Animation progress. Always returns 0 for infinite animations.
     * @returns {Number} in range 0..1
     */
    Animation.prototype.getProgress = function() {
        var progress = 0;

        if (isFinite(this.duration)) {

            progress = this.time / this.duration;

        } else if (isFinite(this.frames)) {

            progress = this.frame / (this.frames - 1);
        }

        return GEMath.limit(progress, 0, 1);
    };

    /**
     * Is running?
     * @returns {Boolean}
     */
    Animation.prototype.isRunning = function() {
        return this._running;
    };

    /**
     * Is complete?
     * @returns {Boolean}
     */
    Animation.prototype.isComplete = function() {
        return this._complete;
    };

    /**
     * Is paused?
     * @returns {boolean}
     */
    Animation.prototype.isPaused = function() {
        return !!this.timePause;
    };

    return Animation;
});
