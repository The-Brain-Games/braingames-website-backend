const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const axios = require('axios');
const util = require('minecraft-server-util');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Print Welcome Message
printWelcome();

// Basic route to display BeamMP server info
app.get('/beammp', (req, res) => {
    let servers = [];
    axios.get('https://beammp.com/servers-info').then(response => {
        for (let i = 0; i < response.data.length; i++) {
            if(response.data[i][i].owner == "perfectsquare150#8584"){
                servers.push(response.data[i][i]);
            }
        }
        res.send(servers);
    });
});

// Basic route to display MC server info
app.get('/mc', (req, res) => {
    util.status('mc.meetandgeek.ca')
    .then((response) => {
        res.send(response);
    })
    .catch((error) => {
        console.log(error);
    });
});

app.listen(PORT, function(){
  console.log('Express server running on port:',PORT);
});

// Welcome message
function printWelcome() {
    console.log("+-----------------------------------------+");
    console.log("|       Brain Games Backend Server        |");
    console.log("|                  v0.1                   |");
    console.log("|        jslightham & contributors        |");
    console.log("|     (https://github.com/jslightham)     |");
    console.log("+-----------------------------------------+");
}

