export const ownedColours: { data: Set<string> } = $state({
    data: new Set()
});

const json = localStorage.getItem('ownedColours');
if (json) ownedColours.data = new Set(JSON.parse(json));

$effect.root(() => {
    $effect(() => {
        localStorage.setItem('ownedColours', JSON.stringify([...ownedColours.data]));
    });
});

export function toggleOwned(code: string) {
    ownedColours.data = ownedColours.data.has(code)
        ? new Set([...ownedColours.data].filter(c => c !== code))
        : new Set([...ownedColours.data, code]);
}
