<script lang="ts">
    export let colour: {
        name: string;
        code: string;
        colour: string;
        category: string;
    }
</script>

<style>
    .swatch {
        display: flex;
        align-items: center;
        margin: 0.25em 0;
    }

    .box {
        width: 10em;
        height: 10em;
        background-color: var(--colour);
        margin-right: 0.5em;
        border-radius: 4px;
    }

    .info {
        font-family: sans-serif;
        text-align: left;
        padding: 0.5em;
    }
</style>


<div class="swatch" style="--colour: {colour.colour}">
    <div class="box">
        <div class="info">
            <div>{colour.name}</div>
            <div>{colour.code}</div>
            <div>{colour.colour}</div>
        </div>
    </div>
</div>