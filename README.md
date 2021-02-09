# svelte router demo

This is an example of using a hash-based router.  It's built on [sveltejs/component-template](https://github.com/sveltejs/component-template).

---

## Get started

Install the dependencies...

```bash
npm install
```

...then start:

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). 

## The key components

You'll find most of the routing code in the `src/components/Router`.  Typescript types are in `src/util/router.ts`.

There is a basic setup in `src/App.svelte`:

```svelte
	<Router>
		<Route name="page-1"><Page1/></Route>
		<Route path="#/two" name="page-2"><Page2/></Route>
		<Route path="#/three" name="page-3"><Page3/></Route>
		<Route path="*" name="404"><Error404/></Route>
	</Router>
```

The individual pages are stored in `src/routes`.

## Non-hash routing?

With a few tweaks, this could be extended to work with traditional routing.  Just make sure that you change `rollup.config.js` to have:

```js
"start": "sirv public --single"
```
