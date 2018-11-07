
  //  setInterval(plotRequest,100);

//var station = ""
var air = [10,20,30,40,50,60,60,70,80,50,60,30,50,10,20,50,50,30,30,10]; //initially set tpo zero
var Sound = [10,20,30,40,50,60,60,70,80,50,60,30,50,10,20,50,50,30,30,10];

function plotRequest(name){

    //$.get("http://localhost:3000/getdetails", function(data, status){

    // var intdata = parseFloat(data);
    //   addTo(air,intdata);

    plotGraph1(name);

    //  });
}

//this function push a new element into the end of an array and 1st element is removed
function addTo(array,element){
    var length = array.length;

    for (var i = 0; i < length - 1; i++) {
        array[i]=array[i+1];
    }

    array[length-1]=element;
}

//graph plotter
function plotGraph1(name) {

    var trace1 = {
        x: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
        y: air,
        type: 'scatter'

    };
    var trace2 = {
        x: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
        y: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        type: 'scatter'

    };

    var city =name;
    var data = [trace1, trace2];
    var layout = {
        title: 'Air pollution level in '+name+' ',
        xaxis: {
            title: 'time'
        },
        yaxis: {
            title: ' percentage (ppm)'
        }
    };
    Plotly.newPlot('myDiv', data ,layout);

    var trace3 = {
        x: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
        y: Sound,
        type: 'scatter'

    };
    var trace4 = {
        x: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
        y: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        type: 'scatter'

    };


    var data2 = [trace3, trace4];
    var layout2 = {
        title: ' Sound levels in '+name+' ',
        xaxis: {
            title: 'time'
        },
        yaxis: {
            title: 'sound level'
        }
    };
    Plotly.newPlot('myDiv2', data2 ,layout2);

    callMap(name);
}

function getCO(){
    var city="Kandy";
    var obj =document.getElementById("graph");
    obj.innerText="";

    var trace3 = {
        x: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
        y: Sound,
        type: 'scatter'

    };
    var trace4 = {
        x: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
        y: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        type: 'scatter'

    };


    var data2 = [trace3, trace4];
    var layout2 = {
        title: ' CO gas levels in '+city+' ',
        xaxis: {
            title: 'time'
        },
        yaxis: {
            title: 'CO gas (ppm)'
        }
    };
    Plotly.newPlot('graph', data2 ,layout2);

    callMap(city);


}

function getCH(){

    var city ="kandy";
    var obj =document.getElementById("graph");
    obj.innerText="";

    var trace3 = {
        x: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
        y: Sound,
        type: 'scatter'

    };
    var trace4 = {
        x: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
        y: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        type: 'scatter'

    };


    var data2 = [trace3, trace4];
    var layout2 = {
        title: ' CH gass levels in '+city+' ',
        xaxis: {
            title: 'time'
        },
        yaxis: {
            title: 'CH gases (ppm) '
        }
    };
    Plotly.newPlot('graph', data2 ,layout2);

    callMap(city);



}

function getSound() {
    var city = "kandy";
    var obj = document.getElementById("graph");
    obj.innerText = "";

    var trace3 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        y: Sound,
        type: 'scatter'

    };
    var trace4 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        type: 'scatter'

    };


    var data2 = [trace3, trace4];
    var layout2 = {
        title: ' Sound levels in ' + city + ' ',
        xaxis: {
            title: 'time'
        },
        yaxis: {
            title: 'Sound level '
        }
    };
    Plotly.newPlot('graph', data2, layout2);

    callMap(city);
}