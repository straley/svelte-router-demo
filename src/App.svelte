<script lang="ts">
	import Route from "./components/Router/Route.svelte"
	import Router from "./components/Router/Router.svelte"
	import Link from "./components/Router/Link.svelte"
	import Page1 from "./routes/Page1.svelte"
	import Page2 from "./routes/Page2.svelte"
	import Page3 from "./routes/Page3.svelte"
	import Error404 from "./routes/Error404.svelte"
</script>
<main>
	<Router>
		<div class="nav">
			<Link name="page-1" inline>Page 1</Link> | <Link name="page-2" inline>Page 2</Link> | <Link name="page-3" inline>Page 3</Link>
		</div>

		<Route name="page-1"><Page1/></Route>
		<Route path="#/two" name="page-2"><Page2/></Route>
		<Route path="#/three" name="page-3"><Page3/></Route>
		<Route path="*" name="404"><Error404/></Route>
	</Router>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	:global(.link) {
		text-decoration: underline;
		color: blue;
	}
</style>