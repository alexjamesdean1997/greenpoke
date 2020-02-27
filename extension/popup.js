content = document.getElementById('content');

chrome.storage.local.get('site_stats', function(data) {
  var stats = data['site_stats'];
  console.log(stats);
  console.log(Object.keys(stats).length);
  let popupSize = document.getElementById('dataSize');
  let size = stats[Object.keys(stats).length - 1].size;
  size = Math.trunc(size);
  size = size / 1000;
  popupSize.innerText = size + ' Mo';
});
