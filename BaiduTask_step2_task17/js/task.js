/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
$().ready(() => {

    // 以下两个函数用于随机模拟生成测试数据
    function getDateStr(dat) {
        var y = dat.getFullYear();
        var m = dat.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = dat.getDate();
        d = d < 10 ? '0' + d : d;
        return y + '-' + m + '-' + d;
    }

    function randomBuildData(seed) {
        var returnData = {};
        var dat = new Date("2016-01-01");
        var datStr = ''
        for (var i = 1; i < 92; i++) {
            datStr = getDateStr(dat);
            returnData[datStr] = Math.ceil(Math.random() * seed);
            dat.setDate(dat.getDate() + 1);
        }
        return returnData;
    }

    var aqiSourceData = { //每个城市每个月的数据
        "北京": randomBuildData(500),
        "上海": randomBuildData(300),
        "广州": randomBuildData(200),
        "深圳": randomBuildData(100),
        "成都": randomBuildData(300),
        "西安": randomBuildData(500),
        "福州": randomBuildData(100),
        "厦门": randomBuildData(100),
        "沈阳": randomBuildData(500)
    };

    // 用于渲染图表的数据
    var chartData = {};

    // 记录当前页面的表单选项
    var pageState = {
        nowSelectCity: -1,
        nowGraTime: "day"
    }

    /**
     * 渲染图表
     */
    function renderChart(city = "北京", mode = 1) {
        console.log(city,mode);
        let canvas = document.createElement("canvas");
        canvas.id = "canvas";
        let box = document.getElementById("canvas_box");
        box.appendChild(canvas);
        let ctx = canvas.getContext('2d');
        ctx.strokeStyle = '#FF0000';
        let data = aqiSourceData[city];
        let data_arr = [];
        let temp_max = 0;
        let week_count = 0; //week计数器
        let month_count = 0; //month月份
        let xy_arr = [];
        if (mode == 0) { //day
            for (let p in data) {
                if (data[p] * 1 >= temp_max) {
                    temp_max = data[p];
                }
                data_arr.push(data[p]);
            }
            document.getElementById("canvas").width = data_arr.length * 20;
            document.getElementById("canvas").height = temp_max + 10;
            document.getElementById("canvas_box").height = temp_max + 30;

            for (let i = 0; i < data_arr.length; i++) {
                if (i == data_arr.length - 1) {
                    let x = i * 20;
                    let y = temp_max - data_arr[i];
                    let width = 10;
                    let height = data_arr[i];
                    ctx.fillRect(x, y, width, height);
                } else {
                    let x = i * 20;
                    let y = temp_max - data_arr[i];
                    let width = 10;
                    let height = data_arr[i];
                    ctx.strokeRect(x, y, width, height);
                }
            }
        } else if (mode == 1) { //week
            let week_box = 0;
            let week_day = 0;
            let week_arr = [];
            for (let p in data) {
                let now = new Date(p);
                week_day++;
                week_box += data[p];
                if (now.getDay() == 6) {
                    let temp = [];
                    week_count++;
                    temp.push(week_count);
                    temp.push(week_box / week_day);
                    week_day = 0;
                    week_box = 0;
                    week_arr.push(temp);
                }
            }
            let pure_data = week_arr.map((x) => {
                return x[1];
            });
            for (let i = 0; i < pure_data.length; i++) {
                if (pure_data[i] * 1 >= temp_max) {
                    temp_max = pure_data[i];
                }
            }
            document.getElementById("canvas").width = pure_data.length * 20;
            document.getElementById("canvas").height = temp_max + 10;
            document.getElementById("canvas_box").height = temp_max + 30;
            for (let i = 0; i < pure_data.length; i++) {
                if (i == pure_data.length - 1) {
                    let x = i * 20;
                    let y = temp_max - pure_data[i];
                    let width = 10;
                    let height = pure_data[i];
                    ctx.fillRect(x, y, width, height);
                } else {
                    let x = i * 20;
                    let y = temp_max - pure_data[i];
                    let width = 10;
                    let height = pure_data[i];
                    ctx.strokeRect(x, y, width, height);
                }
            }
        } else if (mode == 2) { //month
      
            let month_box = 0;
            let month_day = 0;
            let month_arr = [];
            for (let p in data) {
                let now = new Date(p);
                month_day++;
                month_box += data[p];
                if (now.getDate() == mGetDate(now.getFullYear(), now.getMonth() + 1)) {
                    let temp = [];
                    month_count++;
                    temp.push(month_count);
                    temp.push(month_box / month_day); //对于二维数组使用map嵌套map的方式，进行月份和week的区分
                    month_day = 0;
                    month_box = 0;
                    month_arr.push(temp);
                }

            }
            let pure_data = month_arr.map((x) => {
                return x[1];
            });
            for (let i = 0; i < pure_data.length; i++) {
                if (pure_data[i] * 1 >= temp_max) {
                    temp_max = pure_data[i];
                }
            }
            document.getElementById("canvas").width = pure_data.length * 20;
            document.getElementById("canvas").height = temp_max + 10;
            document.getElementById("canvas_box").height = temp_max + 30;
            for (let i = 0; i < pure_data.length; i++) {
                if (i == pure_data.length - 1) {
                    let x = i * 20;
                    let y = temp_max - pure_data[i];
                    let width = 10;
                    let height = pure_data[i];
                    ctx.fillRect(x, y, width, height);
                } else {
                    let x = i * 20;
                    let y = temp_max - pure_data[i];
                    let width = 10;
                    let height = pure_data[i];
                    ctx.strokeRect(x, y, width, height);
                }
            }

        }

    }


    function mGetDate(year, month) {
        var d = new Date(year, month, 0);
        return d.getDate();
    }
    /**
     * 日、周、月的radio事件点击时的处理函数
     */
    function graTimeChange(check_clice) {
        let choose = check_clice;
        // 确定是否选项发生了变化 
        $("#form-gra-time label input").each((item, element) => {
            let that = element;
            $("#canvas_box").html("");
            renderChart(city = "北京", mode = 0);
            $(element).on("click", () => {
                if (that.value == choose) { //与之前相同不做处理

                } else { //与之前有区别，需要更新视图
                    choose = that.value;
                    if (choose == "day") {
                        $("#canvas_box").html("");
                        renderChart(city = "北京", mode = 0);
                    } else if (choose == "week") {
                        $("#canvas_box").html("");
                        renderChart(city = "北京", mode = 1);
                    } else if (choose == "month") {
                        $("#canvas_box").html("");
                        renderChart(city = "北京", mode = 2);
                    }
                }
            });
        });
        // 设置对应数据

        // 调用图表渲染函数
    }

    /**
     * select发生变化时的处理函数
     */
    function citySelectChange(city_val) {

        // 确定是否选项发生了变化 
        let select_val = false;

        // 设置对应数据
        $("#city-select").on("click", () => {
            if (select_val) {
                let city_data = $("#city-select").val();
                let time_data = "";
                $("#form-gra-time label input").each((item, element) => {
                    if (element.checked) {
                        if(element.value == "day"){
                            time_data = 0;
                        }else if(element.value == "week"){
                            time_data = 1;
                        }else if(element.value == "month"){
                            time_data = 2;
                        } 
                    }
                });
                $("#canvas_box").html("");
                renderChart(city_data,time_data);
            }
            select_val = !select_val;
        });

        // 调用图表渲染函数
    }

    /**
     * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
     */

    function initGraTimeForm() {
        $("#form-gra-time label input").each((item, element) => {
            console.log(element.checked);
            if (element.checked) {
                graTimeChange(element.value);
            }
        });

    };

    /**
     * 初始化城市Select下拉选择框中的选项
     */
    function initCitySelector() {
        // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
        let city_arr = [];
        let html_str = "";
        for (let i in aqiSourceData) {
            city_arr.push(i);
            html_str += `<option>${i}</option>`
        }
        $("#city-select").html(html_str);
        // 给select设置事件，当选项发生变化时调用函数citySelectChange
        let city = console.log($("#city-select").val());
        citySelectChange(city);


    }



    /**
     * 初始化函数
     */
    function init() {
        initGraTimeForm()
        initCitySelector();
    }

    init();
})