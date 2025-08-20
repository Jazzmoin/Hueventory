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

    let showStats = $state(false);
</script>

<main class="main">
    <div class="column" style="flex-grow: 4;">
        <header class="topbar">
            <h1>Hueventory</h1>
        </header>
        <button class="menu" onclick={() => showStats = !showStats}>
            ☰
        </button>

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

    <div class="column stats-sidebar" style="flex-grow: 1" class:open={showStats}>
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
        width: 100%;
    }

    .swatch-group {

        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .swatch-container {
        display: block;
        overflow: auto;
        scrollbar-width: none;
        width: 100%;
        align-items: start;
        box-sizing: border-box;
    }

    .column {
        flex-basis: 0;
        flex-shrink: 1;
        /*flex: 1 1 0;*/
        min-width: 0;
        display: flex;
        flex-direction: column;
        min-height: 0;
    }

    .colour-section {
        margin-bottom: 2rem;
    }

    h2 {
        position: sticky;
        background-color: #242424;
        top: 0;
        z-index: 10;
    }

    .topbar h1 {
        margin: 0;
        font-size: 2rem;
        color: white;
        position: sticky;
        padding-top: 0.5em;
        z-index: 5;
    }

    .menu {
        display: none;
        background: none;
        font-size: 1.8rem;
        cursor: pointer;
        color: white;
    }

    .stats-sidebar .stats {
        background-color: #242424;
        padding: 4rem 2rem 2rem;
        box-sizing: border-box;
    }

    @media (max-width: 768px) {
        .swatch-group {
            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
            overflow: clip;
        }

        .menu {
            display: block;
            position: fixed;
            top: 1rem;
            right: 1rem;
            z-index: 100;
            background: none;
            border: none;
            font-size: 1.8rem;
            color: white;
            cursor: pointer;
        }

        .stats-sidebar {
            position: fixed;
            top: 0;
            right: 0;
            height: 100%;
            width: 250px;
            background: #242424;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            z-index: 20;
            box-shadow: -2px 0 5px rgba(0,0,0,0.5);
            padding: 0.2rem 1rem 1rem;
            box-sizing: border-box;
            overflow-y: auto;
        }

        .stats-sidebar.open {
            transform: translateX(0);
        }
    }
</style>