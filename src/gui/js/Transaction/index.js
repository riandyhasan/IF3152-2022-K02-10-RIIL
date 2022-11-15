const sort = document.getElementById("sort")
const sort_up = document.getElementById("sort-up")
const sort_down = document.getElementById("sort-down")
const sort_title = document.getElementById("sort-title")

sort.addEventListener('click', () => {
    sort_up.classList.toggle("none")
    sort_down.classList.toggle("none")
    if(sort_up.classList.contains("none")){
        sort_title.innerHTML = "Sort by Latest";
    }else {
        sort_title.innerHTML = "Sort by Newest";
    }
  });