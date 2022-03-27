window.registerMicroApp({
  mount: () => {
    document.querySelector("#container").innerHTML = "<h1>Application 2</h1>";
  },
  unmount: () => {
    document.querySelector("#container").innerHTML = "";
    document.querySelector('script[data-micro-app="app2"]').remove();
  },
});
