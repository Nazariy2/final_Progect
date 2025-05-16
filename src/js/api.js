async function updateISSData() {
      try {
        const res = await fetch("http://api.open-notify.org/iss-now.json");
        const data = await res.json();
        const { latitude, longitude } = data.iss_position;
        document.getElementById("iss-data").textContent = `Latitudine: ${latitude}, Longitudine: ${longitude}`;
      } catch (err) {
        document.getElementById("iss-data").textContent = "Errore nel caricamento dati ISS.";
      }
    }
    updateISSData();
    setInterval(updateISSData, 5000);