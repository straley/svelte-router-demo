<script lang="ts">
  import { getContext, onDestroy } from 'svelte'
  import type { Writable } from 'svelte/types/runtime/store'
  import type { AddPath, RouteMatch } from "../../util/router"

  export let path = "#/"
  export let name = ""
  
  let visible = false
  let _visible = false

  const route = getContext("route") as Writable<RouteMatch>
  const unsubscribe = route.subscribe(_route => {
    _visible = _route.pattern === path
  })

  const addPath = getContext("addPath") as AddPath
  addPath({path, name})

  onDestroy(()=>{
    unsubscribe()
  })

  $:visible = _visible
</script>
{#if visible}
<slot/>
{/if}