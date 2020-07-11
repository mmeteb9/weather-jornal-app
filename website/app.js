/* Global Variables */
let baseURL = 'api.openweathermap.org/data/2.5/weather?zip='
let apiKey = '&units=metric&appid=10ab18bd388af9cf08c03812ecb9a461';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();



// click event to add function to HTML element
document.getElementById('generate').addEventListener('click', callback);

function callback(e) {
    console.log("hellllo");
// get user zip and feelings values
let zipNum = document.getElementById('zip').value;
let userResponse = document.getElementById('feelings').value;
console.log(baseURL+ zipNum +apiKey)


    getData(baseURL, zipNum, apiKey)
        .then(function (weatherData) {
            // add the data to POST request
            postData('/add', {
                    temp: weatherData.main.temp,
                    date: newDate,
                    userResponse,
                })
                .then(function (newData) {

                    updateUI()
                })

        })
}


// async get func
const getData = async (baseURL, zipNum, apiKey) => {
    console.log(baseURL+zipNum+apiKey)
    const res = await fetch("https://"+baseURL+zipNum+apiKey);
    try {
        const weatherData = await res.json();
        console.log(weatherData)
        return weatherData;
    } catch (error) {
        console.log("error", error);
    }
}
// async post func
const postData = async (url = '', data = {}) => {
    const req = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await req.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json()

        // update entry holders values
        document.getElementById('temp').innerHTML = "The Temperature is: "+allData.temp+ ' \xB0C.';
        document.getElementById('date').innerHTML = "The Date is: "+allData.date;
        document.getElementById('content').innerHTML = "Your Feelings are: "+allData.userResponse;
    } catch (error) {
        console.log("error", error);
    }
};
