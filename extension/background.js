function onNetworkEvent(id, message, params) {
	var tabid = id.tabId;
	var resp = params.response;
	var reqid = params.requestId;
	add_file(tabid, reqid, resp.url, resp.status, resp.fromDiskCache, params.type, params.dataLength);
}

function add_file(tabid, reqid, url, code, from_cache, type, size) {
	obj = new Object();
	obj["url"] = url;
    obj["code"] = code;
    obj["type"] = type;
    obj["req"] = reqid;
    obj["cached"] = from_cache;
	obj["size"] = size;

	$global = obj;
}
$global = 0;
chrome.debugger.onEvent.addListener(onNetworkEvent);

chrome.runtime.onInstalled.addListener(function() {
	chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
		if (changeInfo.status == 'complete') {
			
			var site_data = new Object();
			$url = '';
			$title = '';
			$date_obj = new Date;
			$date = $date_obj.getTime();
			$tabid = 0;
			$files = 0;

			chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
				$url = tabs[0].url;
				$title = tabs[0].title;
				$tabid = tabs[0].id;
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
					date: $date,
					tabid: $tabid,
					files: $files,
					global: $global
				}
				chrome.storage.local.set({site_stats: site_data});	
			});
		}
	});
});