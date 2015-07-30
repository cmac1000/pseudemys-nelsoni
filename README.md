# What is this?

An demo web application that gives you the valuable opportunity to schedule turtle deliveries to the moons of Jupiter.

Example running here: [chrismacdonald.pro/pseudemys-nelsoni](http://chrismacdonald.pro/pseudemys-nelsoni/)

# How to run this locally

* install [node](https://nodejs.org/), [npm](https://www.npmjs.com/), and [gulp](http://gulpjs.com/)
* `$ npm install`
* `$ gulp`

(separately)
* `$ node server.js`

* Maybe it works: [localhost:3000](http://localhost:3000)

# Why?

This is a demonstration of one architectural approach to UIs using [React](http://facebook.github.io/react/). Let us call it the "Nelsoni Architecture", named in honor of the proud [Florida Redbelly Turtle](http://srelherp.uga.edu/turtles/psenel.htm).

# Principles

## Application state is a single immutable data structure, that lives as high as possible in the component hierarchy.

We want to be able to make user interfaces that allow the intuitive manipulation of complex data structures. Let's say, for our Nelsoni application, we have the following requirements:

As a user I can:

* create, edit and delete schedule (blocks of deliveries)
* for any schedule, create, edit and delete deliveries, constrained by our available turtle orders.

This suggests a hierarchical data structure:

    Schedule List
      Schedule
        Delivery

And we can express creation/edit/deletion operations as operations on that data structure. To keep the UI consistent, we keep that data structure as a state property of the top-level component (Schedule List), and keep (almost) all the other components stateless.

### Why is global state okay?

The idea of global state gives programmers the willies, [for good reason](http://programmers.stackexchange.com/questions/148108/why-is-global-state-so-evil). Why are we using it here?

Because a UI that aims to stay in sync with a data structure does have one and only one state, and we may as well be explicit about it. Alejandro Gómez wrote a very smart blog post about this, which is [well worth your time](http://dialelo.github.io/application-architecture-with-react-rethinking-flux.html)

### Why immutable structures?

Smart people have written about why immutable structures are a good fit for react:

* https://facebook.github.io/react/docs/advanced-performance.html
* https://open.bekk.no/easier-reasoning-with-unidirectional-dataflow-and-immutable-data
* https://www.youtube.com/watch?v=I7IdS-PbEgI

I'm not that smart, though, and the Nelsoni architecture uses Immutable.js for only one wonderful function: [`Map.setIn()`](https://facebook.github.io/immutable-js/docs/#/Map/setIn) (on which more below)

## Top-level component exposes and passes down an `update()` function

We want to limit the knowledge that our components have about their siblings and parents, for simplicity. We pass data down the chain of child components through React's `props` mechanism, which works like a charm. However, we also need to give child components a way to update themselves. For example, on a `Delivery` component, we need to be able to provide a deletion button, which will kick off some chain of events that leads to our global application state being updated.

We do this with a top-level `update()` function, the beating heart of which is Immutable.js' `setIn()`.

`setIn()` is the soul of simplicity. Let's say we have an immutable map called `data`, corresponding to this javascript object:

    {
      "good-places-to-see-turtles": [
        {
          "name": "Dry Tortugas National Park",
          "location": "Florida"
        },
        {
          "name": "Kuhion Shore",
          "location": "Hawaii"
        },
        {
          "name": "Tiwi Islands",
          "location": "Australia"
        }
      ]
    }

If I call `data.setIn(['good-places-to-see-turtles', 0], {"name": "Tandjung Wakululoron","location": "Indonesia"})`, I get back a new map structure, with my new turtle location swapped in for the former first member of the list. This works arbitrarily deep, which makes it a perfect match for our needs.

## Child components know their own keypath, and use the `update()` function to update global application state

So in the Nelsoni architecture:
  * every child component knows the keypath to its corresponding data in the global state structure.
  * every child component gets the global update function passed in as a `prop`

When a child component wants to change something, it figures out the necessary changes and the keypath to the data, and calls `self.props.update(keypath, value)`. Like butter!

# Are there any clouds in this beautiful utopia?

Yes, in fact. There are a couple of tricky things:

## Stateful children

It's nice to be able to limit state in child components - for 'static' components, like list items reflecting a data structure, this is easy. But, some components need state. Particularly, modals: if we have a modal component to edit or add a delivery, that modal needs to know, at least:

  * whether it is open or closed
  * the values of all its inputs

We could, in theory, keep all that state in the top level as well. I'm not doing that, for now, because it seems weird. So, modals get state, and we have to be careful to clear/reset it properly when we open/close the modal. Not ideal; there is probably a Better Way.

## Globally-derived data needed in child components

Here's an example:

We have six orders for turtles to be sent to Jupiter. We want any add/edit delivery modal that gets opened to only present, as options, orders that are not scheduled for delivery elsewhere on the UI. This is tricky, because to compute that, we need to know:

  * the set of all orders
  * the set of all scheduled orders

A given modal component doesn't know those things - that's top-level data, and we don't pass that stuff down.

This is my solution: calculate this at the top level, pass it down the component hierarchy as props. It works fine, but seems clunky, especially as these cases proliferate (as they presumably will in real applications).

## Data syncing with other components

Our 'global' data is actually scoped to this particular hierarchy of react components. If we have a page, let's say, with two such hierarchies that need to be kept in sync, there's no obvious way to do that.

## The theoretical ease of self-destruction

The global `update` function, while a cheerful member of the team, is potentially destructive. It does no validation of the values or keypaths being passed to it, and will happily accept any call, from anywhere, setting any property in the global data structure to any value. If some poorly-written modal component sets the top-level `schedules` data to an empty array, `update` will let that sail on through.

# What is to be done?

[omniscient.js](http://omniscientjs.github.io/), in theory, solves a lot of these problems more elegantly, using cursors into event-emitting data structures. I gave omniscient a try, and ran into more mysteries than seemed worth solving - it does seem like a good approach, though, and I think we could make it work with a disciplined pattern.
