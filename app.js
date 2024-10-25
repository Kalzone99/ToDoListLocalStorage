const add = document.querySelector("#add");
const item = document.querySelector("#inputToDo");
let list = document.querySelector("#list");

// Une array qui va loader le contenu du storage ou si empty va créer une array vide
const itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

//l'Event lors du clic (création de liste et stockage)
add.addEventListener("click", () => {
  //console.log("click");
  createItem(item);
});
//string poussé dans l'array et envoyé dans le storage
function createItem(item) {
  itemsArray.push(item.value);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  //console.log(item.value);
  console.log(itemsArray);
  liste();
  item.value = "";
}
//créer la liste et le bouton delete
function liste() {
  let items = "";
  for (let i = 0; i < itemsArray.length; i++) {
    items += `   <div class="contain_list">
                        <div class="list">
                        ${itemsArray[i]}
                        </div>
                        <button class="delete" data-index='${i}'>Delete</button>
                    </div>
                    <hr></hr>`;
  }
  list.innerHTML = items;

  document.querySelectorAll(".delete").forEach((button) => {
    button.addEventListener("click", deleteItem);
  });
}
function deleteItem(event) {
  const index = event.target.getAttribute("data-index");
  itemsArray.splice(index, 1); // Remove the item from the array
  localStorage.setItem("items", JSON.stringify(itemsArray)); // Update storage
  liste(); // Update the displayed list
}
liste();
