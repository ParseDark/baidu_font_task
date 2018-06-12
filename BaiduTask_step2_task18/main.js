window.onload = () => {
    function BoxOperation(input_box, box_arr, btn_arr) {
        //定义每个实例应有的属性
        //这样每个实例对自身属性进行修改则不会在原型链上修改
        this.input_box = input_box;
        this.box_arr = box_arr;
        this.btn_arr = btn_arr;
    }

    BoxOperation.prototype = { //定义共有的方法和公有属性
        constructor: BoxOperation,
        btn_function: () => {
            let that = this;
            for (let i = 0; i < btn_arr.length; i++) {
                let that = btn_arr[i];
                if (i == 0) { //左入
                    btn_arr[i].addEventListener("click", () => {
                        let input_val = input_box.value;
                        if (input_val) {
                            let input_val = input_box.value;
                            let input_part = `<section class = 'box'>${input_val}</section>`;
                            let box_str = input_part + box_arr[0].innerHTML;
                            box_arr[0].innerHTML = box_str;
                        }
                    });
                } else if (i == 1) { //右入
                    btn_arr[i].addEventListener("click", () => {
                        let input_val = input_box.value;
                        if (input_val) {
                            let input_val = input_box.value;
                            let input_part = `<section class = 'box'>${input_val}</section>`;
                            let box_str = box_arr[0].innerHTML + input_part;
                            box_arr[0].innerHTML = box_str;
                        }
                    });
                } else if (i == 2) { //左出
                    btn_arr[i].addEventListener("click", () => {
                        let childNodes_arr = box_arr[0].childNodes;
                        if (box_arr[0].innerHTML != 0) {
                            for (let i = 0; i < childNodes_arr.length; i++) {
                                if (childNodes_arr[i].nodeType == 1) {
                                    alert(childNodes_arr[i].innerHTML);
                                    box_arr[0].removeChild(childNodes_arr[i])
                                    break;
                                }
                            }
                        }else{
                            console.log("没啦！")
                        }
                    });
                } else if (i == 3) { //右出
                    btn_arr[i].addEventListener("click", () => {
                        let childNodes_arr = box_arr[0].childNodes;
                        if (box_arr[0].innerHTML != 0) {
                            for (let i = childNodes_arr.length - 1; i > 0; i--) {
                                if (childNodes_arr[i].nodeType == 1) {
                                    alert(childNodes_arr[i].innerHTML);
                                    box_arr[0].removeChild(childNodes_arr[i])
                                    break;
                                }
                            }
                        }else{
                            console.log("没啦！");
                        }
                    });
                }

            }


        },

    }
    let input_box = document.querySelector(".input_box");
    let box_arr = document.querySelectorAll(".box_big");
    let btn_arr = document.querySelectorAll(".button_");
    let main = new BoxOperation(input_box, box_arr, btn_arr);
    main.btn_function();
}




let a = (c,b)=>{
    this.c = c;
    this.b = b;

}

