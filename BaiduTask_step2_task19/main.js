window.onload = () => {
    function BoxOperation(input_box, box_arr, btn_arr, box_canvas, sort_btn) { //构造函数模式
        this.input_box = input_box;
        this.box_arr = box_arr;
        this.btn_arr = btn_arr;
        this.box_canvas = box_canvas;
        this.sort_btn = sort_btn;


        this.init = function () {//入口函数
            let that = this;
            that.btn_function();
            that.render_data();
            that.sort_data();
        }
        this.getInput_val = () => {//获取输入框的值
            let that = this;
            return that.input_box.value;
        }
        this.getBox_val = () => {//获取cube的父级元素，用于添加cube
            let that = this;
            return that.box_arr.innerHTML;
        }
        this.leftEnter = () => {//左边插入cube
            let input_val = input_box.value;
            if (input_val) {
                let input_val = input_box.value;
                let input_part = `<section class = 'box'>${input_val}</section>`;
                let box_str = input_part + box_arr[0].innerHTML;
                box_arr[0].innerHTML = box_str;
            }
        }
        this.rightEnter = () => {//右边插入cube
            let input_val = input_box.value;
            if (input_val) {
                let input_val = input_box.value;
                let input_part = `<section class = 'box'>${input_val}</section>`;
                let box_str = box_arr[0].innerHTML + input_part;
                box_arr[0].innerHTML = box_str;
            }
        }

        this.leftDel = () => {//从左边开始删除cube
            let childNodes_arr = box_arr[0].childNodes;
            if (box_arr[0].innerHTML != 0) {
                for (let i = 0; i < childNodes_arr.length; i++) {
                    if (childNodes_arr[i].nodeType == 1) {
                        alert(childNodes_arr[i].innerHTML);
                        box_arr[0].removeChild(childNodes_arr[i])
                        break;
                    }
                }
            } else {
                console.log("没啦！")
            }
        }
        this.rightDel = () => {//从右边开始删除
            let childNodes_arr = box_arr[0].childNodes;
            if (box_arr[0].innerHTML != 0) {
                for (let i = childNodes_arr.length - 1; i > 0; i--) {
                    if (childNodes_arr[i].nodeType == 1) {
                        alert(childNodes_arr[i].innerHTML);
                        box_arr[0].removeChild(childNodes_arr[i])
                        break;
                    }
                }
            } else {
                console.log("没啦！");
            }
        }
        this.btn_function = () => {//操作按钮合集
            let that = this;
            for (let i = 0; i < btn_arr.length; i++) {
                if (i == 0) { //左入
                    btn_arr[i].addEventListener("click", () => {
                        if (that.testing_num()) {
                            alert("超过60了，不能再添加了。");
                        } else {
                            if (!that.testing_input()) { //不符合要求
                                alert("只能输入10-100以内的数字哦。")
                            } else {

                                that.leftEnter();
                                that.box_canvas.innerHTML = "";
                                that.render_data();
                            }
                        }
                    });
                } else if (i == 1) { //右入
                    btn_arr[i].addEventListener("click", () => {
                        if (that.testing_num()) {
                            alert("超过60了，不能再添加了。");
                        } else {
                            if (!that.testing_input()) { //不符合要求
                                alert("只能输入10-100以内的数字哦。")
                            } else {
                                that.rightEnter();
                                that.box_canvas.innerHTML = "";
                                that.render_data();
                            }
                        }

                    });
                } else if (i == 2) { //左出
                    btn_arr[i].addEventListener("click", () => {
                        that.leftDel();
                        that.box_canvas.innerHTML = "";
                        that.render_data();
                    });
                } else if (i == 3) { //右出
                    btn_arr[i].addEventListener("click", () => {
                        that.rightDel();
                        that.box_canvas.innerHTML = "";
                        that.render_data();
                    });
                }

            }
        }
        this.testing_num = () => { //检测如果超过60则弹出提示
            let that = this;
            if (that.box_arr[0].querySelectorAll(".box").length >= 60) {
                return true;
            }
        }
        this.testing_input = () => {//检测输入框内数值是否符合要求
            let that = this;
            let reg = /^\d{2,3}$/;
            if (reg.test(that.input_box.value) && that.input_box.value * 1 <= 100) {
                return true;
            }
        }
        this.make_data = () => {//对cube内的数据进行提取
            let that = this;
            let data_arr = [];
            for (let i = 0; i < box_arr[0].childNodes.length; i++) {
                if (box_arr[0].childNodes[i].nodeType == 1) {
                    data_arr.push(box_arr[0].childNodes[i].innerHTML);
                }
            }
            return data_arr;
        }
        this.render_data = (data_arr = this.make_data()) => { //根据数据渲染函数
            let that = this;
            let canvas = document.createElement("canvas");
            canvas.id = "canvas_";
            that.box_canvas.appendChild(canvas);
            let ctx = canvas.getContext("2d");
            ctx.strokeStyle = '#FF1563';
            let width = 10;
            let canvas_data = [];
            let max = 0;
            for (let i = 0; i < data_arr.length; i++) { //本来想基于数据的最大值进行一个适配
                if (data_arr[i] >= max) {
                    max = data_arr[i];
                }
            }
            if (max < 150) {
                max = 150;
            }
            for (let i = 0; i < data_arr.length; i++) {
                let x = i * 20;
                let y = max - data_arr[i];
                let width = 10;
                let height = data_arr[i];
                ctx.fillRect(x, y, width, height);
            }
        }
        this.sort_data = () => {//排序按钮点击功能
            let that = this;
            sort_btn.addEventListener("click", () => {
                let data_arr = that.make_data();
                let new_arr = that.sort_fn(data_arr);
                console.log(new_arr)
                that.box_canvas.innerHTML = "";
                that.render_data(new_arr);
            });
        }
        this.sort_fn = (arr) => { //就冒泡排序啊
            //好他娘的想用高阶函数啊。sort().
            let len = arr.length;
            for (let i = 0; i < len; i++) {
                for (let j = 0; j < len - 1 - i; j++) { //注意了，下标从零开始
                    if (arr[j] > arr[j + 1]) { // 相邻元素两两对比
                        let temp = arr[j + 1]; // 元素交换
                        arr[j + 1] = arr[j]; //每次排序的最后一个是最大的。下一次排序不排最后一个
                        arr[j] = temp;
                    }
                }
            }
            return arr;
        }
    }

    let input_box = document.querySelector(".input_box");
    let box_arr = document.querySelectorAll(".box_big");
    let btn_arr = document.querySelectorAll(".button_");
    let box_canvas = document.querySelector(".box_canvas");
    let sort_btn = document.querySelector(".sort_btn");
    let main = new BoxOperation(input_box, box_arr, btn_arr, box_canvas, sort_btn);
    main.init();

}