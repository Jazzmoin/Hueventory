import { writable } from 'svelte/store';

export const colourInfo = writable([]);

export async function loadColours() {
    const res = await fetch('/colours.json');
    if (!res.ok) throw new Error('Failed to load colours');

    const raw = await res.json();

    const deduplicated = Array.from(new Map(raw.map(c => [c.code, c])).values());

    deduplicated.sort((a, b) => Number(a.code) - Number(b.code));

    colourInfo.set(deduplicated);

    return deduplicated;
}