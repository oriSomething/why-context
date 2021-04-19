# Why context

This repository contains some case studies for why context (in React sense) is useful.
`React.createContext()` can be achived on Vue by `provide()` and `inject()` hooks, it can also emulated in old versions of Ember (`2.x`) via `Component#parentView`, but sadly not in Ember `3.x` with `GlimmerComponent`.

I’ve created this repository to show why `React.createContext()` is not just a dumb dependecy injection mechanism and using providers through the tree is actually useful for lots of cases. (And also to show why Ember should re-introduce the options to use this pattern).

## Good reasons to use context

1. Keyboard management
2. Theming
3. Dynamic router
4. Deeplinks
5. Isolate store state for drafts
6. Emulating CSS’s cascade for alternative styling system
