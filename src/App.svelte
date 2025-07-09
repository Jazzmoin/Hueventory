<!-- Todo: -->
<!--    - chart to display percentage of colours owned -->
<!--    - fix colour of text on some -->


<script lang="ts">
  import ColourSwatch from "./lib/components/ColourSwatch.svelte";
  import { loadColours } from './lib/stores/loadColours';
  import { colours } from './lib/stores/colours';
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

<main class="main">
    <div class="column" style="flex-grow:1.75">
        <div class="swatch-container">
            {#each $colours as colour}
                <ColourSwatch {colour} />
            {/each}
        </div>
    </div>

    <div class="column" style="flex-grow:0.5">
        <h1>Name</h1>
        <div class="stats">
            <div>
                <h2>Stats</h2>
                <p>Colours Owned: </p>
            </div>
        </div>
    </div>
</main>

<style>
    .main {
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
    }
    .swatch-container {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
    }

    :global(.column) {
        flex: 1 1 0;
        min-width: 0;

        display: flex;
        flex-direction: column;
        min-height: 0;
        gap: var(--box_gap);
    }

    h2 {
        text-align: left;
        padding: 0;
    }

    p {
        text-align: left;
    }
</style>
