chrome.runtime.onInstalled.addListener(function() {
	chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
		if (changeInfo.status == 'complete') {
			
			var site_data = new Object();
			$url = '';
			$title = 'plop';
			$date_obj = new Date;
			$date = $date_obj.getTime();

			chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
				$url = tabs[0].url;
			});

			chrome.storage.local.get('site_stats', function(data) {
				var stats = data['site_stats'];
				if(stats) {
					site_data = stats;
					$nextId = Object.keys(stats).length+1;
				} else {
					$nextId = 1;
				}

				site_data[$nextId] = {
					url: $url,
					title: $title,
					date: $date
					/*$files: {
						$name: $size
					}*/
				}
				chrome.storage.local.set({site_stats: site_data});	
			});
		}
	  })


	

	/*
	var xhr = new XMLHttpRequest();
	xhr.open("POST", chrome.extension.getURL('/data.json'), true);
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var json = JSON.parse(xhr.responseText);
			$nextId = Object.keys(json).length;

			var json_data = JSON.stringify(site_data);
			xhr.send(json_data);
		
			console.log(site_data);
			console.log(json_data);
			console.log($nextId);
		}
	}*/
});