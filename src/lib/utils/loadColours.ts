import {type Writable, writable} from 'svelte/store';

export const colourInfo: Writable<Colour[]> = writable([]);

export interface Colour {
    name: string;
    code: string;
    colour: string;
    category: string;
}

export async function loadColours() {
    const res = await fetch('colours.json');
    if (!res.ok) throw new Error('Failed to load colours');

    const raw = await res.json() as Colour[];

    const deduplicated = Array.from(new Map(raw.map(c => [c.code, c])).values());

    deduplicated.sort((a, b) => Number(a.code) - Number(b.code));

    colourInfo.set(deduplicated);

    return deduplicated;
}