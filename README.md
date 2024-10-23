# `@elsoul/fresh-atom`

`@elsoul/fresh-atom` is a lightweight global state management library inspired
by Recoil and Jotai, specifically designed for use in
[Deno's Fresh framework](https://fresh.deno.dev/).

Leveraging Preact's `signal` under the hood, it enables efficient state updates
and reactivity, ideal for edge-native applications.

## Features

- **Lightweight**: Minimal API surface with `atom` and `useAtom`, similar to
  Jotai.
- **Preact Integration**: Powered by Preact's `signal` for performance-optimized
  reactivity.
- **Edge-Native**: Designed to run on Deno, providing TypeScript-first
  development with modern performance standards.

## Installation

To install and use `@elsoul/fresh-atom` in your project, you can import it
directly from the JavaScript Standard Registry (JSR) or from the Deno land:

### Using JSR

```ts
import { atom, useAtom } from 'jsr:@elsoul/fresh-atom'
```

### Using Deno Land

```ts
import { atom, useAtom } from 'https://deno.land/x/fresh_atom/mod.ts'
```

## Usage

`@elsoul/fresh-atom` allows you to create shared state in your Fresh application
with minimal effort. Here's how you can create and use atoms.

### Creating an Atom

Atoms hold a single piece of state. You can define an atom like this:

```ts
import { atom } from '@elsoul/fresh-atom'

const countAtom = atom(0) // Create an atom with an initial value of 0
```

### Using an Atom in a Component

To read and modify the atom's value inside a component, you can use `useAtom`:

```tsx
import { useAtom } from '@elsoul/fresh-atom'

export default function Counter() {
  const [count, setCount] = useAtom(countAtom)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
```

The state will automatically update whenever the atom's value changes, ensuring
efficient re-rendering.

### Advanced: Async Atom

You can also define an asynchronous atom that resolves after some operation:

```ts
import { atom } from '@elsoul/fresh-atom'

const asyncAtom = atom(async () => {
  const data = await fetchData()
  return data
})
```

You can then use `useAtom` in the same way to handle asynchronous state.

## Contributing

Bug reports and pull requests are welcome on GitHub at
https://github.com/elsoul/fresh-atom This project is intended to be a safe,
welcoming space for collaboration, and contributors are expected to adhere to
the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The package is available as open source under the terms of the
[Apache-2.0 License](https://www.apache.org/licenses/LICENSE-2.0).

## Code of Conduct

Everyone interacting in the SKEET project’s codebases, issue trackers, chat
rooms and mailing lists is expected to follow the
[code of conduct](https://github.com/elsoul/skeet/blob/master/CODE_OF_CONDUCT.md).
