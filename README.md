# Pointerify

A unified events-based API for mouse and multi-touch with built-in geometry and physics.

Pointerify is perfect for taking the hard work out of cross-platform sliders, image galleries, media controls, menus and more.

### Contents
- [Features](#features)
- [Installation](#installation)
- [Instantiation](#instantiation)
- [Events](#events)

## Features
Pointerify provides a simple, common set of intuitive DOM events for dealing with pointer interactions across mouse and touch platforms.

As well as abstracting away the idiosyncrasies of the underlying mouse/touch events into one robust API, Pointerify also provides rich geometry data – in the form of pointer "state" objects – which include:
- Element-centric X/Y positioning (as percentage-friendly multipliers)
- X/Y deltas (as px and percentage-friendly multipliers)
- X/Y velocities (in px/f)
- X/Y directions (left, right, up, down)
- Pinch distance and direction (for multi-touch "virtual" pointers)

Pointerify also features a lightweight, built-in physics engine to simulate inertia. This means that with inertia enabled, Pointerify will continue to dispatch "drag" events along the appropriate vector, after the mouse or touch pointer has been released, and until the specified friction coefficient has reduced the velocity to 0.

All of Pointerify's features are designed to reduce the amount of repetitive integration code we have to write when building cross-platform swipe, flick, tap and pinch gesture-based UI, and can be used to rapidly develop UI such as carousels, sliders, image galleries, and media timeline/volume controls.

## Installation

Firstly, install the package using your package manager of choice.

```
npm install pointerify --save-dev
```

You may then import the pointerify factory function into your project's modules.

```js
import pointerify from 'pointerify';
```

You may also load Pointerify via a `<script>` tag, and the `pointerify` factory function will be added to the global namespace.

```html
        ...
        <script src="/path/to/pointerify.js"></script>
    </body>
</html>
```

## Instantiation

The `pointerify` factory function then can be used to create a discrete pointerify instance on a provided "root" element.

```js
const ptr = pointerify(input);
```

A reference to the pointerify instance is returned and can be used to destroy it (and unbind its event handlers) later on.

#### Pointerify "Root" Elements

The element on which pointerify is instantiated will be used to determine all geometry data contained in the events dispatched by the instance.

For example, if the root element is `500px` wide and a user performs a mouse down at `50px` from its left edge, the `multiplierX` property in the resulting `PointerState` would be `0.1`, meaning the event ocurred at 10% of the element's width.

## Events

Each pointerify instance dispatches the following DOM events from the ("root") element on which it is instantiated. Each event contains a reference to a `PointerState` object via the event `detail` property, containing various geometry data points.

NB: All event names are written in "camelCase" to differentiate them from the lowercase native pointer events that are dispatched on some platforms.

#### `pointerDown`

Dispatched when the primary mouse button is depressed, or when a finger makes contact with the device glass.

This event name can also be accessed via the `pointerify.Constants.EVENT_POINTER_DOWN` constant.

#### `pointerDrag`

Dispatched when the mouse is moved while its primary button is depressed, or when a finger is moved across the device screen while in contact with the glass.

When `physics.inertia` is enabled, drag events will continue to be dispatched after the pointer is released, for an amount of time determined by the drag velocity at the time of release, and the specified `physics.friction` value.

This event name can also be accessed via the `pointerify.Constants.EVENT_POINTER_DRAG` constant.

#### `pointerUp`

Dispatched when the primary mouse button is released after being depressed while within the root element, or when a finger leaves contact with the device glass after having made contact while within the root element.

This event name can also be accessed via the `pointerify.Constants.EVENT_POINTER_UP` constant.

#### `pointerStop`

Dispatched after the pointer is released (when inertia is disabled), or after the inertial phase of a "swipe" gesture, when the pointer comes to a complete stop as inertia is depleted due to friction (when inertia is enabled).

This event name can also be accessed via the `pointerify.Constants.EVENT_POINTER_STOP` constant.

#### `pointerInspect`

Dispatched when the mouse moves across the root element without any buttons depressed. Similar to a "hover" event.

This event name can also be accessed via the `pointerify.Constants.EVENT_POINTER_INSPECT` constant.

#### `pointerTap`

Dispatched when the primary mouse button is depressed and immediately released without any lateral movement taking place, or when a finger makes contact with the device glass and then leaves contact without any lateral movement taking place.

This event can be used as a substitute for `click` events in gesture-enabled UI where a swipe might cause unintended click events to be dispatched.

This event name can also be accessed via the `pointerify.Constants.EVENT_POINTER_TAP` constant.

#### `pointerDoubleTap`

Dispatched when a second tap event (see above) occurs within 500ms of the first one.

This event name can also be accessed via the `pointerify.Constants.EVENT_POINTER_DOUBLE_TAP` constant.

#### `virtualPointerCreate`

Dispatched when two fingers come into contact with the device glass. A "virtual pointer" is created at the exact midpoint of the two touch points and forms the origin of any resulting "pinch" gestures.

This event name can also be accessed via the `pointerify.Constants.EVENT_VIRTUAL_POINTER_CREATE` constant.

#### `virtualPointerMove`

Dispatched when a virtual pointer moves in response either of its two physical touch points being dragged. The virtual pointer equivalent of `pointerDrag`.

This event name can also be accessed via the `pointerify.Constants.EVENT_VIRTUAL_POINTER_MOVE` constant.

#### `virtualPointPinch`

Dispatched when a virtual pointer's two physical touch points converge or diverge from the virtual pointer midpoint, forming a "pinch" gesture.

This event name can also be accessed via the `pointerify.Constants.EVENT_VIRTUAL_POINTER_PINCH` constant.

#### `virtualPointerDestroy`

Dispatched when a virtual pointer is destroyed in response to the termination of either one of its physical touch points (either due to a pointer release, or the depletion of inertia).

This event name can also be accessed via the `pointerify.Constants.EVENT_VIRTUAL_POINTER_DESTROY` constant.

---
*&copy; 2017 Patrick Kunka / KunkaLabs Ltd*
