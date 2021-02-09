<script lang="ts">
  import { getContext, onDestroy } from 'svelte'
  import type { Writable } from 'svelte/types/runtime/store'
  import type { RouteMatch, RoutePath } from "../../util/router"

  export let name 
  export let inline = false
  export let params = {}

  const paths = getContext("paths") as Writable<RoutePath[]>
  const route = getContext("route") as Writable<RouteMatch>
  
  let _paths
  let _selected = false
  let _route 
  // let unsubscribeRoute = () => {}

  const unsubscribePaths = paths.subscribe(__paths => {
    _paths = __paths
  })

  const unsubscribeRoute = route.subscribe(__route => {
    _route = __route
  })

  onDestroy(()=>{
    unsubscribePaths()
    unsubscribeRoute()
  })

  $:path = _paths.find(path => path.name === name)

  $:url = path ? `/${path.path}` : "/"
  $:if (url) {
    for (const param of Object.keys(params)) {
      const regex = new RegExp(`:${param}(\/|$)`)
      url = url.replace(regex, params[param])
    }
  }

  $:_selected = (path && path.path === _route.pattern && JSON.stringify(params) === JSON.stringify(_route.params))
</script>
<div class="link noselect {_selected ? "selected" : ""}" on:click={() => window.location.href = url} style={`display: ${inline ? "inline-block" : "default"};`}>
  <slot/>
</div>
<style>
  .link {
    cursor: pointer;
  }
</style>