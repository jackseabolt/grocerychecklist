const STORE = [];

function generateItemElement(item, index){
  console.log('generated index was ' + index); 
  return `
  <li class="js-li-item ${item.checked ? 'complete' : '' }" data-item-index="${index}">
    <h3 class="js-li-title">${item.name}</h3>
    <i class="fa fa-minus-circle js-button-remove" aria-hidden="true"></i>
    <i class="fa fa-check-circle js-button-check" aria-hidden="true"></i>
  </li>
  `;
}

function generateItemsString(arr){
  const items = arr.map((item, index) => generateItemElement(item, index));
  return items.reverse().join(" "); 
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
    console.log("handleFormSubmit");
    event.preventDefault(); 
    const userInput = $("input[name='js-input']").val();
    addToList(userInput);
    $("input[name='js-input']").val(""); 
    handleCounter(); 
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
  console.log(`THIS ${id} is being removed by removeItemFromList`);
}

function handleRemoveButton(){
  $('ul').on("click", ".js-button-remove", function(){
    const liId = getItemIndex($(this)); 
    console.log("removing " + liId + " in handleRemoveButton"); 
    removeItemFromList(liId);
    handleCounter();  
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
    handleCounter(); 
    displayCheckList();
  });
}

function getTotalChecked(objArr){
  const total =[]; 
  for(let i = 0; i < objArr.length; i++){
    if(objArr[i].checked){
      total.push(objArr[i]); 
    }
  }
  return total.length; 
}

function displayCounter(text){
  console.log(text); 
  $('#js-counter').html(text); 
}

function handleCounter(){
  let totalChecked = getTotalChecked(STORE).toString(); 
  let total = STORE.length.toString();
  let finalResult = `${totalChecked}/${total}`;
  displayCounter(finalResult); 
}

function handleChecklist(){
  displayCheckList();  
  handleFormSubmit(); 
  handleRemoveButton();
  handleCheckButton();
  handleCounter();  
}

$(handleChecklist);