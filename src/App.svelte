<script lang="ts">
  import { colours } from './lib/stores/colours';
  import { loadColours } from './lib/loadColours';
  import {onMount} from "svelte";

  onMount(async () => {
      try {
          const data = await loadColours();
          colours.set(data);
      } catch(e) {
          console.error('Error loading colours:', e);
      }
  });
</script>

<main>
  <div>
      <ul>
          {#each $colours as colour}
              <li style="color: {colour.colour}">
                  {colour.name} ({colour.code}) - {colour.category}
              </li>
          {/each}
      </ul>
  </div>

</main>

<style>

</style>
