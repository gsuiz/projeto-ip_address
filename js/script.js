const button = document.querySelector("#input-btn")
const infor = document.querySelector("#infor")
const address = document.querySelector("#input-address")
let map
address.addEventListener("keyup", (e) => {
    if(e.code == "Enter" || e.keyCode === 13){
        addMap()
    }
})
button.addEventListener("click", () => {
    addMap()
})

const addMap = () => {
    const arrowB = document.querySelector("#bottom")
    const arrowT = document.querySelector("#top")
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_yH97BTULMXuMzRV803KLQdJVTgujO&ipAddress=${address.value}&domain=${address.value}`)
    .then(response => response.json())
    .then(data => {
        if(map === undefined){
            map = L.map('map').setView([data.location.lat , data.location.lng], 13);
        } else {
            map.remove()
            map = L.map('map').setView([data.location.lat , data.location.lng], 13);
        }

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const customIcon = L.icon({
            iconUrl: 'images/icon-location.svg', 
            iconSize: [26, 32], 
            iconAnchor: [13, 31], 
            popupAnchor: [-3, -76]
        })

        const marker = L.marker([data.location.lat , data.location.lng], { icon: customIcon }).addTo(map)

        infor.innerHTML = `
            <div class="information__item">
                <p class="information__type">IP ADDRESS</p>
                <p class="information__content">${data.ip}</p>
            </div>
            <div class="information__item">
                <p class="information__type">LOCATION</p>
                <p class="information__content">${data.location.city}, ${data.location.region}</p>
                <p class="information__content">${data.location.country}</p>
            </div>
            <div class="information__item">
                <p class="information__type">TIMEZONE</p>
                <p class="information__content">${data.location.timezone}</p>
            </div>
            <div class="information__item">
                <p class="information__type">ISP</p>
                <p class="information__content">${data.isp}</p>
            </div>
        `
        address.addEventListener("click", () => {
            address.value = ""
        })
        setTimeout(() => {
            document.querySelector("#map").scrollIntoView({ behavior: 'smooth' })
        }, 500)
    })
}
