const supabaseClient = require('@supabase/supabase-js')
const express = require('express')

const app = express()
const port = 3000
app.use(express.static(__dirname + '/public'))

const supabaseURL = 'https://pkdvzleaydwkzpjgpwuq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrZHZ6bGVheWR3a3pwamdwd3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYwNzA0OTQsImV4cCI6MjAzMTY0NjQ5NH0.xmublEWf1GCCX5qLV9CoLRwQ1Xq3DLyjOBSP2ZP9r-w'
const supabase = supabaseClient.createClient(supabaseURL, supabaseKey)

app.get('/', (req, res) => {
    res.sendFile('public/homepage.html', { root: __dirname })
})

app.get('/home', async (req, res) => {
    console.log('Attempting to GET all teams')
    const { data, error } = await supabase
        .from('PremierLeagueTeams')
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