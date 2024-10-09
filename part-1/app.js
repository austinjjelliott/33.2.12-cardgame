let url = "http://numbersapi.com";
let favNum = 9;

// 1)Make a request to the Numbers API (http://numbersapi.com/) to get a fact
// about your favorite number. (Make sure you get back JSON by including the
// json query key, specific to this API.

$.getJSON(`${url}/${favNum}?json`).then((res) => {
  console.log(res.text);
});

// 2)Figure out how to get data on multiple numbers in a single request.
// Make that request and when you get the data back, put all of the number facts
// on the page.

let favNumbers = [3, 2, 1];
$.getJSON(`${url}/${favNumbers}/?json`).then((res) => {
  console.log(res);
});

// 3) Use the API to get 4 facts on your favorite number. Once you have them all,
// put them on the page. It’s okay if some of the facts are repeats.

Promise.all(
  Array.from({ length: 4 }, () => {
    return $.getJSON(`${url}/${favNum}?json`);
  })
).then((facts) => {
  facts.forEach((res) => console.log(res.text));
});
