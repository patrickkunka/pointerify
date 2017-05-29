# DragsterJS

A unified events-based API for mouse and multi-touch with built-in geometry and physics.

Dragster provides a simple, common set of intuitive DOM events for dealing with pointer interactions across mouse and touch platforms. As well as abstracting away the idiosyncrasies of the underlying mouse/touch events into one robust API, Dragster also provides rich geometry data – in the form of pointer "state" objects – which include:

- Element-centric X/Y positioning (as percentage-friendly multipliers)
- X/Y deltas (as px and percentage-friendly multipliers)
- X/Y velocities (in px/f)
- X/Y directions (left, right, up, down)
- Pinch distance and direction (for multi-touch "virtual" pointers)

Dragster also features a lightweight, built-in physics engine to simulate inertia. This means that with inertia enabled, Dragster will continue to dispatch "drag" events along the appropriate vector, after the mouse or touch pointer has been released, and until the specified friction coefficient has reduced the velocity to 0.

All of Dragster's features are designed to reduce the amount of repetitive integration code we have to write when building cross-platform swipe, flick, tap and pinch gesture-based UI, and can be used to rapidly develop UI such as carousels, sliders, image galleries, and media timeline/volume controls.

### Contents
- [Installation](#installation)
- [Instantiation](#instantiation)
- [Events](#events)

## Installation

Firstly, install the package using your package manager of choice.

```
npm install dragster-js --save-dev
```

You may then import the dragster factory function into your project's modules.

```js
import dragster from 'dragster-js';
```

You may also load Dragster via a `<script>` tag, and the `dragster` factory function will be added to the global namespace.

```html
        ...
        <script src="/path/to/dragster.js"></script>
    </body>
</html>
```

## Instantiation

The `dragster` factory function then can be used to create a discrete dragster instance on a provided "root" element.

```js
const drg = dragster(input);
```

A reference to the dragster is returned and can be used to destroy the instance (and unbind its event handlers) later on.

#### Dragster "Root" Elements

The element on which the dragster is instantiated will be used to determine all geometry data contained in the events dispatched by the dragster.

For example, if the root element is `500px` wide and a user performs a mouse down at `50px` from its left edge, the `multiplierX` property in the resulting `PointerState` would be `0.1`, meaning the event ocurred at 10% of the element's width.

## Events

Each dragster instance dispatches the following DOM events from the ("root") element on which it is instantiated on. Each event contains a reference to a `PointerState` object via the event `detail` property, containing various geometry data points.

#### `dragsterpointerdown`

Dispatched when the primary mouse button is depressed, or when a finger makes contact with the device glass.

This event name can also be accessed via the `dragster.Constants.EVENT_POINTER_DOWN` constant.

#### `dragsterpointerdrag`

Dispatched when the mouse is moved while its primary button is depressed, or when a finger is moved across the device screen while in contact with the glass.

When `physics.inertia` is enabled, drag events will continue to be dispatched after the pointer is released, for an amount of time determined by the drag velocity at the time of release, and the specified `physics.friction` value.

This event name can also be accessed via the `dragster.Constants.EVENT_POINTER_DRAG` constant.

#### `dragsterpointerup`

Dispatched when the primary mouse button is released after being depressed while within the root element, or when a finger leaves contact with the device glass after having made contact while within the root element.

This event name can also be accessed via the `dragster.Constants.EVENT_POINTER_UP` constant.

#### `dragsterpointerstop`

Dispatched after the pointer is released (when inertia is disabled), or after the inertial phase of a "swipe" gesture, when the pointer comes to a complete stop as inertia is depleted due to friction (when inertia is enabled).

This event name can also be accessed via the `dragster.Constants.EVENT_POINTER_STOP` constant.

#### `dragsterpointerinspect`

Dispatched when the mouse moves across the root element without any buttons depressed. Similar to a "hover" event.

This event name can also be accessed via the `dragster.Constants.EVENT_POINTER_INSPECT` constant.

#### `dragsterpointertap`

Dispatched when the primary mouse button is depressed and immediately released without any lateral movement taking place, or when a finger makes contact with the device glass and then leaves contact without any lateral movement taking place.

This event can be used as a substitute for `click` events in gesture-enabled UI where a swipe might cause unintended click events to be dispatched.

This event name can also be accessed via the `dragster.Constants.EVENT_POINTER_TAP` constant.

#### `dragstervirtualpointerdown`

Dispatched when two fingers come into contact with the device glass. A "virtual pointer" is created at the exact midpoint of the two touch points and forms the origin of any resulting "pinch" gestures.

This event name can also be accessed via the `dragster.Constants.EVENT_VIRTUAL_POINTER_DOWN` constant.

#### `dragstervirtualpointerdrag`

See above. The virtual pointer equivalent of `dragsterpointermove`.

This event name can also be accessed via the `dragster.Constants.EVENT_VIRTUAL_POINTER_DRAG` constant.

#### `dragstervirtualpointpinch`

Dispatched when two fingers that are both in contact with the device glass converge or diverge from a midpoint, forming a "pinch" gesture.

This event name can also be accessed via the `dragster.Constants.EVENT_VIRTUAL_POINTER_PINCH` constant.

#### `dragstervirtualpointerstop`

See above. The virtual pointer equivalent of `dragsterpointerstop`. Dispatched when the either one of the two physical touch points is stopped (either due to a pointer release, or the depletion of inertia).

This event name can also be accessed via the `dragster.Constants.EVENT_POINTER_STOP` constant.

---
*&copy; 2017 Patrick Kunka / KunkaLabs Ltd*
