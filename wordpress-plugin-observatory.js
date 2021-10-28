var buttonAdd = '<a class="private-area-admin-button edit-file" href="@LINK@" target="_blank">ADD TO OBSERVATORY </a>';
var buttonEdit = '<a class="private-area-admin-button edit-file" href="@LINK@" target="_blank">EDIT OBSERVATORY METADATA </a>';
var buttonDelete = '<a class="private-area-admin-button delete-file" href="@LINK@" target="_blank">DELETE FROM OBSERVATORY</a>';
var buttonOpen = '<a class="private-area-admin-button open-file" href="@LINK@" target="_blank">OPEN OBSERVATORY</a>';
var apiURL = 'https://ioc-observatory.demo.intelligenia.com';
var domainURL = 'http://localhost:4200';

function getDocument() {
    const containerRow = $('.private-area-row[data-id]');
    for (let index = 0; index < containerRow.length; index++) {
        const document_id = containerRow[index].getAttribute('data-id');
        if ($('.private-area-row[data-id=' + document_id + '] .private-area-top .private-area-text .file-link .file-title').length > 0) {
            const document_text = $('.private-area-row[data-id=' + document_id + '] .private-area-top .private-area-text .file-link .file-title')[0];
            const document_date = $('.private-area-row[data-id=' + document_id + '] .private-area-top .private-area-info .private-area-calendar span')[0];
            const document_link = $('.private-area-row[data-id=' + document_id + '] .private-area-admin-buttons div[id=' + document_id + ']')[0].getAttribute('data-url');
            const http = new XMLHttpRequest();
            http.open("GET", `${apiURL}/api/documents/check_if_exists/?document_link=${document_link}&limit=1&offset=0`);
            http.onreadystatechange = function () {
                switch (this.status) {
                    case 200:
                        buttonEdit = buttonEdit.replace('@LINK@', `${apiURL}/apps/document/${document_id}`);
                        buttonDelete = buttonEdit.replace('@LINK@', `${apiURL}/apps/document-detail/${document_id}?delete=true`);
                        buttonOpen = buttonEdit.replace('@LINK@', `${apiURL}/apps/document-detail/${document_id}`);
                        $(`#${document_id}`).html(() => {
                            return `${buttonEdit}${buttonDelete}${buttonOpen}`;
                        });
                        break;
                    case 404:
                        buttonAdd = buttonAdd.replace('@LINK@', `${apiURL}/apps/document?source=private_area&visibility=private&name=${document_text}&date=${document_date}&link=${document_link}`);
                        $(`#${document_id}`).html(() => {
                            return `${buttonAdd}`;
                        });
                        break;
                }
            }
            http.send();
        }
    }

    // const containerButtons = $('.private-area-row .private-area-admin-buttons div[id]');
    // for (let index = 0; index < containerButtons.length; index++) {
    //     const containerButton = containerButtons[index];
    //     const documentId = containerButton.getAttribute('id');
    //     const documentLink = containerButton.getAttribute('data-url');
    //     const documentName = containerButton.getAttribute('data-url');
    //     const documentDate = containerButton.getAttribute('data-url');
    //     const http = new XMLHttpRequest();
    //     http.open("GET", `${apiURL}/api/documents/?link=${documentLink}&limit=1&offset=0`);
    //     http.onreadystatechange = function () {
    //         switch (this.status) {
    //             case 200:
    //                 buttonEdit = buttonEdit.replace('@LINK@', `${apiURL}/apps/document/${documentId}`);
    //                 buttonDelete = buttonEdit.replace('@LINK@', `${apiURL}/apps/document-detail/${documentId}?delete=true`);
    //                 buttonOpen = buttonEdit.replace('@LINK@', `${apiURL}/apps/document-detail/${documentId}`);
    //                 $(`#${documentId}`).html(() => {
    //                     return `${buttonEdit}${buttonDelete}${buttonOpen}`;
    //                 });
    //                 break;
    //             case 404:
    //                 buttonAdd = buttonAdd.replace('@LINK@', `${apiURL}/apps/document?source=private_area&visibility=private&name=${documentName}&date=${documentDate}&link=${documentLink}`);
    //                 $(`#${documentId}`).html(() => {
    //                     return `${buttonAdd}`;
    //                 });
    //                 break;
    //         }
    //     }
    //     http.send();
    // }
}

function intervalo() {
    intervalo = setInterval(getDocument, 3000);
}

intervalo();