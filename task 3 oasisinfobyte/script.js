document.getElementById('convertBtn').addEventListener('click', convertTemperature);

function convertTemperature() {
    const tempInput = document.getElementById('temperatureInput').value;
    const unit = document.getElementById('unitSelect').value;

    const celsiusCard = document.getElementById('celsiusCard');
    const fahrenheitCard = document.getElementById('fahrenheitCard');
    const kelvinCard = document.getElementById('kelvinCard');

    if (tempInput === "" || isNaN(tempInput)) {
        alert("Please enter a valid number!");
        return;
    }

    let temp = parseFloat(tempInput);
    let celsius, fahrenheit, kelvin;

    switch(unit) {
        case 'C':
            celsius = temp;
            fahrenheit = (temp * 9/5) + 32;
            kelvin = temp + 273.15;
            break;
        case 'F':
            celsius = (temp - 32) * 5/9;
            fahrenheit = temp;
            kelvin = celsius + 273.15;
            break;
        case 'K':
            celsius = temp - 273.15;
            fahrenheit = (celsius * 9/5) + 32;
            kelvin = temp;
            break;
    }

    celsiusCard.innerText = `🌡️ Celsius: ${celsius.toFixed(2)} °C`;
    fahrenheitCard.innerText = `❄️ Fahrenheit: ${fahrenheit.toFixed(2)} °F`;
    kelvinCard.innerText = `🔥 Kelvin: ${kelvin.toFixed(2)} K`;

    // Animate results
    [celsiusCard, fahrenheitCard, kelvinCard].forEach(card => {
        card.classList.remove('show');
        void card.offsetWidth; // trigger reflow
        card.classList.add('show');
    });

    // Change background color based on Celsius temperature
    const body = document.body;
    if (celsius <= 0) {
        body.style.background = 'linear-gradient(135deg, #00BFFF, #1E90FF)'; // cold - blue
    } else if (celsius > 0 && celsius <= 25) {
        body.style.background = 'linear-gradient(135deg, #7FFFD4, #3CB371)'; // mild - green
    } else {
        body.style.background = 'linear-gradient(135deg, #FF7F50, #FF4500)'; // hot - orange/red
    }
}
