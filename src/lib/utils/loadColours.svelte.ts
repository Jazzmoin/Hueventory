export interface Colour {
    name: string;
    code: string;
    colour: string;
    category: string;
}

export const colourInfo: { data: Colour[] } = $state({
    data: []
});

export async function loadColours() {
    const res = await fetch('colours.json');
    if (!res.ok) throw new Error('Failed to load colours');
    const data: Colour[] = await res.json();
    colourInfo.data = [...new Map(data.map(c => [c.code, c])).values()]
        .sort((a, b) => Number(a.code) - Number(b.code));   // direct assignment triggers reactivity
}
