var host = window.location.origin;

function loadStandingsAPI(season) {
    const url = `https://api-football-v1.p.rapidapi.com/v3/standings?season=${season}&league=39`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4a22194a81msh0f5b0d07d8e2f6cp198988jsnb1716b80fe43',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };
    return (fetch(url, options).then((res) => res.json()));
}

function loadUpcomingGames(season) {
    const url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=39&season=${season}&next=10`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4a22194a81msh0f5b0d07d8e2f6cp198988jsnb1716b80fe43',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };
    return (fetch(url, options).then((res) => res.json()));
}

async function getHomeData() {
    console.log("Viewing API Data");

    //Standings
    const currentStandingsAPI = await loadStandingsAPI("2023");
    const currentStandings = currentStandingsAPI["response"][0]["league"]["standings"][0]

    //Homepage Table
    const table = document.getElementById('homeTable')

    for (let i = 0; i < 5; i++) {
        const data = currentStandings[i]
        const row = document.createElement('tr')

        if (data["rank"] == `${parseInt(i) + 1}`) {
            const cell1 = document.createElement('td')
            cell1.innerHTML = `${i + 1}.`
            const cell2 = document.createElement('td')
            cell2.innerHTML = data["team"]["name"]
            const cell3 = document.createElement('td')
            cell3.innerHTML = data["all"]["played"]
            const cell4 = document.createElement('td')
            cell4.innerHTML = data["all"]["win"]
            const cell5 = document.createElement('td')
            cell5.innerHTML = data["all"]["lose"]
            const cell6 = document.createElement('td')
            cell6.innerHTML = data["points"]
            const cell7 = document.createElement('td')
            cell7.innerHTML = data["goalsDiff"]

            row.appendChild(cell1)
            row.appendChild(cell2)
            row.appendChild(cell3)
            row.appendChild(cell4)
            row.appendChild(cell5)
            row.appendChild(cell6)
            row.appendChild(cell7)
            table.appendChild(row)
        }
    }

    //Upcoming Games (Home Page)
    const upcomingGamesAPI = await loadUpcomingGames("2023")
    const upcomingGames = upcomingGamesAPI["response"]

    const lst = document.getElementById('upcomingGamesList')

    for (let i = 0; i < 10; i++) {
        const newFixture = document.createElement('li')
        newFixture.innerHTML = `${upcomingGames[i]["teams"]["home"]["name"]} vs. ${upcomingGames[i]["teams"]["away"]["name"]} | ${upcomingGames[i]["fixture"]["date"]}`
        lst.appendChild(newFixture)
    }

}

async function getRankingsData() {
    //Rankings Page Table
    const currentStandingsAPI = await loadStandingsAPI("2023");
    const currentStandings = currentStandingsAPI["response"][0]["league"]["standings"][0]

    const rankingsTable = document.getElementById('rankingsTable')

    for (i in currentStandings) {
        const data = currentStandings[i]
        const row = document.createElement('tr')

        const cell1 = document.createElement('td')
        cell1.innerHTML = `${parseInt(i) + 1}.`
        const cell2 = document.createElement('td')
        cell2.innerHTML = `<img src=\"${data["team"]["logo"]}\" width=\"40px\" height=\"40px\">`;
        const cell3 = document.createElement('td')
        cell3.innerHTML = data["team"]["name"]
        const cell4 = document.createElement('td')
        cell4.innerHTML = data["all"]["played"]
        const cell5 = document.createElement('td')
        cell5.innerHTML = data["all"]["win"]
        const cell6 = document.createElement('td')
        cell6.innerHTML = data["all"]["lose"]
        const cell7 = document.createElement('td')
        cell7.innerHTML = data["all"]["draw"]
        const cell8 = document.createElement('td')
        cell8.innerHTML = data["points"]
        const cell9 = document.createElement('td')
        cell9.innerHTML = data["goalsDiff"]

        row.appendChild(cell1)
        row.appendChild(cell2)
        row.appendChild(cell3)
        row.appendChild(cell4)
        row.appendChild(cell5)
        row.appendChild(cell6)
        row.appendChild(cell7)
        row.appendChild(cell8)
        row.appendChild(cell9)
        rankingsTable.appendChild(row)
    }
    console.log(currentStandings)
}