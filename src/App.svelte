<!-- Todo: -->
<!--    - fun chars to display colours owned and colour percentage of colour categories owned -->
<!--    - fix colour of text on some of the swatches -->
<!--    - add other pages for different brands? -->
<!--    - colour opactity is lowered and a tick appears in the bottom right for owned colours -->

<script lang="ts">
  import ColourSwatch from "./lib/components/ColourSwatch.svelte";
  import {onMount} from "svelte";
  import { colourInfo, loadColours } from './lib/utils/loadColours';

  onMount(() => {
      loadColours().catch(e => console.error('Failed to load colours', e));
  });
</script>

<main class="main">
    <div class="column" style="flex-grow:2">
        <div class="swatch-container">
            {#each $colourInfo as colour}
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
