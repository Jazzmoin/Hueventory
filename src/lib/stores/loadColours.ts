export async function loadColours() {
    const res = await fetch('/colours.json');
    if (!res.ok) throw new Error('Failed to load colours');
    const data = await res.json();

    data.sort((a, b) => Number(a.code) - Number(b.code));

    return data;
}