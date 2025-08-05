<!-- Todo: -->
<!--    - fun charts to display colours owned and colour percentage of colour categories owned -->
<!--    - add other pages for different brands? -->
<!--    - colour opacity is lowered and a tick appears in the bottom right for owned colours -->

<script lang="ts">
    import ColourSwatch from "./lib/components/ColourSwatch.svelte";
    import {onMount} from "svelte";
    import {colourInfo, loadColours} from './lib/utils/loadColours.svelte'
    import {ownedColours} from './lib/utils/ownedColours.svelte';

    onMount(() => {
        loadColours().catch(e => console.error('Failed to load colours', e));
    });

    const categories = $derived(Array.from(new Set(colourInfo.data.map(c => c.category))));
    const totalColours = $derived(colourInfo.data.length);
    const totalOwned = $derived(colourInfo.data.filter(c => ownedColours.data.has(c.code)).length);

    const ownedPercentage = $derived(totalColours ? (totalOwned / totalColours) * 100 : 0);

    const categoryStats = $derived.by(() => {
        return categories.map(category => {
            const coloursInCategory = colourInfo.data.filter(
                c => c.category === category
            ).length;

            const ownedInCategory = colourInfo.data.filter(
                c => c.category === category && ownedColours.data.has(c.code)
            ).length;

            return {
                category,
                owned: ownedInCategory,
                total: coloursInCategory,
                percent: coloursInCategory
                    ? (ownedInCategory / coloursInCategory) * 100
                    : 0
            };
        });
    });

    const commit: string = import.meta.env.VITE_PUBLIC_COMMIT_HASH;
</script>

<main class="main">
    <div class="column" style="flex-grow:2">
        <div class="swatch-container">
            {#each categories as category}
                <section class="colour-section">
                    <h2>{category}</h2>
                    <div class="swatch-group">
                        {#each colourInfo.data.filter(c => c.category === category) as colour}
                            <ColourSwatch colour={colour} isOwned={ownedColours.data.has(colour.code)}/>
                        {/each}
                    </div>
                </section>
            {/each}
        </div>
    </div>
    <div class="column" style="flex-grow:0.5">
        <div class="stats">
            <div>
                <h2>
                    Total Owned: {totalOwned}/{totalColours}
                    ({ownedPercentage.toFixed(1)}%)
                </h2>
                {#each categoryStats as stat}
                    <p>
                        {stat.category}: {stat.owned} / {stat.total}
                        ({stat.percent.toFixed(1)}%)
                    </p>
                {/each}
            </div>
        </div>
        <span style="position: fixed; bottom: 1em; right: 1em;">
                {#if commit}
                    Commit <a href="https://github.com/Jazzmoin/Hueventory/commit/{commit}">{commit.slice(0, 8)}</a>
                {:else}
                    Running in dev
                {/if}
            </span>
    </div>
</main>

<style>
    .main {
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
        height: 100vh;
    }

    .swatch-group {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin: 5px;
    }

    .swatch-container {
        display: block;
        gap: 0.5em;
        overflow: auto;
        scrollbar-width: none;
        padding: 0 1rem 10rem 0;
    }

    :global(.column) {
        flex: 1 1 0;
        min-width: 0;
        display: flex;
        flex-direction: column;
        min-height: 0;
    }

    .colour-section {
        margin-bottom: 2rem;
    }

    h1 {
        text-align: left;
        padding: 0;
    }

    h2 {
        position: sticky;
        background-color: #242424;
        top: 0;
        /*padding: 0.5rem 0;*/
        z-index: 10;
    }

    p {
        text-align: left;
    }
</style>