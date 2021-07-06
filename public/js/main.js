const searchForm = document.querySelector(".search-form");
const inputGroup = document.querySelector(".input-group");
const searchQuery = document.querySelector(".input-group__input");
const searchOutputs = document.querySelectorAll(".result__output");
const ipFormat = /^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/;
const domainFormat = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/;

searchForm.addEventListener("submit", async(e) => {
    e.preventDefault();
    if (!validateQuery()) {
        triggerError(false);
        return;
    }
    const result = await searchIpAddress(searchQuery.value);
    console.log("Done");
});

searchQuery.addEventListener("input", () => {
    triggerError(true);
})

const searchIpAddress = async(query) => {
    console.log(`Searching for ${query}`);
    fetch(`https://geo.ipify.org/api/v1?apiKey=at_Qigj51U19P8DhOGJm7CWvhBPHCibw&ipAddress=${query}`)
        .then(response => {
            console.log(response.json());
            return response.json();
        })
        .catch(error => {
            return "Error";
        });
};

const validateQuery = () => {
    q = searchQuery;
    if (!q.value) {
        return false;
    } else if (!q.value.match(ipFormat) && !q.value.match(domainFormat)) {
        return false;
    } else {
        return true;
    }
};

const triggerError = (valid) => {
    if (valid) {
        inputGroup.classList.remove("input-group--error");
    } else {
        inputGroup.classList.add("input-group--error");
    }
}