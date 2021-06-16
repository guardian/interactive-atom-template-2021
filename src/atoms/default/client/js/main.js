setTimeout(() => {
  if (window.resize) {
    const html = document.querySelector("html");
    const body = document.querySelector("body");

    html.style.overflow = "hidden";
    html.style.margin = "0px";
    html.style.padding = "0px";

    body.style.overflow = "hidden";
    body.style.margin = "0px";
    body.style.padding = "0px";

    window.resize();
  }
}, 100);

const hello = "hello";
const testObject = { a: hello };
console.log(testObject?.a);
console.log(testObject?.b);
