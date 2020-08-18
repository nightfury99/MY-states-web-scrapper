const statesElement = document.querySelector('#states');
const infoElement = document.querySelector('#info');
const infoElements = document.querySelector('#infos');

function setMYStates(states) {
    states.forEach((state) => {
        const optionElement = document.createElement('option');
        optionElement.setAttribute('value', state.name);
        optionElement.textContent = state.name;
        statesElement.append(optionElement);

        optionElement.addEventListener('click', () => {
            infoElement.innerHTML = `<pre>${JSON.stringify(state, null, 2)}</pre>`;
        });
    });
}

async function getMYStates() {
    const response = await fetch('/api/states');
    const states = await response.json();
    setMYStates(states);
}

getMYStates();

