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

        // variables for calculation
        var totalGlobal = 0;
        var rankingSize = {};

        let breakTag = document.createElement('br');
        let totalSiteContainer = document.createElement('div');
        totalSiteContainer.classList.add("total");
        totalSiteContainer.classList.add("total_sites");
        totalSiteContainer.innerText = "Consommation par site";
        totalSiteContainer.append(breakTag);

        // loop in object global
        Object.keys(actual_JSON).map(function(objectKey, index) {
            var value = actual_JSON[objectKey];
            var totalSite = 0;
            Object.keys(value.files).map(function(objectKey, index) {
                var size = value.files[objectKey];
                //calculate total size of each website by adding files size
                totalSite = totalSite + size;
            });
            let totalSiteEl = document.createElement('div');
            totalSiteEl.append(value.title + ' - ' + value.url + ' = ' + totalSite + ' ko');
            //calculate total global for all website by adding files size
            totalGlobal = totalGlobal + totalSite;
            totalSiteContainer.append(totalSiteEl);

            // order of top websites size
            rankingSize[value.title] = totalSite;

        });

        // sorting order
        var sortable = [];
        for (var site in rankingSize) {
            sortable.push([site, rankingSize[site]]);
        }
        sortable.sort(function(a, b) {
            return b[1] - a[1];
        });

        dashboard.append(totalSiteContainer);

        let totalGlobalEl = document.createElement('div');
        totalGlobalEl.innerText = "Consommation globale = ";
        totalGlobalEl.classList.add("total");
        totalGlobalEl.classList.add("total_global");
        totalGlobalEl.append(totalGlobal + ' ko');
        dashboard.append(totalGlobalEl);

        // top 3 container
        let topContainer = document.createElement('div');
        topContainer.classList.add("total");
        topContainer.classList.add("top_container");

        //top 1
        let topOne = document.createElement('div');
        topOne.classList.add("top_el");
        topOne.append(sortable[0][0] + " -> " + sortable[0][1]);

        //top 2
        let topTwo = document.createElement('div');
        topTwo.classList.add("top_el");
        topTwo.append(sortable[1][0] + " -> " + sortable[1][1]);

        //top 3
        let topThree = document.createElement('div');
        topThree.classList.add("top_el");
        topThree.append(sortable[2][0] + " -> " + sortable[2][1]);

        topContainer.innerText = "TOP 3";
        topContainer.append(breakTag);
        topContainer.append(topOne);
        topContainer.append(topTwo);
        topContainer.append(topThree);
        dashboard.append(topContainer);



    });
}

init();


