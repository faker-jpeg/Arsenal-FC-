'use strict';

function printStats(evnt) {
    evnt.preventDefault();
    if (evnt.target.statusText !== 'OK') {
        console.error(evnt.target.statusText);
        console.error(evnt.target.status);
        return;
    }
    let loadedData = evnt.target.response;

    let playerListDropdown = document.getElementById('playerList');
    for (let player of loadedData) {
        let option = document.createElement('option');
        option.value = player.name;
        option.textContent = player.name;
        playerListDropdown.appendChild(option);
    }
}

function statsAjaxRequest(evnt) {
    evnt.preventDefault();
    let request = new XMLHttpRequest();
    request.open('GET', 'stats.json');
    request.responseType = 'json';
    request.send();

    request.addEventListener('load', function () {
        let loadedData = request.response;

        let selectedPlayer = document.getElementById('playerList').value;

        let selectedPlayerData;
        for (let i = 0; i < loadedData.length; i++) {
            if (loadedData[i].name === selectedPlayer) {
                selectedPlayerData = loadedData[i];
                break;
            }
        }

        
        let statList = document.createElement('ul');
        let newListItem = document.createElement('p');
        let newListItemText = document.createTextNode(`Player: ${selectedPlayerData.name}, Goals: ${selectedPlayerData.goals}, Assists: ${selectedPlayerData.assists}, Yellow Cards: ${selectedPlayerData.yellowCards}, Red Cards: ${selectedPlayerData.redCards}`);
        newListItem.appendChild(newListItemText);
        statList.appendChild(newListItem);

        
        document.querySelector('#results').innerHTML = ''; // Clear previous content
        document.querySelector('#results').appendChild(statList);
    });
}

function main() {
    document
        .querySelector('#submit-button')
        .addEventListener('click', statsAjaxRequest);
}

main();