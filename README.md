# principles

# application state is a single immutable data structure, that lives as high as possible in the component hierarchy.

why immutable?
why is global state okay?
http://programmers.stackexchange.com/questions/148108/why-is-global-state-so-evil
(because we have a strict convention that all state changes go through update function)

# top-level component exposes and passes down an update() function

Application state lives at the top of the component hierarchy
We want our child components to have as little knowledge as possible of other components' data
Components need to be able to expose data-changing UI elements

The answer is another useful thing that immutable.js gets us, the structure.setIn() function. .setIn() takes two arguments, keyPath and value. It returns a new immutable structure, with the new value swapped in for the value at the given keypath.

That's all we need for a global update function - children know their own keypath, so all they have to do is figure out what edits to make, come up with their new state, and call self.props.update(self.props.keyPath, updatedValue)

# child components know their own keypath, and use the update() function to update global application state

Other things

omniscient.js, in theory, solves the same problem more elegantly, using cursors. I gave omniscient a try, and ran into more mysteries than seemed worth solving - it does seem like a good approach, though, and I think we could make it work with a disciplined approach.

Stateful children

It's nice to be able to limit state in child components - for 'static' components, like list items reflecting a data structure, this is easy. But, some components need state.

Modals

Component-level data that depends on global state

Theoretically, this is where data-management architectures like flux come into play - we create some singleton data stores, and components can subscribe to them for updates about global state. The other approach is to calculate these things as low as possible in the hierarchy, and pass them down as props. Maybe tricky to maintain in the long run, definitely easier in the short run

Asynchronous data operations
