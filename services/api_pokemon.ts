const baseUrl = "https://pokeapi.co/api/v2";
const options = {
    method : "GET"
}

export const fetchData = async(url: string, id: string, limit: string) => {
    // console.log(`apiPokemon.fetchData - ${baseUrl}${url}${id}${limit}`);
    const response = await fetch(`${baseUrl}${url}${id}${limit}`, options);
    const data = await response.json();
    return data;
}