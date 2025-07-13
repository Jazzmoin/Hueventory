<script lang="ts">
    import type {Colour} from "../utils/loadColours";

    let {colour} = $props();
    let colourInfo: Colour = colour;

    let colourHex = colourInfo.colour;
    let r = parseInt(colourHex.slice(1,3), 16);
    let g = parseInt(colourHex.slice(3,5), 16);
    let b = parseInt(colourHex.slice(5,7), 16);

    let max_v = Math.max(r, g, b)
    let min_v = Math.min(r, g, b)

    let average = (max_v + min_v) / 2;
    let textColour = "White"

    if (average >= 128) {
        textColour = "#4d4d4d"
    }

</script>

<style>
    .swatch {
        display: flex;
        align-items: center;
    }

    .box {
        width: 10em;
        height: 10em;
        /*background-color: var(--colour);*/
        border-radius: 4px;
    }

    .info {
        font-family: sans-serif;
        text-align: left;
        padding: 0.5em;
        /*color: ;*/
    }
</style>

<div class="swatch" style="background-color: {colourInfo.colour}; color: {textColour}">
    <div class="box">
        <div class="info">
            <div>{colourInfo.name}</div>
            <div>{colourInfo.code}</div>
            <div>{colourInfo.colour}</div>
        </div>
    </div>
</div>