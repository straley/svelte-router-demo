<script lang="ts">
  import { onDestroy, onMount, setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import { exec, match, parse } from "matchit" 
  import type { AddPath, RoutePath } from "../../util/router"

  const route = writable({})
  const paths = writable([])
  
  let _paths: RoutePath[] = []

  const unsubscribe = paths.subscribe(__paths => {
    _paths = __paths
  })

  const addPath: AddPath = (routePath: RoutePath)=>{
    _paths.push(routePath)
    paths.set(_paths)
  }

  function showPath() {
    const routes = _paths.map(routePath => parse(routePath.path))
    const hash = location.hash || "#/"
    const matches = match(hash, routes)
    if (!matches || matches.length === 0) {
      return
    }
    const pattern = matches[0].old
    const params = exec(location.hash, matches);

    route.set({
      pattern,
      params
    })

  }

  onMount(() => {
    window.addEventListener('hashchange', showPath, false)
    showPath()
  })

  onDestroy(() => {
    window.removeEventListener('hashchange', showPath, false)
    unsubscribe()
  })

  setContext("addPath", addPath)
  setContext("route", route)
  setContext("paths", paths)
</script>
<slot/>