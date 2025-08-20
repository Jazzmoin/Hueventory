<script lang="ts">
    import type {Colour} from "../utils/loadColours.svelte";
    import {toggleOwned} from "../utils/ownedColours.svelte";

    let {colour, isOwned}: {colour: Colour, isOwned: boolean} = $props();

    let colourHex = colour.colour;

    let r = parseInt(colourHex.slice(1,3), 16);
    let g = parseInt(colourHex.slice(3,5), 16);
    let b = parseInt(colourHex.slice(5,7), 16);

    let max_v = Math.max(r, g, b)
    let min_v = Math.min(r, g, b)
    let average = (max_v + min_v) / 2;

    const textColour = average >= 128 ? "#4d4d4d" : "white";
</script>

<style>
    .swatch {
        aspect-ratio: 1 / 1;
        display: grid;
        /*place-items: center;*/
        border-radius: 4px;
        cursor: pointer;
        transition: 0.2s ease all;

        min-width: 0;
        min-height: 0;
        overflow: hidden;
        box-sizing: border-box;
    }

    .swatch:hover {
        box-shadow: 0 0 5px 2px rgba(255, 255, 255, 0.68) !important;
    }

    .info {
        font-family: sans-serif;
        text-align: left;
        padding: 0.5em;
        font-weight: bold;
    }
</style>

<div onclick={() => toggleOwned(colour.code)}
     class="swatch"
     style="background-color: {colour.colour}; opacity: {isOwned ? 0.2 : 1}; color: {textColour}">
    <div class="info">
        <div>{colour.name}</div>
        <div>{colour.code}</div>
        <div>{colour.colour}</div>
    </div>
</div>