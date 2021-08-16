export default async function fetchData() {
    const res = await fetch('http://localhost:3333/');
    const data = res.json();
    return data;
}