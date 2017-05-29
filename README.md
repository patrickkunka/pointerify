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

---
*&copy; 2017 Patrick Kunka / KunkaLabs Ltd*
