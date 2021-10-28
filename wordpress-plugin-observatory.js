var buttonAdd = '<button type="button" id="@@" style="background-color: #008cb7!important; box-shadow: 0 3px 1px -2px #0003, 0 2px 2px 0 #00000024, 0 1px 5px 0 #0000001f; color: #fff; line-height: 36px; padding: 0 16px; margin: 5px; font-size: 12px;"> ADD TO OBSERVATORY </button>';
var buttonEdit = '<button type="button" id="@@" style="background-color: #008cb7!important; box-shadow: 0 3px 1px -2px #0003, 0 2px 2px 0 #00000024, 0 1px 5px 0 #0000001f; color: #fff; line-height: 36px; padding: 0 16px; margin: 5px; font-size: 12px;"> EDIT OBSERVATORY METADATA </button>';
var buttonDelete = '<button type="button" id="@@" style="background-color: #f44336!important; box-shadow: 0 3px 1px -2px #0003, 0 2px 2px 0 #00000024, 0 1px 5px 0 #0000001f; color: #fff; line-height: 36px; padding: 0 16px; margin: 5px; font-size: 12px;"> DELETE FROM OBSERVATORY </button>';
var buttonOpen = '<button type="button" id="@@" style="background-color: #008cb7!important; box-shadow: 0 3px 1px -2px #0003, 0 2px 2px 0 #00000024, 0 1px 5px 0 #0000001f; color: #fff; line-height: 36px; padding: 0 16px; margin: 5px; font-size: 12px;"> OPEN OBSERVATORY </button>';

function getDocument() {
    console.log('Holaaaa')
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('name');

    const div = url.divid;
    const link = url.link;
    const url = `http://localhost:4200/api/documents/?link=${link}&limit=1&offset=0`;
    const token = localStorage.getItem('ngx_token');
    const http = new XMLHttpRequest();
    http.open("GET", url);
    http.setRequestHeader('Authorization', `token ${token.replace('"', '').replace('"', '')}`);
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const resultado = JSON.parse(this.responseText)
            $(`#${div}`).html(() => {
                return resultado.count > 0 ? `${buttonEdit}${buttonDelete}${buttonOpen}` : `${buttonAdd}`;
            });
        }
    }
    http.send();
}

function getUrlAddDocument() {
    return `http://localhost:4200/apps/document?source=private_area&visibility=private&name=${document.name}&date=${document.date}&link=${document.link}`;
}

function editDocument(button) {
    var documentId = button.id.split('-')[2];
    window.open(`http://localhost:4200/apps/document/${documentId}`, '_blank');
}

function deleteDocument(button) {
    var documentId = button.id.split('-')[2];
    window.open(`http://localhost:4200/apps/document-detail/${documentId}?delete=true`, '_blank');
}

function openDocument(button) {
    var documentId = button.id.split('-')[2];
    window.open(`http://localhost:4200/apps/document-detail/${documentId}`, '_blank');
}

getDocument();