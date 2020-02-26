function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'dummydata.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function init() {
    let dashboard = document.getElementById('dashboard');
    loadJSON(function(response) {
        // Parse JSON string into object
        var actual_JSON = JSON.parse(response);
        console.log(actual_JSON);

        // calculate total size of each website by adding files size
        var totalGlobal = 0;
        Object.keys(actual_JSON).map(function(objectKey, index) {
            var value = actual_JSON[objectKey];
            //console.log(value.files);
            var totalSite = 0;
            Object.keys(value.files).map(function(objectKey, index) {
                var size = value.files[objectKey];
                totalSite = totalSite + size;
            });
            let totalSiteContainer = document.createElement('div');
            totalSiteContainer.append(value.title + ' = ' + totalSite + ' ko');
            dashboard.append(totalSiteContainer);
            totalGlobal = totalGlobal + totalSite;
        });

        let totalGlobalContainer = document.createElement('div');
        totalGlobalContainer.append('TOTAL CONSOMMATION = ' + totalGlobal + ' ko');
        dashboard.append(totalGlobalContainer);

        //calculate total size of global consumption


    });
}

init();


