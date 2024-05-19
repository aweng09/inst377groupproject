const supabaseClient = require('@supabase/supabase-js')
const bodyParser = require('body-parser')
const express = require('express')

const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

const supabaseURL = 'https://pkdvzleaydwkzpjgpwuq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrZHZ6bGVheWR3a3pwamdwd3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYwNzA0OTQsImV4cCI6MjAzMTY0NjQ5NH0.xmublEWf1GCCX5qLV9CoLRwQ1Xq3DLyjOBSP2ZP9r-w'
const supabase = supabaseClient.createClient(supabaseURL, supabaseKey)

app.get('/', (req, res) => {
    res.sendFile('public/homepage.html', { root: __dirname })
})

app.get('/fanpage', async (req, res) => {
    console.log('Attempting to GET all fans')
    const { data, error } = await supabase
        .from('Fans')
        .select()

    if (error) {
        console.log('Error')
        res.send(error)
    } else {
        res.send(data)
    }
})

app.post('/fanpage', async (req, res) => {
    console.log("Adding Fan")
    var username = req.body.username
    var name = req.body.name
    var fav_team = req.body.fav_team
    var fav_player = req.body.fav_player

    const { data, error } = await supabase
        .from('Fans')
        .insert({ 'username': username, 'name': name, 'fav_team': fav_team, 'fav_player': fav_player })
        .select()

    if (error) {
        console.log('Error')
        res.send(error)
    } else {
        res.send(data)
    }
})

app.listen(port, () => {
    console.log('App Alive')
})