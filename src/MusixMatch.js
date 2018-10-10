export default class MusixMatch {
  musicQuery(searchType){
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = searchType;
      request.onload = function() {
        if (this.status === 200){
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }
}
