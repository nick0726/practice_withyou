// 클래스 이름에 동사 안들어가기 + 첫글자 대문자로 하기
// ? 앞에서처럼 클래스 명으로 정의하는게 아니라, extends해서 정의하는 방향으로 가는게 맞는 것 같음
class Object {
  constructor(name) {
    this.name = name; // 여기서 버튼의 이름을 들고와서 className으로 넣어줘도 괜찮을 듯
    this.$node = this.createObjectElement();
    this.pushButtonESC();
    this.deleteObject();
    this.moveObject();
  }

  createObjectElement() {
    const elObject = document.createElement("div");
    elObject.className = `${this.name}`;
    return elObject;
  }

  // ? 어떻게 구현할 것인가를 적어보자 -> 말로 풀어놓게되면 구현할 수 있음
  // * 다음의 내용들은 모든 Object의 공통사항들임
  // * 단, text의 경우 일반 Object와 다른 점이 있으니, 상속받아서 같은 이름에 다른 메서드를 달아서 바꿔주는 방향으로 가면 될것같다
  // * ex) 크기조절, 글씨체 등 조금 다른 경우가 있다.

  // TODO : 선택 취소 -> ESC 누르면 취소
  pushButtonESC() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.$node.classList.remove("selected");
      }
    });
  }

  // TODO : 삭제하기
  // ! Advanced : x 버튼을 생성시켜서 누르면 삭제되게 -> 좀 더 어려울듯..?
  deleteObject() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" || e.key === "Delete") {
        const target = document.querySelectorAll(".selected");
        if (target.length) {
          for (let i = 0; i < target.length; i++) {
            const element = document.getElementsByClassName("selected")[0];
            element.parentNode.removeChild(element);
          }
        }
      }
    });
  }

  // TODO : 수정(크기조절)하기
  // * 도형이나, 사진들은 그냥 크기만 조절시키면 되는데, text는 아예 다르니, 텍스트를  따로 만들어야 할 것 같음
  // * Object 상속 받아서 modify정도만 따로 수정해서 css의 font-size 수정시키는 방향으로 하면 되지 않을까..
  modifyObject() {
    // 사이즈 조절, 회전을 어떻게 구현할 것인가
    // 클릭하고 -> 드래그 한 거리를 비례해서 기존 css의 값들을 비례로 줄이거나 늘려주면 되지 않을까...
  }

  // TODO : 이동하기(드래그 앤 드롭)
  moveObject() {
    // ! 왜 몇번 클릭하면 이거 따라다니냐... 킹받네
    // * 좌표값의 상한과 하한을 정해줘야 할 것 같음 -> 테두리 밖으로 못 나가도록 -> 사실 나가도 상관없음 -> 왜냐하면 옆에 치워놓고 작업하고 싶을 경우가 있음
    // * 상의해보기
    const target = this.$node;
    // 현재 도형의 중앙점 좌표(x, y) 특정좌표(x + 10, y + 10)로 이동하면
    // 현재 도형의 css에서 x방향으로 +10, y방향으로 +10 이런식으로 구현하면 되지 않을까...

    // ? Drag & Drop
    target.onmousedown = (e) => {
      // TODO : 선택했을때, 효과주기
      // ! 왜 클릭하면 내려감..?
      e.target.classList.add("selected");
      // 클릭한 위치를 고정적으로 유지
      let shiftX = e.clientX - target.getBoundingClientRect().left; // clientX : 이벤트가 발생한 곳의 수평좌표
      let shiftY = e.clientY - target.getBoundingClientRect().top;
      // e.getBoundingClientRect() : 뷰포트에 상대적인 위치에 대한 적보를 나타내는 객체를 반환
      // target.getBoundingClientRect() = {x: 296, y: 20, width: 100, height: 100, top: 20, …} -> 이런 형태임
      target.style.position = "absolute";
      target.style.zIndex = 1000;

      editScreen.append(target);

      // 클릭한 위치로부터 이동좌표를 나타내는 함수
      function moveAt(pageX, pageY) {
        target.style.left = pageX - shiftX + "px";
        target.style.top = pageY - shiftY + "px";
      }

      moveAt(e.pageX, e.pageY);

      // 마우스 움직임에 따라서 좌표값 변환
      function onMouseMove(e) {
        moveAt(e.pageX, e.pageY);
      }

      editScreen.addEventListener("mousemove", onMouseMove);

      // 클릭해제하면 이벤트 제거
      target.onmouseup = () => {
        editScreen.removeEventListener("mousemove", onMouseMove);
        target.onmouseup = null;
      };

      // 마우스가 벗어나면 이벤트 제거
      target.onmouseout = () => {
        editScreen.removeEventListener("mousemove", onMouseMove);
        target.onmouseout = null;
      };
    };
    target.ondragstart = () => false;
  }

  render() {
    editScreen.append(this.$node);
  }
}
