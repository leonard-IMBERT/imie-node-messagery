const Page = {
  chat: document.getElementById("chat"),
  messages: document.getElementById("messages"),
  writer: document.getElementById("writer"),
  menu: document.getElementById("menu")
}

const API_URL = "http://" + Page.chat.dataset["api_url"] + ":" + Page.chat.dataset["api_port"]
const user_id = Page.chat.dataset["user_id"];

function ajax(method, url, data, callback) {
  const request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
      callback(request.response)
    }
  }
  request.open(method, url, true);
  request.send(data);
}

ajax("GET", API_URL + "/user?user_id=" + user_id, (data) => {
  let user = JSON.parse(data);
  menu.children[0].textContent = user.username
})
