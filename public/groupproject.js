var host = window.location.origin;

//Ranking Tables
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
        cell2.innerHTML = `<img src=\"${data["team"]["logo"]}\" width=\"30px\" height=\"30px\">`;
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

//Match Predictor
function loadHistoricalFixtures(t1, t2) {
    const url = `https://api-football-v1.p.rapidapi.com/v3/fixtures/headtohead?h2h=${t1}-${t2}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4a22194a81msh0f5b0d07d8e2f6cp198988jsnb1716b80fe43',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };
    return (fetch(url, options).then((res) => res.json()));
}

function loadHomeAwayRecords(season, team) {
    const url = `https://api-football-v1.p.rapidapi.com/v3/teams/statistics?league=39&season=${season}&team=${team}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4a22194a81msh0f5b0d07d8e2f6cp198988jsnb1716b80fe43',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };
    return (fetch(url, options).then((res) => res.json()));
}

function loadTeamIDs(season) {
    const url = `https://api-football-v1.p.rapidapi.com/v3/teams?league=39&season=${season}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4a22194a81msh0f5b0d07d8e2f6cp198988jsnb1716b80fe43',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };
    return (fetch(url, options).then((res) => res.json()));
}

function loadFixtures(season) {
    const url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=39&season=${season}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4a22194a81msh0f5b0d07d8e2f6cp198988jsnb1716b80fe43',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };
    return (fetch(url, options).then((res) => res.json()));
}

async function getTeamIDs(name, season) {
    const teamIDsAPI = await loadTeamIDs(season)
    const teamIDs = teamIDsAPI["response"]
    let teamID = 0;
    for (i in teamIDs) {
        if (teamIDs[i]["team"]["name"] == name) {
            teamID = teamIDs[i]["team"]["id"]
        }
    }
    return(teamID)
}

async function getMatchPrediction(season, t1, t2) {
    let prediction_score = 0

    //Standings
    const currentStandingsAPI = await loadStandingsAPI("2023");
    const currentStandings = currentStandingsAPI["response"][0]["league"]["standings"][0]
    let t1rank = 0;
    let t2rank = 0;
    for (i in currentStandings) {
        if (currentStandings[i]["team"]["id"] == t1) {
            t1rank = currentStandings[i]["rank"]
        }
        if (currentStandings[i]["team"]["id"] == t2) {
            t2rank = currentStandings[i]["rank"]
        }
    }
    prediction_score -= ((t1rank - t2rank) / 5)

    //Fixtures
    const fixturesHistoryAPI = await loadHistoricalFixtures(t1, t2)
    const fixturesHistory = fixturesHistoryAPI["response"]
    let t1goals = 0;
    let t2goals = 0;
    for (i in fixturesHistory) {
        let home_id = fixturesHistory[i]["teams"]["home"]["id"]
        let away_id = fixturesHistory[i]["teams"]["away"]["id"]
        if (home_id == t1) {
            t1goals += fixturesHistory[i]["goals"]["home"]
        } else if (away_id == t1) {
            t1goals += fixturesHistory[i]["goals"]["away"]
        } else if (home == t2) {
            t2goals += fixturesHistory[i]["goals"]["home"]
        } else if (away_id == t2) {
            t2goals += fixturesHistory[i]["goals"]["away"]
        }
    }
    prediction_score += ((t1goals - t2goals) / 5)

    //Home Goals/Conceded vs. Away Goals/Conceded
    const t1HomeAwayRecordAPI = await loadHomeAwayRecords(season, t1)
    const t2HomeAwayRecordAPI = await loadHomeAwayRecords(season, t2)
    
    const t1HomeRecord = t1HomeAwayRecordAPI["response"]["goals"]["for"]["average"]["home"] - t1HomeAwayRecordAPI["response"]["goals"]["against"]["average"]["home"]
    const t2AwayRecord = t2HomeAwayRecordAPI["response"]["goals"]["for"]["average"]["away"] - t1HomeAwayRecordAPI["response"]["goals"]["against"]["average"]["away"]

    prediction_score += (t1HomeRecord - t2AwayRecord)

    /* const loadFixturesAPI = await loadFixtures(season)
    const fixtures = loadFixturesAPI["response"]
    
    for (i in fixtures) {
        if (fixtures[i]["teams"]["home"]["id"] == t1 && fixtures[i]["teams"]["away"]["id"] == t2) {
            prediction_score += (t1HomeRecord - t2AwayRecord)
        } else if (fixtures[i]["teams"]["away"]["id"] == t1 && fixtures[i]["teams"]["home"]["id"] == t2) {
            prediction_score += (t1AwayRecord - t2HomeRecord)
        }
    } */

    console.log(prediction_score)
}