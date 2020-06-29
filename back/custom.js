//박스 컬러 나열
var color = ['4B77BE', '4DB3A2', 'D05454', 'F3C200', '5C9BD1', '8E44AD', '1BBC9B', '4B77BE', '4DB3A2', 'D05454', 'F3C200', '5C9BD1', '8E44AD', '1BBC9B'];

var container = [960, 240, 240]; //기본 사이즈 11톤
$('.container_info').html("11톤 " + container[0] + ' * ' + container[1] + ' * ' + container[2]);

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
        $(".box").draggable({ snap: ".box,#container" });
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
    } else if ((new_box[9] * new_box[3]) > container[2]) {
        alert("최대단수*박스 높이가 컨테이너 높이를 초과합니다.");
    } else  {
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

            // 박스 분할하여 추가하기 체크여부 확인
            if ($("input:checkbox[name=box_abxolute]").is(":checked") == true) { //박스 분할하기 체크되어있으면


            } else { //체크 안했으면 그냥 배열 추가
                console.log("노체크 배열 추가");
                box.push(new_box);
            }

            console.log("box", box);

            //박스리스트 가져오기
            box_init();
            ////컨테이너 박스넣기 재실행
            boxincontainer();
            //console.log('box', box);
            
      
            drag_init();

        } else { //1단 이하로 쌓아질떄 = 적재불가
            alert(new_box[0] + " 박스는 컨테이너 높이를 초과하는 박스입니다.");
        }
    }

}



//박스 리스트 가져오기
function box_init() {
    $('#boxlist').empty(); //박스리스트 초기화
    for (var i = 0; i < box.length; i++) {
        if (box[i][9] != "0" && box[i][9] > box[i][4]) { //다단적재가 수량보다 크면 뱃지 비활성화
            $('#boxlist').append('<li class="ui-state-default" style="border-color:rgb(' + box[i][1] + ',' + box[i][2] + ',' + box[i][3] + ');" value="' + box[i] + '"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>' +
                box[i][0] + '<strong>' + box[i][1] + '*' + box[i][2] + '*' + box[i][3] + '</strong>' + box[i][4] + '개' +
                '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span><span class="badge" style="font-size:12px; margin-right:10px;background-color:#bbb;">설정 다단적재 ' + box[i][9] + '단</span>' +
                '</li>');
        } else if (box[i][9] != "0") {
            $('#boxlist').append('<li class="ui-state-default" style="border-color:rgb(' + box[i][1] + ',' + box[i][2] + ',' + box[i][3] + ');" value="' + box[i] + '"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>' +
                box[i][0] + '<strong>' + box[i][1] + '*' + box[i][2] + '*' + box[i][3] + '</strong>' + box[i][4] + '개' +
                '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span><span class="badge" style="font-size:12px; margin-right:10px; ">설정 다단적재 ' + box[i][9] + '단</span>' +
                '</li>');
        } else {
            $('#boxlist').append('<li class="ui-state-default" style="border-color:rgb(' + box[i][1] + ',' + box[i][2] + ',' + box[i][3] + ');" value="' + box[i] + '"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>' +
                box[i][0] + '<strong>' + box[i][1] + '*' + box[i][2] + '*' + box[i][3] + '</strong>' + box[i][4] + '개' +
                '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' +
                '</li>');
        }

    }
    //박스리스트 삭제 다시 걸어줌
    box_list_delet();
}
//박스 삭제 트리거 걸기
box_list_delet();

function box_list_delet() {
    $(".ui-state-default").on("click", ".glyphicon-remove", function () { //ui-state-default glyphicon-remove 선택
        var idx = $(this).parent().index();
        console.log('idx', idx);
        var spliced = box.splice(idx, 1); //해당 인덱스 배열 삭제
        console.log('box', box);
        $(this).parent().remove(); //this(btnDel)의 부모(td)의 부모(tr)를 삭제

        //컨테이너 박스넣기 재실행
        boxincontainer();
        //리스트 다시 가져오기
        box_init();

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
        boxincontainer();
        //리스트 다시 가져오기
        box_init();

    }
});
$("#boxlist").disableSelection();


//컨테이너 너비 생성
$('#container_area').append('<div id="container" style="width:' + container[1] + 'px; height:' + container[0] + 'px; "></div>');


//폭 작은순 정렬하고 컨테이너 넣기
function start_bubbleSort1() {
    bubbleSort1(box);
    //컨테이너 박스넣기 재실행
    boxincontainer();
    //목록 재실행
    box_init();
}
//장 작은순 정렬하고 컨테이너 넣기
function start_bubbleSort2() {
    bubbleSort2(box);
    //컨테이너 박스넣기 재실행
    boxincontainer();
    //목록 재실행
    box_init();
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
function boxincontainer() {
    $('#container').empty(); //컨테이너 내용물 초기화
    for (var i = 0; i < box.length; i++) {
        //console.log(box[i][0], "번 박스");

        //묶음 생성
        for (var j = 0; j < box[i][6]; j++) { //단 묶음수길이만큼 돌림
            //박스명 체크
            var str = box[i][0];
            if (box[i][0] != "" && str.substring(str.length - 5, str.length) != "<br/>") {
                box[i][0] = box[i][0] + '<br/>';
            }
            
            //박스 200*200 이상이면 글씨 검장
            if(box[i][1]>=200 && box[i][2]>=200){
                $('#container').append('<div class="box" style="width:' + box[i][2] + 'px; height:' + box[i][1] + 'px; background:rgb(' + box[i][1] + ',' + box[i][2] + ',' + box[i][3] + ')"> <span  class="box_info" style="color:#000;">' + box[i][0] + '<span class="br"></span>' + box[i][1] + ' * ' + box[i][2] + ' * ' + box[i][3] + '<br/>' + box[i][5] + '단<span></div>');
            }else{
                 $('#container').append('<div class="box" style="width:' + box[i][2] + 'px; height:' + box[i][1] + 'px; background:rgb(' + box[i][1] + ',' + box[i][2] + ',' + box[i][3] + ')"> <span  class="box_info">' + box[i][0] + '<span class="br"></span>' + box[i][1] + ' * ' + box[i][2] + ' * ' + box[i][3] + '<br/>' + box[i][5] + '단<span></div>');
            }
            

        }
        //나머지 박스 생성 (박스 분리 입력 아닐때)
        if ($("input:checkbox[name=box_abxolute]").is(":checked") == false) {
            if (box[i][7] > 0) { //묶음 나머지가 있는 박스라면

                //박스명 체크
                var str = box[i][0];
                if (box[i][0] != "" && str.substring(str.length - 5, str.length) != "<br/>") {
                    box[i][0] = box[i][0] + '<br/>';
                }
                //박스 200*200 이상이면 글씨 검장
            if(box[i][1]>=200 && box[i][2]>=200){
                $('#container').append('<div class="box" style="width:' + box[i][2] + 'px; height:' + box[i][1] + 'px;  background:rgb(' + box[i][1] + ',' + box[i][2] + ',' + box[i][3] + '); "> <span  class="box_info" style="color:#000;">' + box[i][0] + '<span class="br"></span>' + box[i][1] + ' * ' + box[i][2] + ' * ' + box[i][3] + '<br/>' + box[i][7] + '단<span></div>'); //단수를 나머지 수량으로 해서 하나더 추가
            }else{
                $('#container').append('<div class="box" style="width:' + box[i][2] + 'px; height:' + box[i][1] + 'px;  background:rgb(' + box[i][1] + ',' + box[i][2] + ',' + box[i][3] + '); "> <span  class="box_info">' + box[i][0] + '<span class="br"></span>' + box[i][1] + ' * ' + box[i][2] + ' * ' + box[i][3] + '<br/>' + box[i][7] + '단<span></div>'); //단수를 나머지 수량으로 해서 하나더 추가
            }
                
            }

        }
    }

    drag_init();
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
        boxincontainer();
        //목록 재실행
        box_init();
    }

}