$(document).ready(function () {
    $(".img_box").html("<a href = '#'>aaa</a>");
    function Main_(){
        this.img_box = $(".img_box");
        this.clickBox = $(" #choose_city");//点击触发下拉元素
        this.draw_box = $(".input_box_ .draw_box");
        this.draw_li_arr = $(".draw_box  ul li");
        this.radio = $(".input_box_ .radio");
        this.bo = $("#sidebar .input_box_ bo");
       
        
    }
    Main_.prototype = {
        createImg: function(arr){
            let that = this;
            let str = '';
            for(let i = 0;i < arr.length;i++){
                str += "<section class = 'img_arr img_" + i +"'><span>这是一些图片</span><img alt = 'This is some img' src = '"+  arr[i]  +"'></section>";  
            }
            that.img_box.html(str);
            that.img_box.find(".img_arr img").each(function(){
                $(this).css("width","100%");
                $(this).css("display", "inline-block");
            });
        },
        clickEvent: function(){
            let that = this;
            //下拉框点击事件
            that.clickBox.each(function(){
                $(this).on("click",function(){
                    that.draw_box.toggleClass("active");

                });
            });
            that.draw_li_arr.each(function(){
                $(this).on("click",function(){
                    that.draw_box.toggleClass("active");
                    that.clickBox.val(this.innerHTML);
                });
            });
            $(document)
                .on('click', function (e) {

                    let a = $(e.target)[0];
                    //这里最主要的问题是，必须把点击的对象转换为可以与下拉框输入框对比确认的元素，以此作为判断‘条件’
                    if ($(e.target)[0] != that.draw_box[0] && $(e.target)[0] != that.clickBox[0]){
                            that.draw_box.removeClass("active");
                    }
                });
            //单选框点击事件(单态按钮)
            that.radio.each(function(){
                this.checked = false;
            });
            for (let i = 0; i < that.radio.length;i++){
                that.radio[i].index = i;
                $(that.radio[i]).on("click",function(){
                    this.checked = !this.checked;//true
                    for (let j = 0; j < that.radio.length;j++){
                        if(j != this.index){
                            that.radio[j].checked = !this.checked;//false
                            $(that.radio[j]).css("background", "#fff");
                        }else if(j == this.index){
                            $(that.radio[j]).css("background", "#189");
                        }
                    }
                });
            }
            //多选框点击事件
            that.bo.each(function () {
                this.checked = 1;
                $(this).on("click", function () {
                    if (this.checked == 0) {
                        this.checked = 1;
                    } else {
                        this.checked = 0;
                    }
                    if (this.checked == 0) {
                        $(this).css("background", "#189");
                    } else {
                        $(this).css("background", "#fff");
                    }
                });
            });



        }
    }


    main = new Main_();
    let img_srcArr = [];
    for(let i = 0;i < 6;i++){
       let str = "";
        str += "./imges/" + (i + 1) + ".jpg";
       img_srcArr.push(str);
    }
    main.createImg(img_srcArr);
    main.clickEvent();



});