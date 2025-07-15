import {writable} from 'svelte/store';

const stored = localStorage.getItem('ownedColours');
export const ownedColours = writable<Set<string>>(
    new Set(stored ? (JSON.parse(stored) as string[]) : [])
);

ownedColours.subscribe(set => {
    localStorage.setItem('ownedColours', JSON.stringify(Array.from(set)));
});

export function toggleOwned(code: string) {
    ownedColours.update(set => {
        const updated = new Set(set);
        updated.has(code) ? updated.delete(code) : updated.add(code);
        return updated;
    });
}