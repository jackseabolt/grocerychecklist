const STORE = [{name: "apples", checked: false},{name: "pears", checked: true}];

function generateItemElement(item, index){
  return `
  <li class="js-li-item" data-item-index="${index}">
    <h3 class="js-li-title ${item.checked ? 'checked' : '' }">${item.name}</h3>
    <button class="js-button-remove">Remove</button>
    <button class="js-button-check">Check</button>
  </li>
  `;
}

function generateItemsString(arr){
  const items = arr.map((item, index) => generateItemElement(item, index));
  return items.join(" "); 
}

function displayCheckList(){
  const itemString = generateItemsString(STORE);
  $("#js-list").html(itemString); 
}

function addToList(item){
  STORE.push({name:item, checked: false });
}

function handleFormSubmit(){
  $('#js-form').submit(function(event){
    console.log("handleFormSubmit ran");
    event.preventDefault(); 
    const userInput = $("input[name='js-input']").val();
    addToList(userInput);
    $("input[name='js-input']").val(""); 
    displayCheckList(); 
  });
}
function getItemIndex(item){
   const itemToParse = $(item).closest('li').attr("data-item-index");
   console.log("getItemIndex ran " + itemToParse); 
   return parseInt(itemToParse, 10); 
}

function removeItemFromList(id){
  STORE.splice(id, 1);
  console.log(`Item ${id} is being removed by removeItemFromList`);
}

function handleRemoveButton(){
  $('ul').on("click", ".js-button-remove", function(){
    console.log("handleRemoveButton ran")
    const liId = getItemIndex(event.currentTarget); 
    console.log(liId); 
    removeItemFromList(liId); 
    displayCheckList(); 
  });
}

function checkItem(id){
  if(STORE[id].checked === true ){
    STORE[id].checked = false;
  } else {
     STORE[id].checked = true;
  }
}

function handleCheckButton(){
  $('ul').on("click", ".js-button-check", function(){
    const liId = getItemIndex($(this)); 
    checkItem(liId); 
    displayCheckList();
  });
}

function handleChecklist(){
  displayCheckList();  
  handleFormSubmit(); 
  handleRemoveButton();
  handleCheckButton(); 
}

$(handleChecklist);