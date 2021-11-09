'use strict';

{
  
  const table = document.querySelector('table');
  const todo = document.getElementById('todo');
  const priority = document.querySelector('select');
  const deadline = document.querySelector('input[type = "date"]');
  const submit = document.getElementById('submit');
  
  const storage = localStorage;
  let list = [];// todoリストのデータ

  document.addEventListener('DOMContentLoaded', () => {
    // ①ストレージデータ(JSON)の読み込み
    const json = storage.todoList;
    if(json == undefined){
      return; // ストレージデータがない場合は何もしない
    }
    // ②JSONをオブジェクトの配列に変換して配列listに代入
    list = JSON.parse(json);
    // ③配列listのデータを元にテーブルに要素を追加
    // tr要素を生成
    for(const item of list){
      addItem(item);
    }
  });

  
  // todo~完了までを表示する関数
  const addItem = (item) => {
    const tr = document.createElement('tr');
    for (const prop in item) {
      const td = document.createElement('td');
      if (prop == 'done') {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item[prop];
        td.appendChild(checkbox);
        checkbox.addEventListener('change', checkBoxListener);
      } else {
        td.textContent = item[prop];
      }
      tr.appendChild(td);
    }
    table.append(tr);
    
  };
  
  const checkBoxListener = (ev) => {
    // A. チェックボックスの親(td)の親(tr)を取得
    const currentTr = ev.currentTarget.parentElement.parentElement;
    // B. テーブルの全tr要素のリストを取得(&配列に変換)
    const trList = Array.from(document.getElementsByTagName('tr'));
    // C. 配列.indexOfメゾットで何番目(インデックス)かを取得
    const idx = trList.indexOf(currentTr) - 1;
    // D. 配列listにそのインデックスでアクセスしてdoneを更新
    list[idx].done = ev.currentTarget.checked;
    // E. ストレージデータを更新
    storage.todoList = JSON.stringify(list);

  };
  
  
  
  
  // todo登録ボタン
  submit.addEventListener('click', () => {
    //ここに書いていく
    const item = {}; //入力値を一旦格納するオブジェクト
    
    // item.todo = todo.value; //オブジェクトへの値の追加は オブジェクト.プロパティ名 = 値
    // item.priority = priority.value;
    // item.deadline = deadline.value;
    
    // ※ここじゃないと下にリセット用のtodo.value = '';があるから処理できない
    // returnがないとそのまま表に反映されてしまう
    // todo
    if (todo.value != '') {
      item.todo = todo.value;
    } else {
      // item.todo = 'オリンパス';
      window.alert('todo項目を入力してください');
      return;
    }
    // 優先度
    item.priority =priority.value;
    // 期日
    if (deadline.value != '') {
      item.deadline = deadline.value;
    } else {
      // item.deadline = new Date().toLocaleDateString().replace('/\//g', '-');
      //new Date()は「日時」を扱うオブジェクト
      //newでインスタンスを生成。「インスタンス」はオブジェクトを表す定数/変数のようなもの
      window.alert('期日を入力してください');
      return;
    }
    // 完了
    item.done = false; // 完了はひとまずBoolean値で設定
    
    // const tr = document.createElement('tr'); // tr要素を生成
    
    //フォームをリセット
    todo.value = '';
    priority.value = '普';
    deadline.value = '';
    
    //オブジェクトの繰り返しはfor-in文
    //この処理でtodo~期日までは表として表示
    addItem(item);
    // for(const prop in item){
      //   const td = document.createElement('td');
      //   if(prop == 'done'){//完了の場合
      //     const checkbox = document.createElement('input');
      //     checkbox.type = 'checkbox'; //type属性をcheckboxに
      //     checkbox.checked = item[prop]; //checked属性を設定
      //     //チェック取得状況が確認できる
      //     td.appendChild(checkbox); // td属性の子要素に
      //   }else{
        //     td.textContent = item[prop]; //ブラケット記法/その他
        //   }
        //   tr.appendChild(td); //生成したtd要素をtr要素に追加 
        // }
        
        // console.log(item); //確認
        // console.log(list);
        
        // table.append(tr); // trエレメントをtable要素に追加
        
        // データをストレージに記録
        list.push(item);
        storage.todoList = JSON.stringify(list);
  });
        
        //絞り込み機能
        const filterButton = document.createElement('button'); // ボタン要素の生成
        filterButton.textContent = '優先度(高)で絞り込み'
        filterButton.id = 'priority';// CSSでの装飾用
        const main = document.querySelector('main');
        main.appendChild(filterButton);
        
        filterButton.addEventListener('click', () => {
          const newList = list.filter((item) => item.priority == '高')
          clearTable();
          newList.forEach((item) => addItem(item));
          // table.textContent = ''; // table要素の子孫要素を空にする
          // for(const item of list){
            //   if(item.priority == '高'){
              //     addItem(item);
              //   }
              // }
            });
            // todoリストを消去する関数
            const clearTable = () => {
              const trList = Array.from(document.getElementsByTagName('tr'));
              trList.shift();
              for (const tr of trList){
                tr.remove();
              }
            };
            
  // 削除ボタン
  const remove = document.createElement('button');
  remove.textContent = '完了したTODOを削除する'
  remove.id = 'remove'; // CSS装飾用
  const br = document.createElement('br'); // 改行したい
  main.appendChild(br);
  main.appendChild(remove);

  // 未完了のtodoを残す処理
  remove.addEventListener('click', () => {
    clearTable(); // TODOリストを一旦削除
    list = list.filter((item) => item.done == false); //未完成のTODOを抽出
    list.forEach((item) => addItem(item)); //TODOデータをテーブルに追加
    storage.todoList = JSON.stringify(list);// ストレージデータも更新

  });

  
  
  




  
  
  //日時サンプル
  // const date = new Date();

  // // console.log(date);

  // //日本風
  // const simpleDate = date.toLocaleDateString();
  // console.log(simpleDate);
}