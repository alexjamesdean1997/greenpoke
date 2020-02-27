/*function loadJSON(callback) {

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
}*/

function roundSizeMo(size) {
	size = Math.trunc(size);
 	size = size / 1000;
 	return size;
}

function init() {
    let dashboard = document.getElementById('dashboard');
    
		
		
	chrome.storage.local.get('site_stats', function(data) {
		var stats = data['site_stats'];

        // variables for calculation
        var totalGlobal = 0;
        var rankingSize = {};

        let breakTag = document.createElement('br');
        let totalSiteContainer = document.createElement('div');
        totalSiteContainer.classList.add("total");
        totalSiteContainer.classList.add("total_sites");
        //totalSiteContainer.innerText = "Consommation par site";
        totalSiteContainer.append(breakTag);

        // loop in object global
        Object.keys(stats).map(function(objectKey, index) {
            var value = stats[objectKey];
            var totalSite = 0;

			var res = value.url.match(/chrome-extension:\/\/|chrome:\/\/|file:\/\/\//g);
			if(!res) {
				/*Object.keys(value.files).map(function(objectKey, index) {
					var size = value.files[objectKey];
					//calculate total size of each website by adding files size
					totalSite = totalSite + size;
				});*/
				if(value.size) {
					var size = value.size;
					totalSite += size;
				}

				let totalSiteEl = document.createElement('div');
				totalSiteEl.append(value.title + ' - ' + value.url + ' = ' + roundSizeMo(totalSite) + ' Mo');
				//calculate total global for all website by adding files size
				totalGlobal = totalGlobal + totalSite;
				//totalSiteContainer.append(totalSiteEl);

				// order of top websites size
				rankingSize[value.title] = totalSite;
			}
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
		
		let totalDsp = document.querySelector('.conso-size');
		totalDsp.innerText = roundSizeMo(totalGlobal) + ' Mo';
		document.querySelector('.conso-size');

		let totalCmp = document.querySelector('.compar-num');
		totalCmp.innerText = Math.round(roundSizeMo(totalGlobal) / 7.9  * 100) / 100;

		console.log(roundSizeMo(totalGlobal));

		let top_el_1 = document.querySelector('#top_conso .top-el:nth-child(2)');
		top_el_1.querySelector('.name-bar').innerText = sortable[0][0];
		top_el_1.querySelector('.top-size').innerText = Math.round(roundSizeMo(sortable[0][1])) + ' Mo';
		let top_el_2 = document.querySelector('#top_conso .top-el:nth-child(3)');
		top_el_2.querySelector('.name-bar').innerText = sortable[1][0];
		top_el_2.querySelector('.top-size').innerText = Math.round(roundSizeMo(sortable[1][1])) + ' Mo';
		let top_el_3 = document.querySelector('#top_conso .top-el:nth-child(4)');
		top_el_3.querySelector('.name-bar').innerText = sortable[2][0];
		top_el_3.querySelector('.top-size').innerText = Math.round(roundSizeMo(sortable[2][1])) + ' Mo';
    });
}

init();


