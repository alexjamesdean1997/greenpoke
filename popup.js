content = document.getElementById('content');

chrome.storage.local.get('site_stats', function(data) {
  var stats = data['site_stats'];
  console.log(stats);
  console.log(Object.keys(stats).length);
});
