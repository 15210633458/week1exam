define(function() {
    function a() {
        var add = document.getElementById('add');
        var mark = document.getElementById('mark');
        var sure = document.getElementById('sure');
        var cancel = document.getElementById('cancel');
        var classname = document.getElementById('classname');
        var content = document.getElementById('content');

        var xhr = new XMLHttpRequest()
        xhr.open('get', '/api/list', true);
        xhr.send()
        xhr.onload = function(res) {
            // console.log(res)
            if (res.target.status == 200) {
                var data = JSON.parse(res.target.response).data;
                var html = '';
                data.forEach((i) => {
                    html += `<li>
                                <p>
                                    <span>列表类型：</span>
                                    <span>${i.class}</span>
                                </p>
                                <p>
                                    <span>创建时间:</span>
                                    <span>${i.data}</span>
                                </p>
                            </li>`
                })
                content.innerHTML = html
            }
        }
        add.onclick = function() {
            mark.style.display = "block"
        }
        sure.onclick = function() {
            mark.style.display = "none";
            var xhr = new XMLHttpRequest()
            xhr.open('get', '/api/add', true);
            xhr.send(`class=` + classname.value)
            xhr.onload = function(res) {
                if (res.target.status == 200) {
                    console.log(data)
                }
            }
        }
        cancel.onclick = function() {
            mark.style.display = "none"
        }

    }
    return a
});