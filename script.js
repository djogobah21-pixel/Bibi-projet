const API_KEY = "COLLE_TA_CLE_ICI"; // Va sur openweathermap.org pour l'avoir gratuitement

// Au démarrage
window.onload = () => {
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
      pos => getMeteoParCoord(pos.coords.latitude, pos.coords.longitude),
      () => getMeteo("Paris") // Si il refuse, on met Paris
    );
  } else {
    getMeteo("Paris");
  }
}

async function getMeteo(ville) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${API_KEY}&units=metric&lang=fr`;
  afficherMeteo(url, ville);
}

async function getMeteoParCoord(lat, lon) {
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fr`;
  afficherMeteo(url);
}

async function afficherMeteo(url, villeCherchee = "") {
  document.getElementById('localisation').innerText = "Chargement...";
  let reponse = await fetch(url);
  let data = await reponse.json();

  if(data.cod == 200){
    document.getElementById('localisation').innerText = "";
    document.getElementById('resultat').style.display = "block";
    document.getElementById('nomVille').innerText = data.name + ", " + data.sys.country;
    document.getElementById('temp').innerText = Math.round(data.main.temp) + "°C";
    document.getElementById('description').innerText = data.weather[0].description;
    document.getElementById('icone').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    document.getElementById('details').innerText = `Ressenti: ${Math.round(data.main.feels_like)}°C | Vent: ${data.wind.speed} m/s`;
  } else {
    document.getElementById('localisation').innerText = "Ville introuvable";
  }
}

function chercherVille() {
  let ville = document.getElementById('ville').value;
  if(ville) getMeteo(ville);
}
