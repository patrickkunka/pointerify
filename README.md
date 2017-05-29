# Dragster

A unified events-based API for mouse and multi-touch with built-in geometry and physics.

Dragster provides a simple, common set of intuitive DOM events for dealing with pointer interactions across mouse and touch platforms. As well as abstracting away the idiosyncrasies of the underlying mouse/touch events into one robust API, Dragster also provides rich geometry data – in the form of pointer "state" objects – which include:

- Element-centric X/Y positioning (as percentage-friendly multipliers)
- X/Y deltas (as px and percentage-friendly multipliers)
- X/Y velocities (in px/f)
- X/Y directions (left, right, up, down)
- Pinch distance and direction (for multi-touch "virtual" pointers)

Dragster also features a lightweight, built-in physics engine to simulate inertia. This means that with inertia enabled, Dragster will continue to dispatch "drag" events along the appropriate vector, after the mouse or touch pointer has been released, and until the specified friction coefficient has reduced the velocity to 0.

All of Dragster's features are designed to reduce the amount of repetitive integration code we have to write when building cross-platform swipe, flick, tap and pinch gesture-based UI, and can be used to rapidly develop UI such as carousels, sliders, image galleries, and media timeline/volume controls.

## Events

`dragsterpointerdown`

Dispatched from the dragster root element when the primary mouse button is depressed, or when a finger makes contact with the device glass.

`dragsterpointerdrag`

Dispatched from the dragster root element when the mouse is moved while its primary button is depressed, or when a finger is moved across the device screen while in contact with the glass.

When `physics.intertia` is enabled, drag events will continue to be dispatched after the pointer is released, for an amount of time determined by the drag velocity at the time of release, and the specified `physics.friction` value.

`dragsterpointerup`

Dispatched from the dragster root element when the primary mouse button is released after being depressed while within the root element, or when a finger leaves contact with the device glass after having made contact while within the root element.

`dragsterpointerstop`

Dispatched from the dragster root element after the pointer is released (when inertia is disabled), or after the inertial phase of a "swipe" gesture, when the pointer comes to a complete stop due to friction (when inertia is enabled).

`dragsterpointerinspect`

Dispatched from the dragster root element when the mouse moves across the root element without any buttons depressed. Similar to a "hover" event.

`dragsterpointertap`

Dispatched from the dragster root element when the primary mouse button is depressed and immediately released without any lateral movement in between, or when a finger makes contact with the device glass and then leaves contact without any lateral movement in between.

Should be used as a substitute for `click` events in gesture-enabled UI where a swipe might cause unintended click events to be dispatched.

`dragstervirtualpointerdown`

Dispatched from the dragster root element when two fingers come into contact with the device glass. The "virtual pointer" is created at the exact midpoint of the two fingers and represents the origin of any resulting "pinch" gestures.

`dragstervirtualpointerdrag`

See above. The virtual pointer equivalent of `dragsterpointermove`.

`dragstervirtualpointpinch`

Dispatched form the dragster root element when two fingers that are both in contact with the device glass diverge or converge from a midpoint, forming a "pinch" gesture.

`dragstervirtualpointerstop`

See above. The virtual pointer equivalent of `dragsterpointerstop`.

---
*&copy; 2017 Patrick Kunka / KunkaLabs Ltd*
