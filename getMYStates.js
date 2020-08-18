const axios = require('axios');
const cheerio = require('cheerio');

const page_url = 'https://en.wikipedia.org/wiki/States_and_federal_territories_of_Malaysia';

async function getMYStates() {
    const { data } = await axios.get(page_url);
    const $ = cheerio.load(data);
    const table = $('table.wikitable:nth-child(11)');
    const states = [];
    table.find('tbody tr').slice(1).each((i, element) => {
        const $row = $(element);
        const state = {};
        const labels = [
            'name',
            'capital',
            'royal_capital',
            'population',
            'total_area',
            'license_plate_prefix',
            'phone_code',
            'abbreviation',
            'ISO',
            'FIPS',
            'HDI',
            'region',
            'head_of_state',
            'head_of_government'
        ];

        //state.name = $($row.find('td')[2]).text().trim();
        $row.find('td').slice(2).each((i, element) => {
            const $col = $(element);
            const label = labels[i];
            const value = $col.text().trim();
            let numValue = Number(value.replace(/,/g, ''));
            if(!isNaN(numValue)) {
                state[label] = numValue;
            } else {
                state[label] = value;
            }
        });
        states.push(state);
    });
    return states;
}

module.exports = getMYStates;