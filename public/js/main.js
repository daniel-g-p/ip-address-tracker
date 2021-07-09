const searchForm = document.querySelector(".search-form");
const formContainer = document.querySelector(".form-container");
const inputGroup = document.querySelector(".input-group");
const searchQuery = document.querySelector(".input-group__input");
const inputError = document.querySelector(".input-group__error");
const searchResult = document.querySelector(".result");
const searchOutputs = document.querySelectorAll(".result__output");
const submitButton = document.querySelector(".input-group__button");
const submitButtonArrow = document.querySelector(".input-group__button-arrow");
const submitButtonLoader = document.querySelector(".loader");
const ownIpButton = document.querySelector(".ownIP");
const permissionModal = document.querySelector(".modal");
const permissionButtons = document.querySelectorAll(".button");
const centerLocation = document.querySelector(".center-location");
const collapseHeader = document.querySelector(".collapse-header");
const mapContainer = document.querySelector(".map");
const mapCanvas = document.querySelector(".mapboxgl-canvas");

const ipFormat = /^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/;
const domainFormat = /([a-z0-9]+\.)?([a-z0-9][a-z0-9-]*)?((\.[a-z]{2,6})|(\.[a-z]{2,6})(\.[a-z]{2,6}))$/;

const geo = navigator.geolocation;

window.onload = () => {
    initializeLocation();
    adjustResultMargin();
    adjustMap();
    formContainer.classList.toggle("form-container--inactive");
    formContainer.style.maxHeight = formContainer.scrollHeight + inputError.scrollHeight + "px";
    setTimeout(() => {
        document.body.style.visibility = "visible";
        document.body.style.opacity = 1;
    }, 1000);
};

searchForm.addEventListener("submit", async(e) => {
    e.preventDefault();
    const inputType = validateQuery();
    if (!validateQuery()) {
        triggerError(true);
        return;
    }
    const result = await fetchData(searchQuery.value, inputType);
    applyData(result);
    flyToLocation([result.location.lng, result.location.lat]);
});

ownIpButton.addEventListener("click", async() => {
    const result = await fetchData("", "");
    searchQuery.value = result.ip;
    applyData(result);
    flyToLocation([result.location.lng, result.location.lat]);
});

centerLocation.addEventListener("click", () => {
    markerLocation = [marker._lngLat.lng, marker._lngLat.lat];
    flyToLocation(markerLocation);
});

searchQuery.addEventListener("input", () => {
    triggerError(false);
});

collapseHeader.addEventListener("change", () => {
    formContainer.classList.toggle("form-container--inactive");
    if (formContainer.classList.contains("form-container--inactive")) {
        formContainer.style.maxHeight = 0;
    } else {
        formContainer.style.maxHeight = formContainer.scrollHeight + inputError.scrollHeight + "px";
    }
})

const initializeLocation = async() => {
    if (geo) {
        const location = await getLocation();
        const coords = location.coords;
        flyToLocation([coords.longitude, coords.latitude]);
    }
};

const fetchData = async(query, type) => {
    toggleLoader(true);
    return await fetch(`https://geo.ipify.org/api/v1?apiKey=at_Qigj51U19P8DhOGJm7CWvhBPHCibw&${type}=${query}`)
        .then(response => {
            toggleLoader(false);
            return response.json();
        });
};

const applyData = (data) => {
    let requiredData;
    try {
        requiredData = [
            data.ip,
            `${data.location.city} ${data.location.postalCode}, ${data.location.region}, ${data.location.country}`,
            `UTC ${data.location.timezone}`,
            data.isp
        ]
    } catch {
        requiredData = ["-", "-", "-", "-", ];
        inputError.innerHTML = "Couldn't retrieve data for your search query...";
        triggerError(true);
    }
    searchOutputs.forEach((element, index) => {
        element.innerHTML = requiredData[index];
    });
    adjustResultMargin();
}

const validateQuery = () => {
    q = searchQuery.value;
    if (q.match(ipFormat)) {
        return "ipAddress";
    } else if (q.match(domainFormat)) {
        return "domain";
    } else {
        return false;
    }
};

const triggerError = (trigger) => {
    if (trigger) {
        inputGroup.classList.add("input-group--error");
    } else {
        inputGroup.classList.remove("input-group--error");
        setTimeout(() => {
            inputError.innerHTML = "Please enter a valid IP address or domain..."
        }, 250);
    }
}

const toggleLoader = (toggle) => {
    if (toggle) {
        submitButtonArrow.classList.add("input-group__button-arrow--loading");
        submitButtonLoader.classList.add("loader--loading");
    } else {
        submitButtonArrow.classList.remove("input-group__button-arrow--loading");
        submitButtonLoader.classList.remove("loader--loading");
    }
}

const getLocation = () => {
    return new Promise((resolve, reject) => {
        geo.getCurrentPosition(resolve, reject)
    });
}

const flyToLocation = (location) => {
    map.flyTo({
        center: location,
        zoom: 10,
        curve: 1.5,
        speed: 1.5,
    });
    marker.setLngLat(location);
}

const adjustResultMargin = () => {
    searchResult.style.marginBottom = -searchResult.scrollHeight / 2 + "px";
}

const adjustMap = () => {
    mapCanvas.style.minHeight = mapContainer.scrollHeight + "px";
}