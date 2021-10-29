const editScreen = document.createElement("div");
editScreen.id = "editScreen";
const box = document.querySelector("#box");
const bouttons = document.querySelector("#buttons");

function initEditScreen() {
  box.append(editScreen);
  createObjectButton("Rectangle");
  createObjectButton("Circle");
}

initEditScreen();

// 오브젝트를 생성하는 함수(버튼만들어주는거까지)
function createObjectButton(name) {
  const newButton = document.createElement("button");
  newButton.classList = `button`;
  newButton.innerHTML = `${name}`;
  newButton.addEventListener("click", () => {
    let newObject = new Object(name);
    newObject.render();
  });
  bouttons.append(newButton);
}
