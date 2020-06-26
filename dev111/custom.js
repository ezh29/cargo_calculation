var container = [960, 240, 240]; //기본 사이즈 11톤
$('.container_info').html("11톤 " + container[0] + ' * ' + container[1] + ' * ' + container[2]);
//컨테이너 너비 생성
$('#container_area').append('<div id="container" style="width:' + container[1] + 'px; height:' + container[0] + 'px; "></div>');

var box = [];

var box_leng = box.length;
//  [0]박스이름,  [1]장,  [2]폭,   [3]고, [4]수량,[5]단, [6]단 묶음수 , [7]묶음 나머지,[8] 비었음, [9]다단적재
//box[0] = ['가나무역', 110, 110, 103, 12, 0];
//box[1] = ['영코퍼', 110, 150, 100, 3, 0];
//box[2] = ['이베이', 112, 110, 110, 3, 0];
//box[3] = ['아마존', 110, 60, 60, 6, 0];
//box[4] = ['퀄리', 153, 42, 72, 1, 0];


//드래그 설정
function drag_init() {
    $(function () {
        $(".box").draggable({
            snap: ".box,#container"
        });
    });
}

//컨데이너 사이즈 체크
$("input:radio[name=container_size]").click(function () {
    var radioVal = $('input[name="container_size"]:checked').val();
    switch (radioVal) {
        case "option1": //1톤 트럭 260*160*160
            container = [260, 160, 160];
            $('#container').css("height", container[0]);
            $('#container').css("width", container[1]);
            $('.container_info').html("1톤 " + container[0] + ' * ' + container[1] + ' * ' + container[2]);
            break;
        case "option2": //2.5톤 트럭 420*180*180
            container = [420, 180, 180];
            $('#container').css("height", container[0]);
            $('#container').css("width", container[1]);
            $('.container_info').html("2.5톤 " + container[0] + ' * ' + container[1] + ' * ' + container[2]);
            break;
        case "option3": //5톤 트럭 620*230*230
            container = [620, 230, 230];
            $('#container').css("height", container[0]);
            $('#container').css("width", container[1]);
            $('.container_info').html("5톤 " + container[0] + ' * ' + container[1] + ' * ' + container[2]);
            break;
        case "option4": //11톤 트럭  960*240*240
            container = [960, 240, 240];
            $('#container').css("height", container[0]);
            $('#container').css("width", container[1]);
            $('.container_info').html("11톤 " + container[0] + ' * ' + container[1] + ' * ' + container[2]);
            break;
        case "option5": //25톤 트럭 1020 * 240 * 240
            container = [1020, 240, 240];
            $('#container').css("height", container[0]);
            $('#container').css("width", container[1]);
            $('.container_info').html("25톤 " + container[0] + ' * ' + container[1] + ' * ' + container[2]);
            break;
        case "size_input":
            container[0] = Number($("#container_size_1").val());
            container[1] = Number($("#container_size_2").val());
            container[2] = Number($("#container_size_3").val());
            $('#container').css("height", container[0]);
            $('#container').css("width", container[1]);
            $('.container_info').html(container[0] + ' * ' + container[1] + ' * ' + container[2]);
            //console.log(container);

            $("#container_size_1").keyup(function () { //장
                var val = $(this).val();
                //console.log("val", val);
                container[0] = Number(val);
                $('#container').css("height", val);
                $('.container_info').html(container[0] + ' * ' + container[1] + ' * ' + container[2]);
            });
            $("#container_size_2").keyup(function () { //폭
                var val = $(this).val();
                //console.log("val", val);
                container[1] = Number(val);
                $('#container').css("width", val);
                $('.container_info').html(container[0] + ' * ' + container[1] + ' * ' + container[2]);
            });
            $("#container_size_3").keyup(function () { //고
                var val = $(this).val();
                //console.log("val", val);
                container[2] = Number(val);
                console.log('container', container);
                $('.container_info').html(container[0] + ' * ' + container[1] + ' * ' + container[2]);
            });
            break;
        default:
            //위의 값 A~E 모두 아닐때 실행할 명령문;
    }
});



//박스 추가 벨리데이션
$("#box_val_2").keyup(function () {
    var val = $(this).val();
    if (val > container[0]) {
        alert("컨테이너를 초과하는 장입니다.");
    }
});
$("#box_val_3").keyup(function () {
    var val = $(this).val();
    if (val > container[1]) {
        alert("컨테이너를 초과하는 폭입니다.");
    }
});
$("#box_val_4").keyup(function () {
    var val = $(this).val();
    if (val > container[2]) {
        alert("컨테이너를 초과하는 고입니다.");
    }
});




//박스 추가
function addBoxValue() {
    var new_box = [];


    //[0]박스이름,  [1]장,  [2]폭,   [3]고, [4]수량,[5]단, [6]단 묶음수 , [7]묶음 나머지,[8] 비었음,[9]다단적재
    new_box[0] = $('#box_val_1').val(); //박스이름
    new_box[1] = Number($('#box_val_2').val()); //장
    new_box[2] = Number($('#box_val_3').val()); //폭
    new_box[3] = Number($('#box_val_4').val()); //고
    new_box[4] = Number($('#box_val_5').val()); //수량
    new_box[5] = 1; //기본값 설정
    new_box[6] = 1; //기본값 설정
    new_box[7] = 0; //기본값 설정

    new_box[9] = Number($('#box_val_6').val()); //설정 다단적재

    if (new_box[1] == "" || new_box[2] == "" || new_box[3] == "" || new_box[4] == "") {
        alert('장폭고, 수량을 다 입력해주세요.');
    } else if (new_box[1] > container[0]) {
        alert("컨테이너를 초과하는 장입니다.");
    } else if (new_box[2] > container[1]) {
        alert("컨테이너를 초과하는 폭입니다.");
    } else if (new_box[3] > container[2]) {
        alert("컨테이너를 초과하는 고입니다.");
    } else {
        //단수와 나머지 박스 계산
        //  [0]박스이름,  [1]장,  [2]폭,   [3]고, [4]수량,[5]단, [6]단 묶음수 , [7]묶음 나머지,[8] 비었음
        var dan = parseInt(container[2] / new_box[3]); //컨테이너 높이 나누기 물건 높이 = 최대 단수
        //console.log("dan", dan);
        var box_num = ""; //단묶음수 (묶음수만큼 분할해야함)
        var box_etc = ""; //단나머지수

        if (dan >= 1) { //1단 이상으로 쌓을수 있을때 = 적재가능
            if (new_box[9] != "0") { //다단적재가 0이 아니면 단수 다단적재로 강제 입력
                dan = new_box[9];
            }
            if (new_box[4] > dan) { //최대 단수보다 수량이 많을때
                new_box[6] = parseInt(new_box[4] / dan); //수량을 단으로 나눔 = 묶음 수 (표시되는 상자 수)
                console.log("묶음 수", new_box[6]);
                new_box[5] = dan; //단수 입력
                new_box[7] = new_box[4] % dan; //묶음 나머지수
                console.log("묶음 나머지 수", new_box[7]);

            } else { //단수로 쌓을수 있으나 그보다 수량이 적거나 같을때
                //단수 = 수량 (수량이 단수가 됨)
                new_box[5] = new_box[4];
                //단묶음수 = 1
                new_box[6] = 1;
            }
            box.push(new_box);

            //박스리스트 가져오기
            box_list_init();
            ////컨테이너 박스넣기 재실행
            //boxincontainer_init();
            //console.log('box', box);

            //위치변경 안하고 박스 추가

            //박스에 심어줄 인덱스
            var idx = box.length - 1;
            //루프돌며 박스 생성
            //묶음 생성
            for (var j = 0; j < new_box[6]; j++) { //단 묶음수길이만큼 돌림
                boxincontainer(new_box, idx);
            }
            if (new_box[7] > 0) { //묶음 나머지가 있는 박스라면
                //단을 나머지로 변경하여
                new_box[5] = new_box[7];
                //한번더 박스 추가
                boxincontainer(new_box, idx);

            }





        } else { //1단 이하로 쌓아질떄 = 적재불가
            alert(new_box[0] + " 박스는 컨테이너 높이를 초과하는 박스입니다.");
        }
    }

}

function boxincontainer(new_box, idx) {

    var garosero_btn = "<span class='glyphicon glyphicon-resize-horizontal change_size' onclick='tooltip_triger_ho(" + idx + ");' box_idx='" + idx + "'></span><span class='glyphicon glyphicon-resize-vertical change_size' onclick='tooltip_triger_ver(" + idx + ");' box_idx='" + idx + "'></span><br/>";
    //박스명 체크
    var str = new_box[0];
    if (new_box[0] != "" && str.substring(str.length - 5, str.length) != "<br/>") {
        new_box[0] = new_box[0] + '<br/>';
    }

    //박스 200*200 이상이면 글씨 검장
    if (new_box[1] >= 200 && new_box[2] >= 200) {
        $('#container').append('<div class="box" style="width:' + new_box[2] + 'px; height:' + new_box[1] + 'px; background:rgb(' + new_box[1] + ',' + new_box[2] + ',' + new_box[3] + ')" box_idx="' + idx + '" ' +
            //툴팁
            'data-toggle="tooltip" data-html="true" data-placement="left" title="' + garosero_btn + new_box[0] + new_box[1] + ' * ' + new_box[2] + ' * ' + new_box[3] + '<br/>' + new_box[5] + '단"> ' +
            //장폭고 아이콘
            '<span class="glyphicon glyphicon-resize-horizontal change_size" style="color:#000;" aria-hidden="true"></span>' +
            '<span class="glyphicon glyphicon-resize-vertical change_size" style="color:#000;" aria-hidden="true"></span>' +
            //박스 정보
            '<span  class="box_info" style="color:#000;">' + new_box[0] + new_box[1] + ' * ' + new_box[2] + ' * ' + new_box[3] + '<br/>' + new_box[5] + '단<span>' +
            '</div>');
    } else {
        $('#container').append('<div class="box" style="width:' + new_box[2] + 'px; height:' + new_box[1] + 'px; background:rgb(' + new_box[1] + ',' + new_box[2] + ',' + new_box[3] + ')" box_idx="' + idx + '"' +
            //툴팁
            'data-toggle="tooltip" data-html="true" data-placement="left" title="' + garosero_btn + new_box[0] + new_box[1] + ' * ' + new_box[2] + ' * ' + new_box[3] + '<br/>' + new_box[5] + '단"> ' +
            //장폭고 아이콘
            '<span class="glyphicon glyphicon-resize-horizontal change_size" aria-hidden="true"></span>' +
            '<span class="glyphicon glyphicon-resize-vertical change_size" aria-hidden="true"></span>' +
            //박스 정보
            '<span  class="box_info">' + new_box[0] + new_box[1] + ' * ' + new_box[2] + ' * ' + new_box[3] + '<br/>' + new_box[5] + '단<span></div>');
    }
    //드래그 초기화
    drag_init();
    //툴팁 초기화
    $('[data-toggle="tooltip"]').tooltip({
        //trigger: 'click',
        delay: { "show": 0, "hide": 1500 }
    });
    //장폭고 변경 초기화
    change_init();
}
//툴팁 장폭고 버튼 트리거
function tooltip_triger_ho(idx) {
    $('.box[box_idx="' + idx + '"] .glyphicon-resize-horizontal').trigger('click');
}

function tooltip_triger_ver(idx) {
    $('.box[box_idx="' + idx + '"] .glyphicon-resize-vertical').trigger('click');
}


//박스 리스트 가져오기
function box_list_init() {
    $('#boxlist').empty(); //박스리스트 초기화
    for (var i = 0; i < box.length; i++) {
        if (box[i][9] != "0" && box[i][9] > box[i][4]) { //최대단수 설정이 수량보다 크면 뱃지 비활성화
            $('#boxlist').append('<li class="ui-state-default" style="border-color:rgb(' + box[i][1] + ',' + box[i][2] + ',' + box[i][3] + ');" value="' + box[i] + '"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>' +
                '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span><span class="badge" style="font-size:12px; margin-right:10px;background-color:#bbb;">설정 다단적재 ' + box[i][9] + '단</span>' +
                box[i][0] + '<strong>' + box[i][1] + '*' + box[i][2] + '*' + box[i][3] + '</strong>' + box[i][4] + '개' +
                '<span class="glyphicon glyphicon-resize-vertical change_size" aria-hidden="true"></span>' +
                '<span class="glyphicon glyphicon-resize-horizontal change_size" aria-hidden="true"></span>' +
                '</li>');
        } else if (box[i][9] != "0") {
            $('#boxlist').append('<li class="ui-state-default" style="border-color:rgb(' + box[i][1] + ',' + box[i][2] + ',' + box[i][3] + ');" value="' + box[i] + '"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>' +
                '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span><span class="badge" style="font-size:12px; margin-right:10px; ">설정 다단적재 ' + box[i][9] + '단</span>' +
                box[i][0] + '<strong>' + box[i][1] + '*' + box[i][2] + '*' + box[i][3] + '</strong>' + box[i][4] + '개' +
                '<span class="glyphicon glyphicon-resize-vertical change_size" aria-hidden="true"></span>' +
                '<span class="glyphicon glyphicon-resize-horizontal change_size" aria-hidden="true"></span>' +
                '</li>');
        } else {//최대단수 설정이 없으면
            $('#boxlist').append('<li class="ui-state-default" style="border-color:rgb(' + box[i][1] + ',' + box[i][2] + ',' + box[i][3] + ');" value="' + box[i] + '"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>' +
                box[i][0] + '<strong>' + box[i][1] + '*' + box[i][2] + '*' + box[i][3] + '</strong>' + box[i][4] + '개' +
                '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' +
                '<span class="glyphicon glyphicon-resize-vertical change_size" aria-hidden="true"></span>' +
                '<span class="glyphicon glyphicon-resize-horizontal change_size" aria-hidden="true"></span>' +
                '</li>');
        }

    }
    //박스리스트 삭제 다시 걸어줌
    box_list_delet();
    change_init();
}
//박스 삭제 트리거 걸기
box_list_delet();

function box_list_delet() {
    $(".ui-state-default").on("click", ".glyphicon-remove", function () { //ui-state-default glyphicon-remove 선택
        var idx = $(this).parent().index();
        console.log('idx', idx);
        var spliced = box.splice(idx, 1); //해당 인덱스 배열 삭제
        console.log('box', box);
        $(this).parent().remove(); //클릭한 개체 부모 삭제

        //컨테이너 박스넣기 재실행
        boxincontainer_init();
        //리스트 다시 가져오기
        box_list_init();

    });
}


//소터블 시작
$("#boxlist").sortable({
    placeholder: 'ul-state-highlight',
    update: function (event, ui) {
        var result = $(this).sortable('toArray', {
            attribute: 'value'
        });
        for (var i = 0; i < result.length; i++) {
            box[i] = result[i].split(',');
            for (var j = 1; j < box[i].length; j++) {
                box[i][j] = Number(box[i][j]);

            }
            console.log('box', box);
        }
        //컨테이너 박스넣기 재실행
        boxincontainer_init();
        //리스트 다시 가져오기
        box_list_init();
        //change_init();
    }
});
$("#boxlist").disableSelection();





//폭 작은순 정렬하고 컨테이너 넣기
function start_bubbleSort1() {
    bubbleSort1(box);
    //컨테이너 박스넣기 재실행
    boxincontainer_init();
    //목록 재실행
    box_list_init();
}
//장 작은순 정렬하고 컨테이너 넣기
function start_bubbleSort2() {
    bubbleSort2(box);
    //컨테이너 박스넣기 재실행
    boxincontainer_init();
    //목록 재실행
    box_list_init();
}
//작은순으로정렬
var bubbleSort1 = function (array) {
    var length = array.length;
    var i, j, temp;
    //폭 비교
    for (i = 0; i < length - 1; i++) { // 순차적으로 비교하기 위한 반복문
        for (j = 0; j < length - 1 - i; j++) { // 끝까지 돌았을 때 다시 처음부터 비교하기 위한 반복문
            if (array[j][2] > array[j + 1][2]) { // 두 수를 비교하여 앞 수가 뒷 수보다 크면
                temp = array[j]; // 두 수를 서로 바꿔준다
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
    //console.log(array);
    return array;

};
var bubbleSort2 = function (array) {
    var length = array.length;
    var i, j, temp;
    //장비교
    for (i = 0; i < length - 1; i++) { // 순차적으로 비교하기 위한 반복문
        for (j = 0; j < length - 1 - i; j++) { // 끝까지 돌았을 때 다시 처음부터 비교하기 위한 반복문
            if (array[j][1] > array[j + 1][1]) { // 두 수를 비교하여 앞 수가 뒷 수보다 크면
                temp = array[j]; // 두 수를 서로 바꿔준다
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
    //console.log(array);
    return array;

};

//박스 넣기
function boxincontainer_init() {
    $('#container').empty(); //컨테이너 내용물 초기화

    //루프돌며 박스 생성
    for (var i = 0; i < box.length; i++) {
        //console.log(box[i][0], "번 박스");

        //묶음 생성
        for (var j = 0; j < box[i][6]; j++) { //단 묶음수길이만큼 돌림

            boxincontainer(box[i], i);

        }
        if (box[i][7] > 0) { //묶음 나머지가 있는 박스라면

            //단을 나머지로 변경하여
            box[i][5] = box[i][7];
            //한번더 박스 추가
            boxincontainer(box[i], i);

        }

    }

}


//적재함 토글
$("#togle_btn").on("click", function () {
    $("#togle_body").toggle(300);
});
//박스추가 토글
$("#togle_btn2").on("click", function () {
    $("#togle_body2").toggle(300);
});

//전체 토글
$("#togle_btn3").on("click", function () {
    $(".all_toggle_body").toggle(300);
});

//박스목록 비우기
function all_delet_boxlist() {
    var con_test = confirm("박스목록을 모두 지우시겠습니까?");
    if (con_test == true) {
        box = [];
        //컨테이너 박스넣기 재실행
        boxincontainer_init();
        //목록 재실행
        box_list_init();
    }

}



//박스 장폭 변경
function ch_garo(i) {
    //i번쨰 배열의 장폭 변경
    var d = "";
    console.log("box[i][1]", box[i][1]);
    d = box[i][1]; //d에 장 담아놓음
    box[i][1] = box[i][2]; //장에 폭 넣음
    box[i][2] = d; //폭에 장 넣음
}
//박스 폭고 변경
function ch_sero(i) {
    //i번쨰 배열의 폭고 변경
    var d = "";
    console.log("box[i][2]", box[i][2]);
    d = box[i][2]; //d에 폭 담아놓음
    box[i][2] = box[i][3]; //폭에 고 넣음
    box[i][3] = d; //고에 폭 넣음
}

//장폭고 변환 함수 - 박스 생성시마다 호출함
function change_init() {

    //컨테이너 박스 내 장폭고 변경 버튼
    ////배열과 박스의 가로 세로 css만 바뀜
    ////장폭 토글
    $(".box .glyphicon-resize-horizontal.change_size").on("click", function () {
        var par = $(this).parent();
        var val = $(this).parent().attr("box_idx");
        var i = val;
        var this_box = $('.box[box_idx="' + i + '"]');
        console.log("눌림:", i);
        console.log("변경 전 box[i]", box[i]);

        ch_garo(i);
        console.log("변경 후 box[i]", box[i]);
        this_box.css("height", box[i][1]);
        this_box.css("width", box[i][2]);
        this_box.css("background", 'rgb(' + box[i][1] + ',' + box[i][2] + ',' + box[i][3] + ')');
        in_txt(i, par);
        //박스목록 다시 불러오기
        box_list_init();
    });
    $(".box .glyphicon-resize-horizontal.change_size").on("click", function () {
        var par = $(this).parent();
        var val = $(this).parent().attr("box_idx");
        var i = val;
        var this_box = $('.box[box_idx="' + i + '"]');
        console.log("눌림:", i);
        console.log("변경 전 box[i]", box[i]);

        ch_garo(i);
        console.log("변경 후 box[i]", box[i]);
        this_box.css("height", box[i][1]);
        this_box.css("width", box[i][2]);
        this_box.css("background", 'rgb(' + box[i][1] + ',' + box[i][2] + ',' + box[i][3] + ')');
        in_txt(i, par);
        //박스목록 다시 불러오기
        box_list_init();
    });
    ////폭고 토글
    $(".box .glyphicon-resize-vertical.change_size, .tooltip-inner .glyphicon-resize-vertical.change_size").on("click", function () {
        var par = $(this).parent();
        var val = $(this).parent().attr("box_idx");
        var i = val;
        var this_box = $('.box[box_idx="' + i + '"]');
        console.log("눌림:", i);
        ch_sero(i);
        console.log("변경 후 box[i]", box[i]);
        this_box.css("width", box[i][2]);
        this_box.css("background", 'rgb(' + box[i][1] + ',' + box[i][2] + ',' + box[i][3] + ')');
        in_txt(i, par);
        //박스목록 다시 불러오기
        box_list_init();
    });

    //박스 리스트 내 장폭고 변경 버튼
    ////배열과 박스의 가로 세로 css 바뀜
    ////장폭 토글
    $("#boxlist .glyphicon-resize-horizontal.change_size").on("click", function () {
        var idx = $(this).parent().index();
        var i = idx;
        console.log("idx", idx, "i", i);
        var this_box = $('.box[box_idx="' + i + '"]');
        ch_garo(i);
        console.log("변경 후 box[i]", box[i]);
        this_box.css("height", box[i][1]);
        this_box.css("width", box[i][2]);
        this_box.css("background", 'rgb(' + box[i][1] + ',' + box[i][2] + ',' + box[i][3] + ')');
        in_txt(i, this_box);
        //박스목록 다시 불러오기
        box_list_init();
    });
    ////폭고 토글
    $("#boxlist .glyphicon-resize-vertical.change_size").on("click", function () {
        var idx = $(this).parent().index();
        var i = idx;
        console.log("idx", idx, "i", i);
        var this_box = $('.box[box_idx="' + i + '"]');
        ch_sero(i);
        console.log("변경 후 box[i]", box[i]);
        this_box.css("width", box[i][2]);
        this_box.css("background", 'rgb(' + box[i][1] + ',' + box[i][2] + ',' + box[i][3] + ')');
        in_txt(i, this_box);
        //박스목록 다시 불러오기
        box_list_init();
    });

}

//장폭고 조절 후 내부 치수 변경
function in_txt(i, par) {
    //박스 200*200 이상이면 글씨 검장
    if (box[i][1] >= 200 && box[i][2] >= 200) {
        par.html('<span class="glyphicon glyphicon-resize-horizontal change_size" style="color:#000;" aria-hidden="true"></span>' +
            '<span class="glyphicon glyphicon-resize-vertical change_size" style="color:#000;" aria-hidden="true"></span>' +
            '<span  class="box_info" style="color:#000;">' + box[i][0] + box[i][1] + ' * ' + box[i][2] + ' * ' + box[i][3] + '<br/>' + box[i][5] + '단<span>');
    } else {
        par.html('<span class="glyphicon glyphicon-resize-horizontal change_size" aria-hidden="true"></span>' +
            '<span class="glyphicon glyphicon-resize-vertical change_size" aria-hidden="true"></span>' +
            '<span  class="box_info">' + box[i][0] + box[i][1] + ' * ' + box[i][2] + ' * ' + box[i][3] + '<br/>' + box[i][5] + '단<span>');
    }
    change_init();
}
