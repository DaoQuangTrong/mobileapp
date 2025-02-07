"use strict";
window.addEventListener("DOMContentLoaded", 
    function() {

        if (typeof localStorage === "undefined") {
            window.alert("このブラウザはLocal Storage機能が実装されていません");
            return;
        } else {
            viewStorage();
            saveLocalStorage();
            delLocalStorage();
            allClearLocalStorage();
            selectTable(); // 2.localStorageの保存（ほぞん）
        }
    }
);
//2. localsstrorage
function saveLocalStorage() {
    const save = document.getElementById("save");
    save.addEventListener("click", 
        function(e) {
            e.preventDefault();
            const key = document.getElementById("textKey").value;
            const value = document.getElementById("textMemo").value; 

            if (key === "" || value === "") {
                window.alert("key, Memoはいずれも必須です。");
                return;
            } else {
                localStorage.setItem(key, value);
                viewStorage();
                let w_msg = "LocalStorageに" + key + " " + value + "を保存しました。";
                window.alert(w_msg);
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }
        }, false
    );
};
//3  delLocalStorageから
function delLocalStorage(){
    const del = document.getElementById("del");
    del.addEventListener("click",
        function(e) {
            e.preventDefault();
            let w_sel = "0";
            w_sel = selectRadioBtn();

            if(w_sel ==="1") {
                const key = document.getElementById("textKey").value;
                const value = document.getElementById("textMemo").value;
                localStorage.removeItem(key);
                viewStorage(); //localStorageから
                let w_msg = "LocalStorageから" + key + " " + value + "を削除しました。";
                window.alert(w_msg);
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }
         }, false
    );
};

//4 allClearLocalStorage 
function allClearLocalStorage() {
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click",
    function(e) {
        e.preventDefault();
        let w_confirm = confirm("LocalStorage のデータをすべて削除(all clear)します。\ よろしですか? ")
        //確認ダイアログで「ok」を押されたとき、すべて削除する。
        if (w_confirm === true) {
            localStorage.clear();
            viewStorage();
            let w_msg = "LocalStorageのデータを全て削除(all clear)しました。";
            window.alert(w_msg);
            document.getElementById("textKey").value ="";
            document.getElementById("textMemo").value ="";

        }
      },false
    );
};

function selectTable(){
    const select = document.getElementById("select");
    select.addEventListener("click",
        function(e) {
            e.preventDefault;
            selectRadioBtn();
         }, false
    );
};

function selectRadioBtn() {
    let w_sel = "0";
    const radio = document.getElementsByName("radio1");
    const table = document.getElementById("table1");

    for(let i=0; i < radio.length; i++) {
        if(radio[i].checked) {
            document.getElementById("textKey").value = table.rows[1+i].cells[1].firstChild.data;     
            document.getElementById("textMemo").value = table.rows[1+i].cells[2].firstChild.data;
            return w_sel = "1";
        }
     }
     window.alert("1つ選択 (select) してください。");
};


function viewStorage(){
    const list = document.getElementById("list");
    while(list.rows[0])list.deleteRow(0);

    for (let i=0; i < localStorage.length; i++) {
        let w_key = localStorage.key(i);

        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        td1.innerHTML = "<input name = 'radio1' type = 'radio'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
    }
    // jQueryのplugin tablesorterを使ってテーブルのソート
    // sortList: 引数1...最初からソートしておく列を指定, 引数2...0.昇順, 1.降順
    $("#table1").tablesorter({          // tablesort add
    sortList: [[1, 0]]                  // tablesort add
    });                                 // tablesort add
  
    $("#table1").trigger("update");     // tablesort add
  
}


