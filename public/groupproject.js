var host = window.location.origin;

function loadAPI() {
    const url = 'https://api-football-v1.p.rapidapi.com/v3/standings?season=2020&league=39';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4a22194a81msh0f5b0d07d8e2f6cp198988jsnb1716b80fe43',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };
    
    return(fetch(url, options).then((res) => res.json()));
}

async function getData() {
    console.log("Viewing API Data");
    const leagueAPI = await loadAPI();

    for (let i = 0; i < 5; i++) {
        console.log(leagueAPI["response"][0]["league"]["standings"][0][i])
    }
    console.log(leagueAPI["response"][0]["league"]["standings"][0])
}

window.onload = getData;