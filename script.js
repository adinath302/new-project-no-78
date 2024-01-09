const button = document.querySelector("button");
apikey = "9ba741c7268c42e9836b28d5c222a966";

button.addEventListener("click", () => {
    if (navigator.geolocation) {
        button.innerHTML = "Allow to detect location"
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        button.innerHTML = "Your browser not support"
    }
})
function onSuccess(position) {
    button.innerHTML = "Detecting Your Location ..."
    let { latitude, longitude } = position.coords;
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apikey}`)
        .then(response => response.json()).then(result => {
            let alldetails = result.results[0].components;
            let {county , postcode , country} = alldetails;
            button.innerHTML = `${county} ,${postcode} ,${country}`;
            console.table(alldetails);
        }).catch(()=>{
            button.innerText = "Something went wrong";
        })
    // 9ba741c7268c42e9836b28d5c222a966
}

function onError(error) {
    if (error.code == 1) {
        button.innerHTML = "Your denied the request";
    }
    else if (error.code == 2) {
        button.innerHTML = "Location not available";
    }
    else {
        button.innerText = "Something went wrong";
    }
    button.setAttribute("disabled", "true");
}