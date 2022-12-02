
# Envoyager Intents

Envoyager is an experiment in designing the Composable Web. Content addressable components can be
rendered together, but they also need a way to communicate with one another in predictable,
declarative ways that enable composed actions and RPC that maintains the guarantees that loading
a single component provides.

Intents are meant to support that. They are inspired by previous work in
[Web Intents](https://www.w3.org/TR/web-intents/), which itself learnt from Android Intents.

## Invoking Intents

Intents are invoked with `const intent = envoyager.intent(action, type, data)`. The `action` is a verb, like
`edit`, `pick`, or `create`. The type is a form of media type, though not bound to IANA media
types but rather winnowing down what the action applies to, eg. `create envoyager/feed`. The
data is any supplemental data that can usefully be provided to the intent handler.

When an intent is invoked, the user is presented with a modal to pick which intent they wish to
use. (We can refine that later, eg. with a `<button type="intent">` addition). When the user
chooses the intent they want, it gets rendered and its `window` object has an `intent` event
dispatched to it with the `action`, `type`, `data` provided but also a `responseChannel` (used
to signal success or failure, some limited things for now — it talks to the `intent` object
returned from `envoyager.intent()`) as well as a `wican` object which is a form of UCAN token
(except Web Intents Controlled Authorization Networks — gettit?). That `wican` can be used to
carry out actions like signing an item as the initiator.

## Declaring Intent Handlers

Any item can have an `intents` field which is an object looking like this:

```js
{
  name: 'Photo Album',
  icon: {
    $type: 'Image',
    mediaType: 'image/png',
    src: CID(…),
  },
  actions: {
    pick: {
      name: 'Pick Image',
      types: ['image/*'],
      path: '/picker.html',
      icon: {
          $type: 'Image',
          mediaType: 'image/png',
          src: CID(…),
      },
    },
  }
}
```

When an item is _installed_, its intents become registered for use with Envoyager (correspondingly,
uninstalled). When looking for intents, Envoyager looks for some that support the action and type,
and present them using the applicable name and icon (falling back to parent ones). When loaded, the
path (if given) is what gets loaded.

Note that some intents are internal.
