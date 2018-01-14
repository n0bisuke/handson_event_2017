'use strict';

const AREA = `030010`;
const URL = `http://weather.livedoor.com/forecast/webservice/json/v1?city=${AREA}`;
$.ajax({
    url: URL
}).done((res) => {
    console.log(res.forecasts[0]);
});