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

        var totalGlobal = 0;

        let breakTag = document.createElement('br');
        let totalSiteContainer = document.createElement('div');
        totalSiteContainer.classList.add("total");
        totalSiteContainer.classList.add("total_sites");
        totalSiteContainer.innerText = "Consommation par site";
        totalSiteContainer.append(breakTag);

        // calculate total size of each website by adding files size
        Object.keys(actual_JSON).map(function(objectKey, index) {
            var value = actual_JSON[objectKey];
            var totalSite = 0;
            Object.keys(value.files).map(function(objectKey, index) {
                var size = value.files[objectKey];
                totalSite = totalSite + size;
            });
            let totalSiteEl = document.createElement('div');
            totalSiteEl.append(value.title + ' = ' + totalSite + ' ko');
            totalGlobal = totalGlobal + totalSite;
            totalSiteContainer.append(totalSiteEl);
        });



        dashboard.append(totalSiteContainer);

        let totalGlobalEl = document.createElement('div');
        totalGlobalEl.innerText = "Consommation globale";
        totalGlobalEl.classList.add("total");
        totalGlobalEl.classList.add("total_global");
        totalGlobalEl.append(breakTag);
        totalGlobalEl.append('TOTAL CONSOMMATION = ' + totalGlobal + ' ko');
        dashboard.append(totalGlobalEl);




    });
}

init();


