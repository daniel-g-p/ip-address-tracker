const searchForm = document.querySelector(".search-form");
const inputGroup = document.querySelector(".input-group");
const searchQuery = document.querySelector(".input-group__input");
const inputError = document.querySelector(".input-group__error");
const searchOutputs = document.querySelectorAll(".result__output");
const submitButton = document.querySelector(".input-group__button");
const submitButtonArrow = document.querySelector(".input-group__button-arrow");
const submitButtonLoader = document.querySelector(".loader");
const ownIpButton = document.querySelector(".ownIP");

const ipFormat = /^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/;
const domainFormat = /([a-z0-9]+\.)?([a-z0-9][a-z0-9-]*)?((\.[a-z]{2,6})|(\.[a-z]{2,6})(\.[a-z]{2,6}))$/;

searchForm.addEventListener("submit", async(e) => {
    e.preventDefault();
    const inputType = validateQuery();
    if (!validateQuery()) {
        triggerError(true);
        return;
    }
    const result = await fetchData(searchQuery.value, inputType);
    console.log(result);
    applyData(result);
});

ownIpButton.addEventListener("click", async() => {
    const result = await fetchData("", "");
    searchQuery.value = result.ip;
    applyData(result);;
});

searchQuery.addEventListener("input", () => {
    triggerError(false);
})

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