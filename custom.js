//박스 컬러 나열
var color = ['4B77BE', '4DB3A2', 'D05454', 'F3C200', '5C9BD1', '8E44AD', '1BBC9B', '4B77BE', '4DB3A2', 'D05454', 'F3C200', '5C9BD1', '8E44AD', '1BBC9B'];

var container = [1020, 240, 240]; //기본 사이즈 25톤
$('.container_info').html(container[0]+' * '+container[1]+' * '+container[2]);

var box = [];
var box_leng = box.length;
//  [0]박스이름,  [1]장,  [2]폭,   [3]고, [4]수량,[5]단, [6]단 묶음수 , [7]묶음 나머지,[8]인덱스, [9]최대단수
//box[0] = ['가나무역', 110, 110, 103, 12, 0];
//box[1] = ['영코퍼', 110, 150, 100, 3, 0];
//box[2] = ['이베이', 112, 110, 110, 3, 0];
//box[3] = ['아마존', 110, 60, 60, 6, 0];
//box[4] = ['퀄리', 153, 42, 72, 1, 0];



//컨데이너 사이즈 체크
$("input:radio[name=container_size]").click(function () {
    var radioVal = $('input[name="container_size"]:checked').val();
    switch (radioVal) {
        case "option1": //25톤 트럭 1020 * 240 * 240
            container = [1020, 240, 240];
            $('#container').css("height", container[0]);
            $('#container').css("width", container[1]);
            $('.container_info').html(container[0]+' * '+container[1]+' * '+container[2]);
            break;
        case "size_input":
            container[0] = Number($("#container_size_1").val());
            container[1] = Number($("#container_size_2").val());
            container[2] = Number($("#container_size_3").val());
            $('#container').css("height", container[0]);
            $('#container').css("width", container[1]);
            $('.container_info').html(container[0]+' * '+container[1]+' * '+container[2]);
            //console.log(container);

            $("#container_size_1").keyup(function () { //장
                var val = $(this).val();
                //console.log("val", val);
                container[0] = Number(val);
                $('#container').css("height", val);
                $('.container_info').html(container[0]+' * '+container[1]+' * '+container[2]);
            });
            $("#container_size_2").keyup(function () { //폭
                var val = $(this).val();
                //console.log("val", val);
                container[1] = Number(val);
                $('#container').css("width", val);
                $('.container_info').html(container[0]+' * '+container[1]+' * '+container[2]);
            });
            $("#container_size_3").keyup(function () { //고
                var val = $(this).val();
                //console.log("val", val);
                container[2] = Number(val);
                console.log('container',container);
                $('.container_info').html(container[0]+' * '+container[1]+' * '+container[2]);
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
    //[0]박스이름,  [1]장,  [2]폭,   [3]고, [4]수량,[5]단, [6]단 묶음수 , [7]묶음 나머지,[8]인덱스,[9]최대단수
    new_box[0] = $('#box_val_1').val(); //박스이름
    new_box[1] = Number($('#box_val_2').val()); //장
    new_box[2] = Number($('#box_val_3').val()); //폭
    new_box[3] = Number($('#box_val_4').val()); //고
    new_box[4] = Number($('#box_val_5').val()); //수량
    new_box[5] = 1; //기본값 설정
    new_box[6] = 1; //기본값 설정
    new_box[7] = 0; //기본값 설정
    new_box[8] = Number($('#box_val_6').val()); //최대단수




    if (new_box[0] == "" || new_box[1] == "" || new_box[2] == "" || new_box[3] == "" || new_box[4] == "") {
        alert('입력값을 다 입력해주세요.');
    } else {
        box.push(new_box);
        //console.log("box", box);

        //박스리스트 가져오기
        box_init();
        //컨테이너 박스넣기 재실행
        boxincontainer();
        //console.log('box', box);
    }

}

//박스 리스트 가져오기
function box_init() {
    $('#boxlist').empty(); //박스리스트 초기화
    for (var i = 0; i < box.length; i++) {
        if(box[i][8] != "0"){
            $('#boxlist').append('<li class="ui-state-default" style="border-color:#' + color[i] + ';" value="' + box[i] + '"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>' +
            box[i][0] + '<strong>' + box[i][1] + '*' + box[i][2] + '*' + box[i][3] + '</strong>' + box[i][4] + '개' +
            '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span><span class="badge" style="font-size:12px; margin-right:10px;">설정 최대단수 ' + box[i][8] + '단</span>' +
            '</li>');
        }else {
            $('#boxlist').append('<li class="ui-state-default" style="border-color:#' + color[i] + ';" value="' + box[i] + '"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>' +
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


//작은순 정렬하고 컨테이너 넣기
function start_bubbleSort() {
    bubbleSort(box);
    //컨테이너 박스넣기 재실행
    boxincontainer();
    //목록 재실행
    box_init();
}
//작은순으로정렬
var bubbleSort = function (array) {
    var length = array.length;
    var i, j, temp;
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

//박스 넣기
function boxincontainer() {
    $('#container').empty(); //컨테이너 내용물 초기화
    for (var i = 0; i < box.length; i++) {
        //console.log(box[i][0], "번 박스");

        //단수와 나머지 박스 계산
        //  [0]박스이름,  [1]장,  [2]폭,   [3]고, [4]수량,[5]단, [6]단 묶음수 , [7]묶음 나머지,[8]인덱스
        var dan = parseInt(container[2] / box[i][3]); //컨테이너 높이 나누기 물건 높이 = 최대 단수
        console.log("dan", dan);
        if (dan >= 1) { //1단 이상으로 쌓을수 있을때 = 적재가능
            if(box[i][4]<box[i][8]){
                //최대 단수보다 최대 단수가 많을때
                alert(box[i][0]+ " 박스는 "+box[i][4]+"단 이상 쌓을 수 없습니다. 입력 최대 단수 "+box[i][4]+"단");
            }else if (box[i][8] != "0"){
                dan = box[i][8]; 
                //최대단수가 0이 아니면 단수 최대단수로 강제 입력
            }
            
            if (box[i][4] > dan) { //최대 단수보다 수량이 많을때
                box[i][6] = parseInt(box[i][4] / dan); //수량을 단으로 나눔 = 묶음 수 (표시되는 상자 수)
                console.log("묶음 수", box[i][6]);
                box[i][5] = dan; //단수 입력
                box[i][7] = box[i][4] % dan; //묶음 나머지수
                console.log("묶음 나머지 수", box[i][7]);

            } else { //단수로 쌓을수 있으나 그보다 수량이 적거나 같을때
                //단수 = 수량 (수량이 단수가 됨)
                box[i][5] = box[i][4];
                //단묶음수 = 1
                box[i][6] = 1;
            }
        } else{ //1단 이하로 쌓아질떄 = 적재불가
            alert(box[i][0]+ " 박스는 컨테이너 높이를 초과하는 박스입니다.");
        }
console.log('box',box);
        //묶음 생성
        for (var j = 0; j < box[i][6]; j++) { //단 묶음수길이만큼 돌림
            $('#container').append('<div class="box" style="width:' + box[i][2] + 'px; height:' + box[i][1] + 'px; background:#' + color[i] + '; "> <span>' + box[i][0] + ' 박스<br/> ' + box[i][1] + ' * ' + box[i][2] + ' * ' + box[i][3] + '<br/>' + box[i][5] + '단<span></div>');
        }
        //나머지 박스 생성
        if (box[i][7] > 0) { //묶음 나머지가 있는 박스라면
            $('#container').append('<div class="box" style="width:' + box[i][2] + 'px; height:' + box[i][1] + 'px;  background:#' + color[i] + '; "> <span>' + box[i][0] + ' 박스<br/> ' + box[i][1] + ' * ' + box[i][2] + ' * ' + box[i][3] + '<br/>' + box[i][7] + '단<span></div>'); //단수를 나머지 수량으로 해서 하나더 추가

        }

    }
}
