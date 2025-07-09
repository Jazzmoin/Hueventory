export async function loadColours() {
    const res = await fetch('/colours.json');
    if (!res.ok) throw new Error('Failed to load colours');
    return await res.json();
}