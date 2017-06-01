(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["pointerify"] = factory();
	else
		root["pointerify"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Facade = __webpack_require__(1);
	
	var _Facade2 = _interopRequireDefault(_Facade);
	
	var _Constants = __webpack_require__(3);
	
	var _Constants2 = _interopRequireDefault(_Constants);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function pointerify(root) {
	    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    return new _Facade2.default(root, config);
	}
	
	pointerify.Constants = _Constants2.default;
	
	// deprecated
	
	pointerify.constants = _Constants2.default;
	
	module.exports = pointerify;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Pointerify2 = __webpack_require__(2);
	
	var _Pointerify3 = _interopRequireDefault(_Pointerify2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Facade = function Pointerify() {
	    _classCallCheck(this, Pointerify);
	
	    var _ = new (Function.prototype.bind.apply(_Pointerify3.default, [null].concat(Array.prototype.slice.call(arguments))))();
	
	    this.configure = _.configure.bind(_);
	    this.destroy = _.destroy.bind(_);
	    this.refresh = _.refresh.bind(_);
	
	    Object.defineProperties(this, {
	        totalTouches: {
	            get: function get() {
	                return _.totalTouches;
	            }
	        }
	    });
	
	    Object.seal(this);
	};
	
	exports.default = Facade;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Constants = __webpack_require__(3);
	
	var _Dom = __webpack_require__(4);
	
	var _Dom2 = _interopRequireDefault(_Dom);
	
	var _EventBinding = __webpack_require__(5);
	
	var _EventBinding2 = _interopRequireDefault(_EventBinding);
	
	var _Pointer = __webpack_require__(6);
	
	var _Pointer2 = _interopRequireDefault(_Pointer);
	
	var _Util = __webpack_require__(7);
	
	var _Util2 = _interopRequireDefault(_Util);
	
	var _Config = __webpack_require__(9);
	
	var _Config2 = _interopRequireDefault(_Config);
	
	var _events = __webpack_require__(13);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _StateStatic = __webpack_require__(14);
	
	var _StateStatic2 = _interopRequireDefault(_StateStatic);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Pointerify = function () {
	    /**
	     * @constructor
	     * @param {HTMLElement} root
	     * @param {object}      config
	     */
	
	    function Pointerify(root, config) {
	        _classCallCheck(this, Pointerify);
	
	        this.mouse = null;
	        this.wheel = null;
	        this.virtual = null;
	        this.touches = {};
	        this.bindings = [];
	        this.rootRect = null;
	        this.dom = new _Dom2.default();
	        this.config = new _Config2.default();
	        this.isClicking = false;
	
	        Object.seal(this);
	
	        this.init(root, config);
	    }
	
	    _createClass(Pointerify, [{
	        key: 'init',
	
	
	        /* Private Methods
	        ---------------------------------------------------------------------- */
	
	        /**
	         * @private
	         * @param  {HTMLElement} root
	         * @param  {object}      config
	         * @return {void}
	         */
	
	        value: function init(root, config) {
	            if (!(root instanceof HTMLElement)) {
	                throw new TypeError('[Pointerify] Invalid root element');
	            }
	
	            this.dom.root = root;
	
	            this.configure(config);
	
	            this.setRootGeometry();
	
	            this.bindEvents(_events2.default);
	        }
	
	        /**
	         * @private
	         * @param   {Array.<object>} eventsRaw
	         * @return  {Array.<EventBinding>}
	         */
	
	    }, {
	        key: 'bindEvents',
	        value: function bindEvents(eventsRaw) {
	            var _this = this;
	
	            return eventsRaw.map(function (eventRaw) {
	                return _this.bindEvent(eventRaw);
	            });
	        }
	
	        /**
	         * @private
	         * @param   {object} eventRaw
	         * @return  {EventBinding}
	         */
	
	    }, {
	        key: 'bindEvent',
	        value: function bindEvent(eventRaw) {
	            var binding = _Util2.default.extend(new _EventBinding2.default(), eventRaw);
	            var eventTypes = [];
	
	            var fn = null;
	            var el = null;
	
	            if (typeof (fn = this[binding.bind]) !== 'function') {
	                throw new Error('No method found with name "' + binding.bind + '"');
	            }
	
	            if (binding.throttle > 0) {
	                binding.fn = _Util2.default.throttle(fn.bind(this), binding.throttle);
	            } else if (binding.debounce > 0) {
	                binding.fn = _Util2.default.debounce(fn.bind(this), binding.debounce);
	            } else {
	                binding.fn = fn.bind(this);
	            }
	
	            if (binding.el && !((el = this.dom[binding.el]) instanceof HTMLElement)) {
	                throw new Error('No element reference with name "' + binding.el + '"');
	            } else if (!binding.el) {
	                el = window;
	            }
	
	            if (Array.isArray(binding.on)) {
	                eventTypes.push.apply(eventTypes, _toConsumableArray(binding.on));
	            } else {
	                eventTypes.push(binding.on);
	            }
	
	            binding.ref = el;
	
	            eventTypes.forEach(function (type) {
	                return binding.ref.addEventListener(type, binding.fn, {
	                    passive: binding.passive
	                });
	            });
	
	            return binding;
	        }
	
	        /**
	         * @private
	         * @param   {Array.<EventBinding>} eventBindings
	         * @return  {void}
	         */
	
	    }, {
	        key: 'unbindEvents',
	        value: function unbindEvents(eventBindings) {
	            var _loop = function _loop() {
	                var binding = eventBindings.pop();
	                var eventTypes = [];
	
	                if (Array.isArray(binding.on)) {
	                    eventTypes.push.apply(eventTypes, _toConsumableArray(binding.on));
	                } else {
	                    eventTypes.push(binding.on);
	                }
	
	                eventTypes.forEach(function (type) {
	                    return binding.ref.removeEventListener(type, binding.fn);
	                });
	            };
	
	            while (eventBindings.length) {
	                _loop();
	            }
	        }
	
	        /**
	         * @param  {MouseEvent} e
	         * @return {void}
	         */
	
	    }, {
	        key: 'handleClick',
	        value: function handleClick(e) {
	            if (this.isClicking) return;
	
	            e.preventDefault();
	            e.stopPropagation();
	        }
	
	        /**
	         * @private
	         * @param   {MouseEvent} e
	         * @return  {void}
	         */
	
	    }, {
	        key: 'handleMouseDown',
	        value: function handleMouseDown(e) {
	            var target = e.target;
	            var handleSelector = this.config.selectors.handle;
	
	            var didCancel = false;
	
	            if (e.button !== 0) return;
	
	            if (this.mouse) {
	                this.cancelPointer(this.mouse);
	
	                didCancel = true;
	            }
	
	            if (handleSelector && !_Util2.default.closestParent(target, handleSelector, true)) return;
	
	            this.setRootGeometry();
	
	            this.mouse = this.createPointer(e, _Constants.POINTER_TYPE_MOUSE, didCancel);
	
	            e.preventDefault();
	        }
	
	        /**
	         * @param  {MouseEvent} e
	         * @return {void}
	         */
	
	    }, {
	        key: 'handleRootMouseMove',
	        value: function handleRootMouseMove(e) {
	            if (this.mouse) return;
	
	            this.emitStatic(e, _Constants.EVENT_POINTER_INSPECT);
	        }
	
	        /**
	         * @private
	         * @param   {MouseEvent} e
	         * @return  {void}
	         */
	
	    }, {
	        key: 'handleWindowMouseMove',
	        value: function handleWindowMouseMove(e) {
	            if (!this.mouse) return;
	
	            if (this.mouse.isStopping) return;
	
	            this.movePointer(this.mouse, e, e);
	        }
	
	        /**
	         * @private
	         * @param   {MouseEvent} e
	         * @return  {void}
	         */
	
	    }, {
	        key: 'handleMouseUp',
	        value: function handleMouseUp(e) {
	            if (!this.mouse) return;
	
	            this.releasePointer(this.mouse, e);
	
	            e.preventDefault();
	        }
	
	        /**
	         * @private
	         * @param   {TouchEvent} e
	         * @return  {void}
	         */
	
	    }, {
	        key: 'handleTouchStart',
	        value: function handleTouchStart(e) {
	            var target = e.target;
	            var handleSelector = this.config.selectors.handle;
	
	            var touchIds = null;
	
	            for (var i = 0, touch; touch = e.changedTouches[i]; i++) {
	                var newId = touch.identifier;
	
	                var didCancel = false;
	
	                for (var activeId in this.touches) {
	                    // If any active touches in this instance are stopping (i.e.
	                    // already released but moving via inertia), cancel them.
	
	                    var activePointer = null;
	
	                    if ((activePointer = this.touches[activeId]).isStopping) {
	                        this.cancelPointer(activePointer);
	
	                        didCancel = true;
	                    }
	                }
	
	                if (handleSelector && !_Util2.default.closestParent(target, handleSelector, true)) break;
	
	                this.setRootGeometry();
	
	                if (this.totalTouches < 2 && !this.touches[newId]) {
	                    this.touches[newId] = this.createPointer(touch, _Constants.POINTER_TYPE_TOUCH, didCancel);
	                }
	            }
	
	            if (!this.config.behavior.pinch) return;
	
	            touchIds = Object.keys(this.touches);
	
	            if (touchIds.length > 1 && !this.virtual) {
	                // Multiple touches exist, create a "virtual" pointer at the
	                // midpoint
	
	                e.preventDefault();
	
	                this.virtual = this.createVirtualPointer(this.touches[touchIds[0]], this.touches[touchIds[1]]);
	            }
	        }
	
	        /**
	         * @private
	         * @param {TouchEvent} e
	         */
	
	    }, {
	        key: 'handleTouchMove',
	        value: function handleTouchMove(e) {
	            if (this.totalTouches < 1) return;
	
	            for (var i = 0, touch; touch = e.changedTouches[i]; i++) {
	                var id = touch.identifier;
	
	                var pointer = null;
	
	                if (!((pointer = this.touches[id]) instanceof _Pointer2.default) || pointer.isStopping) break;
	
	                this.movePointer(pointer, touch, e);
	            }
	        }
	
	        /**
	         * @private
	         * @param   {TouchEvent} e
	         * @return  {void}
	         */
	
	    }, {
	        key: 'handleTouchEnd',
	        value: function handleTouchEnd(e) {
	            if (this.totalTouches < 1) return;
	
	            for (var i = 0, touch; touch = e.changedTouches[i]; i++) {
	                var id = touch.identifier;
	
	                var pointer = null;
	
	                if (!((pointer = this.touches[id]) instanceof _Pointer2.default)) break;
	
	                this.releasePointer(pointer, touch, e);
	
	                e.preventDefault();
	            }
	        }
	
	        /**
	         * @private
	         * @return  {void}
	         */
	
	    }, {
	        key: 'handleResize',
	        value: function handleResize() {
	            this.setRootGeometry();
	        }
	
	        /**
	         * @private
	         * @return  {void}
	         */
	
	    }, {
	        key: 'setRootGeometry',
	        value: function setRootGeometry() {
	            this.rootRect = this.dom.root.getBoundingClientRect();
	        }
	
	        /**
	         * @private
	         * @param   {(TouchEvent|MouseEvent)}   e
	         * @param   {Symbol}                    type
	         * @param   {boolean}                   isExtending
	         * @return  {Pointer}
	         */
	
	    }, {
	        key: 'createPointer',
	        value: function createPointer(_ref, type, isExtending) {
	            var clientX = _ref.clientX,
	                clientY = _ref.clientY,
	                identifier = _ref.identifier;
	
	            var pointer = new _Pointer2.default();
	
	            if (isExtending) {
	                pointer.status = _Constants.POINTER_STATUS_EXTENDING;
	            }
	
	            if (typeof identifier !== 'undefined') {
	                pointer.id = identifier;
	            }
	
	            pointer.type = type;
	            pointer.pointerify = this;
	
	            pointer.startX = pointer.currentX = clientX;
	            pointer.startY = pointer.currentY = clientY;
	
	            pointer.rootWidth = this.rootRect.width;
	            pointer.rootHeight = this.rootRect.height;
	            pointer.rootOffsetX = clientX - this.rootRect.left;
	            pointer.rootOffsetY = clientY - this.rootRect.top;
	
	            pointer.down();
	
	            return pointer;
	        }
	
	        /**
	         * @private
	         * @param  {Pointer} yinPointer
	         * @param  {Pointer} yangPointer
	         * @return {Pointer}
	         */
	
	    }, {
	        key: 'createVirtualPointer',
	        value: function createVirtualPointer(yinPointer, yangPointer) {
	            var pointer = new _Pointer2.default();
	
	            var startX = (yinPointer.startX + yangPointer.startX) / 2;
	            var startY = (yinPointer.startY + yangPointer.startY) / 2;
	
	            var hypotenuse = _Util2.default.hypotenuse({ x: yinPointer.startX, y: yinPointer.startY }, { x: yangPointer.startX, y: yangPointer.startY });
	
	            pointer.type = _Constants.POINTER_TYPE_VIRTUAL;
	            pointer.pointerify = this;
	
	            pointer.yinPointer = yinPointer;
	            pointer.yangPointer = yangPointer;
	
	            pointer.startX = pointer.currentX = startX;
	            pointer.startY = pointer.currentY = startY;
	            pointer.startDistance = hypotenuse;
	
	            pointer.rootWidth = this.rootRect.width;
	            pointer.rootHeight = this.rootRect.height;
	            pointer.rootOffsetX = startX - this.rootRect.left;
	            pointer.rootOffsetY = startY - this.rootRect.top;
	
	            pointer.down();
	
	            return pointer;
	        }
	
	        /**
	         * @private
	         * @param   {Pointer}
	         * @param   {(Touch|MouseEvent|null)}        e
	         * @param   {(TouchEvent|MouseEvent|null)}   originalEvent
	         * @return  {void}
	         */
	
	    }, {
	        key: 'movePointer',
	        value: function movePointer(pointer) {
	            var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	            var originalEvent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
	
	            var allowAxis = this.config.behavior.allowAxis;
	
	            var isValidVector = true;
	
	            if (pointer.isVirtualPointer) {
	                var hypotenuse = _Util2.default.hypotenuse({ x: pointer.yinPointer.currentX, y: pointer.yinPointer.currentY }, { x: pointer.yangPointer.currentX, y: pointer.yangPointer.currentY });
	
	                pointer.currentX = (pointer.yinPointer.currentX + pointer.yangPointer.currentX) / 2;
	                pointer.currentY = (pointer.yinPointer.currentY + pointer.yangPointer.currentY) / 2;
	
	                if (hypotenuse !== pointer.currentDistance) {
	                    // Hypotenuse has changed, user is pinching
	
	                    pointer.currentDistance = hypotenuse;
	
	                    this.pinchPointer(pointer);
	                }
	            } else {
	                pointer.currentX = e.clientX;
	                pointer.currentY = e.clientY;
	            }
	
	            if (!pointer.isMoving) {
	                // NB: Do not use deltas here as may report `0`
	
	                var vector = Math.abs((pointer.currentX - pointer.startX) / (pointer.currentY - pointer.startY));
	
	                if (allowAxis === _Constants.AXIS_X && vector < 1 || allowAxis === _Constants.AXIS_Y && vector >= 1) {
	                    // this.deletePointer(pointer);
	
	                    isValidVector = false;
	                }
	            }
	
	            if (isValidVector) {
	                // Vector is within range, move pointer
	
	                if (pointer.isVirtualPointer && e === null) {
	                    pointer.status = _Constants.POINTER_STATUS_STOPPING;
	                } else {
	                    pointer.status = _Constants.POINTER_STATUS_MOVING;
	                }
	
	                pointer.move();
	
	                if (!pointer.isVirtualPointer) {
	                    originalEvent.preventDefault();
	                }
	            }
	
	            // Move virtual pointer, regardless of vector
	
	            if (pointer.isTouchPointer && this.virtual !== null) {
	                this.movePointer(this.virtual, e, originalEvent);
	            }
	        }
	
	        /**
	         * @private
	         * @param  {Pointer} pointer
	         * @return {void}
	         */
	
	    }, {
	        key: 'pinchPointer',
	        value: function pinchPointer(pointer) {
	            pointer.pinch();
	        }
	
	        /**
	         * @private
	         * @param   {Pointer}
	         * @param   {(TouchEvent|MouseEvent)} e
	         * @return  {void}
	         */
	
	    }, {
	        key: 'releasePointer',
	        value: function releasePointer(pointer, e) {
	            // NB: `pointerUp` fired before pointer is deleted
	            // and is included in `totalTouches` at time of event. May
	            // be counterintruitive, but is neccessary if `pointerStop`
	            // must always fire after `pointerUp`.
	
	            pointer.up();
	
	            if (pointer.isNew && !pointer.isVirtualPointer) {
	                this.click(e);
	            }
	
	            if (!pointer.isMoving || !this.config.physics.inertia) {
	                // Not moving, or inertia not enabled, delete immediately
	
	                this.deletePointer(pointer);
	            } else {
	                // Moving + inertia enabled, allow natural stop then delete
	
	                this.stopPointer(pointer);
	            }
	        }
	
	        /**
	         * @private
	         * @param   {Pointer}
	         * @return  {void}
	         */
	
	    }, {
	        key: 'stopPointer',
	        value: function stopPointer(pointer) {
	            var _this2 = this;
	
	            var STOPPED_PXPF = 0.5;
	            var initialVelocityX = pointer.velocityX;
	            var initialVelocityY = pointer.velocityY;
	            var directionX = pointer.directionX;
	            var directionY = pointer.directionY;
	
	            var render = function render() {
	                var progress = _this2.config.physics.friction * count;
	                var eased = _this2.config.physics.easing(progress);
	
	                var newVelocityX = initialVelocityX - initialVelocityX * eased;
	                var newVelocityY = initialVelocityY - initialVelocityY * eased;
	
	                newVelocityX = directionX === _Constants.DIRECTION_RIGHT ? Math.max(0, newVelocityX) : Math.min(0, newVelocityX);
	                newVelocityY = directionY === _Constants.DIRECTION_DOWN ? Math.max(0, newVelocityY) : Math.min(0, newVelocityY);
	
	                if (Math.abs(newVelocityX) < STOPPED_PXPF && Math.abs(newVelocityY) < STOPPED_PXPF) {
	                    // Pointer is stationary
	
	                    _this2.deletePointer(pointer);
	
	                    return;
	                }
	
	                pointer.currentX = Math.round(pointer.currentX + newVelocityX);
	                pointer.currentY = Math.round(pointer.currentY + newVelocityY);
	
	                pointer.rootOffsetX += newVelocityX;
	                pointer.rootOffsetY += newVelocityY;
	
	                count++;
	
	                if (pointer.currentX !== lastX || pointer.currentY !== lastY) {
	                    pointer.move();
	
	                    if (pointer.isTouchPointer && _this2.virtual !== null) {
	                        _this2.movePointer(_this2.virtual);
	                    }
	                }
	
	                lastX = pointer.currentX;
	                lastY = pointer.currentY;
	
	                pointer.rafIdInertia = requestAnimationFrame(render);
	            };
	
	            var count = 1;
	            var lastX = pointer.currentX;
	            var lastY = pointer.currentY;
	
	            pointer.status = _Constants.POINTER_STATUS_STOPPING;
	
	            pointer.rafIdInertia = requestAnimationFrame(render);
	        }
	
	        /**
	         * @private
	         * @param  {Pointer}
	         * @return {void}
	         */
	
	    }, {
	        key: 'cancelPointer',
	        value: function cancelPointer(pointer) {
	            cancelAnimationFrame(pointer.rafIdInertia);
	
	            this.deletePointer(pointer);
	        }
	
	        /**
	         * @private
	         * @param  {Pointer}
	         * @return {void}
	         */
	
	    }, {
	        key: 'deletePointer',
	        value: function deletePointer(pointer) {
	            pointer.stop();
	
	            switch (pointer.type) {
	                case _Constants.POINTER_TYPE_MOUSE:
	                    this.mouse = null;
	
	                    break;
	                case _Constants.POINTER_TYPE_TOUCH:
	                    delete this.touches[pointer.id];
	
	                    break;
	                case _Constants.POINTER_TYPE_VIRTUAL:
	                    this.virtual = null;
	
	                    break;
	            }
	
	            if (this.totalTouches < 2 && this.virtual) {
	                this.deletePointer(this.virtual);
	            }
	        }
	
	        /**
	         * @private
	         * @param  {MouseEvent}  e
	         * @param  {string}      type
	         * @return {void}
	         */
	
	    }, {
	        key: 'emitStatic',
	        value: function emitStatic(_ref2, type) {
	            var clientX = _ref2.clientX,
	                clientY = _ref2.clientY;
	
	            var state = new _StateStatic2.default();
	
	            var event = new CustomEvent(type, {
	                detail: state,
	                bubbles: true
	            });
	
	            var rootOffsetX = clientX - this.rootRect.left;
	            var rootOffsetY = clientY - this.rootRect.top;
	
	            state.multiplierX = Math.max(0, Math.min(1, rootOffsetX / this.rootRect.width));
	            state.multiplierY = Math.max(0, Math.min(1, rootOffsetY / this.rootRect.height));
	
	            this.emitEvent(event);
	        }
	
	        /**
	         * @private
	         * @param  {CustomEvent} e
	         * @return {void}
	         */
	
	    }, {
	        key: 'emitEvent',
	        value: function emitEvent(e) {
	            this.dom.root.dispatchEvent(e);
	        }
	
	        /**
	         * @private
	         * @param   {(TouchEvent|MouseEvent)} e
	         * @return  {void}
	         */
	
	    }, {
	        key: 'click',
	        value: function click(e) {
	            var target = e.target;
	
	            this.isClicking = true;
	
	            this.emitStatic(e, _Constants.EVENT_POINTER_TAP);
	
	            while (typeof target.click !== 'function') {
	                target = target.parentElement;
	            }
	
	            target.click();
	
	            this.isClicking = false;
	        }
	
	        /* Static Methods
	        ---------------------------------------------------------------------- */
	
	        /**
	         * @private
	         * @static
	         * @param {Error}   err
	         * @param {object}  target
	         */
	
	    }, {
	        key: 'configure',
	
	
	        /* Public Methods
	        ---------------------------------------------------------------------- */
	
	        /**
	         * @public
	         * @param   {object} config
	         * @return  {void}
	         */
	
	        value: function configure(config) {
	            var behavior = null;
	
	            if (behavior = config.behavior) {
	                // Uppercase enum values if present
	
	                var allowAxis = '';
	                var clampAxis = '';
	
	                if (allowAxis = behavior.allowAxis) behavior.allowAxis = allowAxis.toUpperCase();
	                if (clampAxis = behavior.clampAxis) behavior.clampAxis = clampAxis.toUpperCase();
	            }
	
	            _Util2.default.extend(this.config, config, true, Pointerify.handleMergeError.bind(this));
	
	            this.config.physics.friction = _Util2.default.clamp(this.config.physics.friction, 0, 1);
	        }
	
	        /**
	         * @public
	         * @return {void}
	         */
	
	    }, {
	        key: 'refresh',
	        value: function refresh() {
	            this.setRootGeometry();
	        }
	
	        /**
	         * @public
	         * @public
	         * @return {void}
	         */
	
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            this.unbindEvents(this.bindings);
	        }
	    }, {
	        key: 'totalTouches',
	        get: function get() {
	            return Object.keys(this.touches).length;
	        }
	    }], [{
	        key: 'handleMergeError',
	        value: function handleMergeError(err, target) {
	            var re = /property "?(\w*)"?[,:] object/i;
	
	            var matches = null;
	
	            if (!(err instanceof TypeError) || !(matches = re.exec(err.message))) throw err;
	
	            var keys = Object.keys(target);
	            var offender = matches[1].toLowerCase();
	
	            var bestMatch = keys.reduce(function (bestMatch, key) {
	                var charIndex = 0;
	
	                while (charIndex < offender.length && offender.charAt(charIndex) === key.charAt(charIndex).toLowerCase()) {
	                    charIndex++;
	                }return charIndex > bestMatch.length ? key : bestMatch;
	            }, '');
	
	            var suggestion = bestMatch ? '. Did you mean "' + bestMatch + '"?' : '';
	
	            throw new TypeError('[Pointerify] Invalid configuration option "' + matches[1] + '"' + suggestion);
	        }
	    }]);
	
	    return Pointerify;
	}();
	
	exports.default = Pointerify;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var POINTER_TYPE_MOUSE = exports.POINTER_TYPE_MOUSE = Symbol('POINTER_TYPE_MOUSE');
	var POINTER_TYPE_HOVER = exports.POINTER_TYPE_HOVER = Symbol('POINTER_TYPE_HOVER');
	var POINTER_TYPE_TOUCH = exports.POINTER_TYPE_TOUCH = Symbol('POINTER_TYPE_TOUCH');
	var POINTER_TYPE_VIRTUAL = exports.POINTER_TYPE_VIRTUAL = Symbol('POINTER_TYPE_VIRTUAL');
	
	var POINTER_STATUS_NEW = exports.POINTER_STATUS_NEW = Symbol('POINTER_STATUS_NEW');
	var POINTER_STATUS_EXTENDING = exports.POINTER_STATUS_EXTENDING = Symbol('POINTER_STATUS_EXTENDING');
	var POINTER_STATUS_MOVING = exports.POINTER_STATUS_MOVING = Symbol('POINTER_STATUS_MOVING');
	var POINTER_STATUS_INSPECTING = exports.POINTER_STATUS_INSPECTING = Symbol('POINTER_STATUS_INSPECTING');
	var POINTER_STATUS_STOPPING = exports.POINTER_STATUS_STOPPING = Symbol('POINTER_STATUS_STOPPING');
	var POINTER_STATUS_PINCHING = exports.POINTER_STATUS_PINCHING = Symbol('POINTER_STATUS_PINCHING');
	
	var EVENT_POINTER_DOWN = exports.EVENT_POINTER_DOWN = 'pointerDown';
	var EVENT_POINTER_DRAG = exports.EVENT_POINTER_DRAG = 'pointerDrag';
	var EVENT_POINTER_UP = exports.EVENT_POINTER_UP = 'pointerUp';
	var EVENT_POINTER_STOP = exports.EVENT_POINTER_STOP = 'pointerStop';
	var EVENT_POINTER_INSPECT = exports.EVENT_POINTER_INSPECT = 'pointerInspect';
	var EVENT_POINTER_TAP = exports.EVENT_POINTER_TAP = 'pointerTap';
	var EVENT_VIRTUAL_POINTER_CREATE = exports.EVENT_VIRTUAL_POINTER_CREATE = 'virtualPointerCreate';
	var EVENT_VIRTUAL_POINTER_MOVE = exports.EVENT_VIRTUAL_POINTER_MOVE = 'virtualPointerMove';
	var EVENT_VIRTUAL_POINTER_PINCH = exports.EVENT_VIRTUAL_POINTER_PINCH = 'virtualPointerPinch';
	var EVENT_VIRTUAL_POINTER_DESTROY = exports.EVENT_VIRTUAL_POINTER_DESTROY = 'virtualPointerDestroy';
	
	var DIRECTION_STATIC = exports.DIRECTION_STATIC = Symbol('DIRECTION_STATIC');
	var DIRECTION_LEFT = exports.DIRECTION_LEFT = Symbol('DIRECTION_LEFT');
	var DIRECTION_RIGHT = exports.DIRECTION_RIGHT = Symbol('DIRECTION_RIGHT');
	var DIRECTION_UP = exports.DIRECTION_UP = Symbol('DIRECTION_UP');
	var DIRECTION_DOWN = exports.DIRECTION_DOWN = Symbol('DIRECTION_DOWN');
	var DIRECTION_CONVERGE = exports.DIRECTION_CONVERGE = Symbol('DIRECTION_CONVERGE');
	var DIRECTION_DIVERGE = exports.DIRECTION_DIVERGE = Symbol('DIRECTION_DIVERGE');
	
	var AXIS_X = exports.AXIS_X = 'X';
	var AXIS_Y = exports.AXIS_Y = 'Y';
	var AXIS_BOTH = exports.AXIS_BOTH = 'BOTH';
	var AXIS_NONE = exports.AXIS_NONE = 'NONE';
	
	exports.default = {
	    AXIS_X: AXIS_X,
	    AXIS_Y: AXIS_Y,
	    AXIS_BOTH: AXIS_BOTH,
	    AXIS_NONE: AXIS_NONE,
	
	    POINTER_TYPE_MOUSE: POINTER_TYPE_MOUSE,
	    POINTER_TYPE_HOVER: POINTER_TYPE_HOVER,
	    POINTER_TYPE_TOUCH: POINTER_TYPE_TOUCH,
	    POINTER_TYPE_VIRTUAL: POINTER_TYPE_VIRTUAL,
	
	    POINTER_STATUS_NEW: POINTER_STATUS_NEW,
	    POINTER_STATUS_EXTENDING: POINTER_STATUS_EXTENDING,
	    POINTER_STATUS_MOVING: POINTER_STATUS_MOVING,
	    POINTER_STATUS_PINCHING: POINTER_STATUS_PINCHING,
	    POINTER_STATUS_INSPECTING: POINTER_STATUS_INSPECTING,
	    POINTER_STATUS_STOPPING: POINTER_STATUS_STOPPING,
	
	    DIRECTION_STATIC: DIRECTION_STATIC,
	    DIRECTION_LEFT: DIRECTION_LEFT,
	    DIRECTION_RIGHT: DIRECTION_RIGHT,
	    DIRECTION_UP: DIRECTION_UP,
	    DIRECTION_DOWN: DIRECTION_DOWN,
	    DIRECTION_CONVERGE: DIRECTION_CONVERGE,
	    DIRECTION_DIVERGE: DIRECTION_DIVERGE,
	
	    EVENT_POINTER_DOWN: EVENT_POINTER_DOWN,
	    EVENT_POINTER_DRAG: EVENT_POINTER_DRAG,
	    EVENT_POINTER_UP: EVENT_POINTER_UP,
	    EVENT_POINTER_STOP: EVENT_POINTER_STOP,
	    EVENT_POINTER_INSPECT: EVENT_POINTER_INSPECT,
	    EVENT_POINTER_TAP: EVENT_POINTER_TAP,
	    EVENT_VIRTUAL_POINTER_CREATE: EVENT_VIRTUAL_POINTER_CREATE,
	    EVENT_VIRTUAL_POINTER_MOVE: EVENT_VIRTUAL_POINTER_MOVE,
	    EVENT_VIRTUAL_POINTER_PINCH: EVENT_VIRTUAL_POINTER_PINCH,
	    EVENT_VIRTUAL_POINTER_DESTROY: EVENT_VIRTUAL_POINTER_DESTROY
	};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Dom = function Dom() {
	    _classCallCheck(this, Dom);
	
	    this.root = null;
	    this.handle = null;
	};
	
	exports.default = Dom;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var EventBinding = function EventBinding() {
	    _classCallCheck(this, EventBinding);
	
	    this.el = '';
	    this.on = '';
	    this.bind = '';
	    this.ref = null;
	    this.fn = null;
	    this.throttle = -1;
	    this.debounce = -1;
	    this.passive = true;
	
	    Object.seal(this);
	};
	
	exports.default = EventBinding;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Util = __webpack_require__(7);
	
	var _Util2 = _interopRequireDefault(_Util);
	
	var _Constants = __webpack_require__(3);
	
	var _StatePointer = __webpack_require__(8);
	
	var _StatePointer2 = _interopRequireDefault(_StatePointer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Pointer = function () {
	    function Pointer() {
	        _classCallCheck(this, Pointer);
	
	        this.id = _Util2.default.randomHex();
	        this.startX = -1;
	        this.startY = -1;
	        this.startDistance = -1;
	        this.currentX = -1;
	        this.currentY = -1;
	        this.currentDistance = -1;
	        this.rootWidth = -1;
	        this.rootHeight = -1;
	        this.rootOffsetX = -1;
	        this.rootOffsetY = -1;
	        this.velocitiesX = [];
	        this.velocitiesY = [];
	        this.velocitiesPinch = [];
	        this.type = null;
	        this.pointerify = null;
	        this.yinPointer = null;
	        this.yangPointer = null;
	        this.status = _Constants.POINTER_STATUS_NEW;
	        this.isMonitoring = false;
	
	        this.rafIdVelocity = -1;
	        this.rafIdInertia = -1;
	
	        Object.seal(this);
	    }
	
	    _createClass(Pointer, [{
	        key: 'down',
	        value: function down() {
	            if (this.isVirtualPointer) {
	                this.dispatchEvent(_Constants.EVENT_VIRTUAL_POINTER_CREATE);
	            } else {
	                this.dispatchEvent(_Constants.EVENT_POINTER_DOWN);
	            }
	        }
	    }, {
	        key: 'move',
	        value: function move() {
	            if (!this.isMonitoring && !this.isStopping) this.startMonitorVelocity();
	
	            if (this.isVirtualPointer) {
	                this.dispatchEvent(_Constants.EVENT_VIRTUAL_POINTER_MOVE);
	            } else {
	                this.dispatchEvent(_Constants.EVENT_POINTER_DRAG);
	            }
	        }
	    }, {
	        key: 'pinch',
	        value: function pinch() {
	            this.dispatchEvent(_Constants.EVENT_VIRTUAL_POINTER_PINCH);
	        }
	    }, {
	        key: 'up',
	        value: function up() {
	            this.stopMonitorVelocity();
	
	            this.dispatchEvent(_Constants.EVENT_POINTER_UP);
	        }
	    }, {
	        key: 'stop',
	        value: function stop() {
	            if (this.isVirtualPointer) {
	                this.dispatchEvent(_Constants.EVENT_VIRTUAL_POINTER_DESTROY);
	            } else {
	                this.dispatchEvent(_Constants.EVENT_POINTER_STOP);
	            }
	        }
	    }, {
	        key: 'startMonitorVelocity',
	        value: function startMonitorVelocity() {
	            var _this = this;
	
	            var SAMPLE_SIZE = 8;
	
	            var lastX = this.currentX;
	            var lastY = this.currentY;
	
	            var monitor = function monitor() {
	                if (_this.velocitiesX.length === SAMPLE_SIZE) _this.velocitiesX.shift();
	                if (_this.velocitiesY.length === SAMPLE_SIZE) _this.velocitiesY.shift();
	
	                _this.velocitiesX.push(_this.currentX - lastX);
	                _this.velocitiesY.push(_this.currentY - lastY);
	
	                lastX = _this.currentX;
	                lastY = _this.currentY;
	
	                if (!_this.isMonitoring) return;
	
	                _this.rafIdVelocity = requestAnimationFrame(monitor);
	            };
	
	            this.rafIdVelocity = requestAnimationFrame(monitor);
	
	            this.isMonitoring = true;
	        }
	    }, {
	        key: 'stopMonitorVelocity',
	        value: function stopMonitorVelocity() {
	            cancelAnimationFrame(this.rafIdVelocity);
	
	            this.rafIdVelocity = -1;
	
	            this.isMonitoring = false;
	        }
	    }, {
	        key: 'dispatchEvent',
	        value: function dispatchEvent(eventType) {
	            var event = new CustomEvent(eventType, {
	                detail: this.getState(),
	                bubbles: true
	            });
	
	            this.pointerify.emitEvent(event);
	        }
	    }, {
	        key: 'getState',
	        value: function getState() {
	            var state = new _StatePointer2.default();
	            var _pointerify$config$be = this.pointerify.config.behavior,
	                clampX = _pointerify$config$be.clampX,
	                clampY = _pointerify$config$be.clampY;
	
	
	            state.id = 'pointer-' + this.id;
	            state.deltaX = this.deltaX;
	            state.deltaY = this.deltaY;
	            state.deltaDistance = this.deltaDistance;
	            state.deltaMultiplierX = this.deltaMultiplierX;
	            state.deltaMultiplierY = this.deltaMultiplierY;
	            state.deltaMultiplierDistance = this.deltaMultiplierDistance;
	            state.multiplierX = clampX ? _Util2.default.clamp(this.multiplierX, 0, 1) : this.multiplierX;
	            state.multiplierY = clampY ? _Util2.default.clamp(this.multiplierY, 0, 1) : this.multiplierY;
	            state.velocityX = this.velocityX;
	            state.velocityY = this.velocityY;
	            state.velocityPinch = this.velocityPinch;
	            state.directionX = this.directionX;
	            state.directionY = this.directionY;
	            state.directionPinch = this.directionPinch;
	            state.status = this.status;
	            state.type = this.type;
	
	            return Object.freeze(state);
	        }
	    }, {
	        key: 'deltaX',
	        get: function get() {
	            return this.pointerify.config.behavior.allowAxis === _Constants.AXIS_Y ? 0 : this.currentX - this.startX;
	        }
	    }, {
	        key: 'deltaY',
	        get: function get() {
	            return this.pointerify.config.behavior.allowAxis === _Constants.AXIS_X ? 0 : this.currentY - this.startY;
	        }
	    }, {
	        key: 'deltaDistance',
	        get: function get() {
	            return this.currentDistance - this.startDistance;
	        }
	    }, {
	        key: 'deltaMultiplierX',
	        get: function get() {
	            return this.deltaX / this.rootWidth;
	        }
	    }, {
	        key: 'deltaMultiplierY',
	        get: function get() {
	            return this.deltaY / this.rootHeight;
	        }
	    }, {
	        key: 'deltaMultiplierDistance',
	        get: function get() {
	            return this.deltaDistance / this.startDistance;
	        }
	    }, {
	        key: 'multiplierX',
	        get: function get() {
	            return (this.rootOffsetX + this.deltaX) / this.rootWidth;
	        }
	    }, {
	        key: 'multiplierY',
	        get: function get() {
	            return (this.rootOffsetY + this.deltaY) / this.rootHeight;
	        }
	    }, {
	        key: 'velocityX',
	        get: function get() {
	            return this.velocitiesX.length && this.pointerify.config.behavior.allowAxis !== _Constants.AXIS_Y ? this.velocitiesX.reduce(function (value, sum) {
	                return value + sum;
	            }, 0) / this.velocitiesX.length : 0;
	        }
	    }, {
	        key: 'velocityY',
	        get: function get() {
	            return this.velocitiesY.length && this.pointerify.config.behavior.allowAxis !== _Constants.AXIS_X ? this.velocitiesY.reduce(function (value, sum) {
	                return value + sum;
	            }, 0) / this.velocitiesY.length : 0;
	        }
	    }, {
	        key: 'velocityPinch',
	        get: function get() {
	            return this.velocitiesPinch.length ? this.velocitiesPinch.reduce(function (value, sum) {
	                return value + sum;
	            }, 0) / this.velocitiesPinch.length : 0;
	        }
	    }, {
	        key: 'isMousePointer',
	        get: function get() {
	            return this.type === _Constants.POINTER_TYPE_MOUSE;
	        }
	    }, {
	        key: 'isTouchPointer',
	        get: function get() {
	            return this.type === _Constants.POINTER_TYPE_TOUCH;
	        }
	    }, {
	        key: 'isVirtualPointer',
	        get: function get() {
	            return this.type === _Constants.POINTER_TYPE_VIRTUAL;
	        }
	    }, {
	        key: 'isNew',
	        get: function get() {
	            return this.status === _Constants.POINTER_STATUS_NEW;
	        }
	    }, {
	        key: 'isExtending',
	        get: function get() {
	            return this.status === _Constants.POINTER_STATUS_EXTENDING;
	        }
	    }, {
	        key: 'isMoving',
	        get: function get() {
	            return this.status === _Constants.POINTER_STATUS_MOVING;
	        }
	    }, {
	        key: 'isPinching',
	        get: function get() {
	            return this.status === _Constants.POINTER_STATUS_PINCHING;
	        }
	    }, {
	        key: 'isStopping',
	        get: function get() {
	            return this.status === _Constants.POINTER_STATUS_STOPPING;
	        }
	    }, {
	        key: 'directionX',
	        get: function get() {
	            if (this.velocityX < 0) {
	                return _Constants.DIRECTION_LEFT;
	            } else if (this.velocityX > 0) {
	                return _Constants.DIRECTION_RIGHT;
	            }
	
	            return _Constants.DIRECTION_STATIC;
	        }
	    }, {
	        key: 'directionY',
	        get: function get() {
	            if (this.velocityY < 0) {
	                return _Constants.DIRECTION_UP;
	            } else if (this.velocityY) {
	                return _Constants.DIRECTION_DOWN;
	            }
	
	            return _Constants.DIRECTION_STATIC;
	        }
	    }, {
	        key: 'directionPinch',
	        get: function get() {
	            if (this.velocityPinch < 0) {
	                return _Constants.DIRECTION_CONVERGE;
	            } else if (this.velocityPinch) {
	                return _Constants.DIRECTION_DIVERGE;
	            }
	
	            return _Constants.DIRECTION_STATIC;
	        }
	    }]);
	
	    return Pointer;
	}();
	
	exports.default = Pointer;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Util = function () {
	    function Util() {
	        _classCallCheck(this, Util);
	    }
	
	    _createClass(Util, null, [{
	        key: 'extend',
	
	        /**
	         * Merges properties from a source object into a target object,
	         * optionally using a recursive deep extend.
	         *
	         * @param   {object}    target
	         * @param   {object}    source
	         * @param   {boolean}   [deep=false]
	         * @param   {function}  [errorHandler=null]
	         * @return  {object}
	         */
	
	        value: function extend(target, source) {
	            var deep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	            var errorHandler = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
	
	            var sourceKeys = [];
	
	            if (!target || (typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== 'object') {
	                throw new TypeError('[Util#extend] Target must be a valid object');
	            }
	
	            if (Array.isArray(source)) {
	                for (var i = 0; i < source.length; i++) {
	                    sourceKeys.push(i);
	                }
	            } else if (source) {
	                sourceKeys = Object.keys(source);
	            }
	
	            for (var _i = 0; _i < sourceKeys.length; _i++) {
	                var key = sourceKeys[_i];
	                var descriptor = Object.getOwnPropertyDescriptor(source, key);
	
	                // Skip virtual properties
	
	                if (typeof descriptor.get === 'function') continue;
	
	                if (!deep || _typeof(source[key]) !== 'object') {
	                    // All non-object primitives, or all properties if
	                    // shallow extend
	
	                    try {
	                        target[key] = source[key];
	                    } catch (err) {
	                        if (typeof errorHandler !== 'function') throw err;
	
	                        errorHandler(err, target);
	                    }
	                } else if (Array.isArray(source[key])) {
	                    // Arrays
	
	                    if (!target[key]) {
	                        target[key] = [];
	                    }
	
	                    Util.extend(target[key], source[key], deep, errorHandler);
	                } else {
	                    // Objects
	
	                    if (!target[key]) {
	                        target[key] = {};
	                    }
	
	                    Util.extend(target[key], source[key], deep, errorHandler);
	                }
	            }
	
	            return target;
	        }
	
	        /**
	         * Returns the closest parent of a given element matching the
	         * provided selector, optionally including the element itself.
	         *
	         * @param   {HTMLElement}       el
	         * @param   {string}            selector
	         * @param   {boolean}           [includeSelf]
	         * @return  {HTMLElement|null}
	         */
	
	    }, {
	        key: 'closestParent',
	        value: function closestParent(el, selector, includeSelf) {
	            var parent = el.parentNode;
	
	            if (includeSelf && el.matches(selector)) {
	                return el;
	            }
	
	            while (parent && parent !== document.body) {
	                if (parent.matches && parent.matches(selector)) {
	                    return parent;
	                } else if (parent.parentNode) {
	                    parent = parent.parentNode;
	                } else {
	                    return null;
	                }
	            }
	
	            return null;
	        }
	
	        /**
	         * Returns a function which calls the provided function
	         * only after the specified interval has elapsed between
	         * function calls. An optional `immediate` boolean will
	         * cause the provided function to be called once immediately
	         * before waiting.
	         *
	         * @param   {function}  fn
	         * @param   {number}    interval
	         * @param   {boolean}   [immediate=false]
	         * @return  {function}
	         */
	
	    }, {
	        key: 'debounce',
	        value: function debounce(fn, interval, immediate) {
	            var timeoutId = -1;
	
	            return function () {
	                var _this = this;
	
	                var args = arguments;
	
	                var later = function later() {
	                    timeoutId = -1;
	
	                    fn.apply(_this, args); // eslint-disable-line no-invalid-this
	                };
	
	                if (timeoutId < 0 && immediate) {
	                    later();
	                } else {
	                    clearTimeout(timeoutId);
	
	                    timeoutId = setTimeout(later, interval);
	                }
	            };
	        }
	
	        /**
	         * Clamps a floating point number to within a provided range.
	         *
	         * @param   {number} float
	         * @param   {number} [min]
	         * @param   {number} [max]
	         * @return  {number}
	         */
	
	    }, {
	        key: 'clamp',
	        value: function clamp(float, min, max) {
	            min = typeof min === 'number' ? min : 0;
	            max = typeof max === 'number' ? max : 1;
	
	            return Math.max(min, Math.min(max, float));
	        }
	
	        /**
	         * @param  {object} props
	         * @return {object}
	         */
	
	    }, {
	        key: 'strictProps',
	        value: function strictProps(props) {
	            var descriptors = {};
	
	            var keys = Object.keys(props);
	
	            keys.forEach(function (key) {
	                var _props$key = _slicedToArray(props[key], 3),
	                    type = _props$key[0],
	                    init = _props$key[1],
	                    _props$key$ = _props$key[2],
	                    cb = _props$key$ === undefined ? null : _props$key$;
	
	                switch (type) {
	                    case 'enum':
	                        descriptors[key] = Util.enumProp(key, init, cb);
	
	                        break;
	                    default:
	                        descriptors[key] = Util.typedProp(key, type, init, cb);
	                }
	            });
	
	            return descriptors;
	        }
	
	        /**
	         * @param  {string}   key
	         * @param  {function} type
	         * @param  {*} init
	         * @param  {function} [cb=null]
	         * @return {object}
	         */
	
	    }, {
	        key: 'typedProp',
	        value: function typedProp(key, type, init) {
	            var cb = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
	
	            var _value = init;
	
	            return {
	                get: function get() {
	                    return _value;
	                },
	                set: function set(value) {
	                    var fnName = type.name;
	
	                    var typeOf = '';
	
	                    if (typeof fnName === 'undefined') {
	                        // No function.name support
	
	                        _value = value;
	
	                        return;
	                    }
	
	                    typeOf = fnName.toLowerCase();
	
	                    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== typeOf) {
	                        throw new TypeError('Value "' + value.toString() + '" on property "' + key + '" is not a ' + typeOf);
	                    }
	
	                    if (typeof cb === 'function') cb(value);
	
	                    _value = value;
	                }
	            };
	        }
	
	        /**
	         * Returns a property descriptor definine a string property
	         * with a finite set of possible string values.
	         *
	         * @param   {string} key
	         * @param   {Array.<string>} values
	         * @param   {function}       [cb=null]
	         * @return  {object}
	         */
	
	    }, {
	        key: 'enumProp',
	        value: function enumProp(key, values) {
	            var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
	
	            var _value = values[0];
	
	            return {
	                get: function get() {
	                    return _value;
	                },
	                set: function set(value) {
	                    if (values.indexOf(value) < 0) {
	                        throw new Error('Value "' + value.toString() + '" not allowed for property "' + key + '"');
	                    }
	
	                    if (typeof cb === 'function') cb(value);
	
	                    _value = value;
	                }
	            };
	        }
	
	        /**
	         * Returns a random hex string
	         *
	         * @return {string}
	         */
	
	    }, {
	        key: 'randomHex',
	        value: function randomHex() {
	            return ('00000' + (Math.random() * 16777216 << 0).toString(16)).substr(-6); // eslint-disable-line no-magic-numbers, no-bitwise
	        }
	
	        /**
	         * Returns the distance between two grid coordindates.
	         *
	         * @param   {object} nodeA
	         * @param   {object} nodeB
	         * @return  {number}
	         */
	
	    }, {
	        key: 'hypotenuse',
	        value: function hypotenuse(nodeA, nodeB) {
	            var squareOfsideX = Math.pow(Math.abs(nodeA.x - nodeB.x), 2);
	            var squareOfSideY = Math.pow(Math.abs(nodeA.y - nodeB.y), 2);
	
	            return Math.sqrt(squareOfsideX + squareOfSideY);
	        }
	    }]);
	
	    return Util;
	}();
	
	exports.default = Util;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Constants = __webpack_require__(3);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var StatePointer = function () {
	    function StatePointer() {
	        _classCallCheck(this, StatePointer);
	
	        this.id = -1;
	        this.deltaX = -1;
	        this.deltaY = -1;
	        this.deltaDistance = -1;
	        this.deltaMultiplierX = -1;
	        this.deltaMultiplierY = -1;
	        this.deltaMultiplierDistance = -1;
	        this.multiplierX = -1;
	        this.multiplierY = -1;
	        this.velocityX = -1;
	        this.velocityY = -1;
	        this.velocityPinch = -1;
	        this.directionX = null;
	        this.directionY = null;
	        this.directionPinch = null;
	        this.status = null;
	        this.type = null;
	
	        Object.seal(this);
	    }
	
	    _createClass(StatePointer, [{
	        key: 'isMousePointer',
	        get: function get() {
	            return this.type === _Constants.POINTER_TYPE_MOUSE;
	        }
	    }, {
	        key: 'isTouchPointer',
	        get: function get() {
	            return this.type === _Constants.POINTER_TYPE_TOUCH;
	        }
	    }, {
	        key: 'isVirtualPointer',
	        get: function get() {
	            return this.type === _Constants.POINTER_TYPE_VIRTUAL;
	        }
	    }]);
	
	    return StatePointer;
	}();
	
	exports.default = StatePointer;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _ConfigBehavior = __webpack_require__(10);
	
	var _ConfigBehavior2 = _interopRequireDefault(_ConfigBehavior);
	
	var _ConfigPhysics = __webpack_require__(11);
	
	var _ConfigPhysics2 = _interopRequireDefault(_ConfigPhysics);
	
	var _ConfigSelectors = __webpack_require__(12);
	
	var _ConfigSelectors2 = _interopRequireDefault(_ConfigSelectors);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Config = function Config() {
	    _classCallCheck(this, Config);
	
	    this.behavior = new _ConfigBehavior2.default();
	    this.physics = new _ConfigPhysics2.default();
	    this.selectors = new _ConfigSelectors2.default();
	
	    Object.freeze(this);
	};
	
	exports.default = Config;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Util = __webpack_require__(7);
	
	var _Util2 = _interopRequireDefault(_Util);
	
	var _Constants = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ConfigBehavior = function () {
	    function ConfigBehavior() {
	        _classCallCheck(this, ConfigBehavior);
	
	        Object.defineProperties(this, _Util2.default.strictProps({
	            pressDuration: [Number, 0],
	            allowAxis: ['enum', [_Constants.AXIS_BOTH, _Constants.AXIS_X, _Constants.AXIS_Y]],
	            clampAxis: ['enum', [_Constants.AXIS_NONE, _Constants.AXIS_BOTH, _Constants.AXIS_X, _Constants.AXIS_Y]],
	            pinch: [Boolean, true]
	        }));
	
	        Object.seal(this);
	    }
	
	    _createClass(ConfigBehavior, [{
	        key: 'allowX',
	        get: function get() {
	            return this.allowAxis === _Constants.AXIS_X || this.allowAxis === _Constants.AXIS_BOTH;
	        }
	    }, {
	        key: 'allowY',
	        get: function get() {
	            return this.allowAxis === _Constants.AXIS_Y || this.allowAxis === _Constants.AXIS_BOTH;
	        }
	    }, {
	        key: 'clampX',
	        get: function get() {
	            return this.clampAxis === _Constants.AXIS_X || this.clampAxis === _Constants.AXIS_BOTH;
	        }
	    }, {
	        key: 'clampY',
	        get: function get() {
	            return this.clampAxis === _Constants.AXIS_Y || this.clampAxis === _Constants.AXIS_BOTH;
	        }
	    }]);
	
	    return ConfigBehavior;
	}();
	
	exports.default = ConfigBehavior;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Util = __webpack_require__(7);
	
	var _Util2 = _interopRequireDefault(_Util);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ConfigPhysics = function ConfigPhysics() {
	    _classCallCheck(this, ConfigPhysics);
	
	    Object.defineProperties(this, _Util2.default.strictProps({
	        inertia: [Boolean, true],
	        friction: [Number, 0.02], // eslint-disable-line no-magic-numbers
	        easing: [Function, function (t) {
	            return --t * t * t + 1;
	        }]
	    }));
	
	    Object.seal(this);
	};
	
	exports.default = ConfigPhysics;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Util = __webpack_require__(7);
	
	var _Util2 = _interopRequireDefault(_Util);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ConfigSelectors = function ConfigSelectors() {
	    _classCallCheck(this, ConfigSelectors);
	
	    Object.defineProperties(this, _Util2.default.strictProps({
	        handle: [String, '']
	    }));
	
	    Object.seal(this);
	};
	
	exports.default = ConfigSelectors;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	module.exports = [
		{
			"el": "root",
			"on": "mousedown",
			"bind": "handleMouseDown",
			"passive": false
		},
		{
			"el": "root",
			"on": "touchstart",
			"bind": "handleTouchStart",
			"passive": false
		},
		{
			"el": "root",
			"on": "click",
			"bind": "handleClick",
			"passive": false
		},
		{
			"el": "root",
			"on": "mousemove",
			"bind": "handleRootMouseMove"
		},
		{
			"on": "mousemove",
			"bind": "handleWindowMouseMove",
			"passive": false
		},
		{
			"on": "touchmove",
			"bind": "handleTouchMove",
			"passive": false
		},
		{
			"on": "mouseup",
			"bind": "handleMouseUp",
			"passive": false
		},
		{
			"on": "touchend",
			"bind": "handleTouchEnd",
			"passive": false
		},
		{
			"on": "resize",
			"bind": "handleResize",
			"debounce": 100
		}
	];

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var StateStatic = function StateStatic() {
	    _classCallCheck(this, StateStatic);
	
	    this.multiplierX = -1;
	    this.multiplierY = -1;
	
	    Object.seal(this);
	};
	
	exports.default = StateStatic;

/***/ })
/******/ ])
});
;
//# sourceMappingURL=pointerify.js.map