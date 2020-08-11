window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature-section');
    let temperatureSpan = document.querySelector('.temperature-section span');
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=0f288d8f270c412bb2abc6c2889ecb58`;

            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data => {
                const {temp} = data.main;
                const {description, icon} = data.weather[0];
                // Set DOM element from API
                temperatureDegree.textContent = temp;
                temperatureDescription.textContent = description;
                locationTimezone.textContent = data.name;
                //formula for celsius
                let celsius = (temp) -273.15;
                
                //formula for farenheit
                let farenheit = (temp -273.15) * (9/5) + (32);
                
                //Set icon
                    setIcons(icon, document.querySelector('.icon'));

                // Change degree
                temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === "K") {
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    } else if (temperatureSpan.textContent === "C") {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = Math.floor(farenheit);
                    } else {
                        temperatureSpan.textContent = "K";
                        temperatureDegree.textContent = temp;
                    }
                });
            });
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.padStart(4, "_");
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});