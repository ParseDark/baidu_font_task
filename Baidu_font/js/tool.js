//实现单选框过程中，偶然间实现了多选框。。。。
that.radio.each(function () {
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
多选css样式
{
    width: 8px;
    height: 8px;
    display: inline - block;
    position: relative;
    top: 4px;
    margin - left: 10px;
    box - shadow: 0 0 0 2px #fff, 0 0 0 4px #189;
}

//单选框点击事件(单态按钮)
that.radio.each(function () {
    this.checked = false;
});
for (let i = 0; i < that.radio.length; i++) {
    that.radio[i].index = i;
    $(that.radio[i]).on("click", function () {
        this.checked = !this.checked;//true
        for (let j = 0; j < that.radio.length; j++) {
            if (j != this.index) {
                that.radio[j].checked = !this.checked;//false
                $(that.radio[j]).css("background", "#fff");
            } else if (j == this.index) {
                $(that.radio[j]).css("background", "#189");
            }
        }
    });
}
单选css样式
{
    width: 8px;
    height: 8px;
    border - radius: 50 %;
    background - color: #fff;
    display: inline - block;
    position: relative;
    top: 4px;
    margin - left: 10px;
    box - shadow: 0 0 0 2px #fff, 0 0 0 4px #189;
}



//下拉框点击事件
that.clickBox.each(function () {
    $(this).on("click", function () {
        that.draw_box.toggleClass("active");

    });
});
that.draw_li_arr.each(function () {
    $(this).on("click", function () {
        that.draw_box.toggleClass("active");
        that.clickBox.val(this.innerHTML);
    });
});
$(document)
    .on('click', function (e) {
        let a = $(e.target)[0];
        //这里最主要的问题是，必须把点击的对象转换为可以与下拉框输入框对比确认的元素，以此作为判断‘条件’
        if ($(e.target)[0] != that.draw_box[0] && $(e.target)[0] != that.clickBox[0]) {
            that.draw_box.removeClass("active");
        }
    });