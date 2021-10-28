var buttonAdd = '<a class="private-area-admin-button edit-file" href="@LINK@" target="_blank">ADD TO OBSERVATORY </a>';
var buttonEdit = '<a class="private-area-admin-button edit-file" href="@LINK@" target="_blank">EDIT OBSERVATORY METADATA </a>';
var buttonDelete = '<a class="private-area-admin-button delete-file" href="@LINK@" target="_blank">DELETE FROM OBSERVATORY</a>';
var buttonOpen = '<a class="private-area-admin-button open-file" href="@LINK@" target="_blank">OPEN OBSERVATORY</a>';
var apiURL = 'http://localhost:4200';
var domainURL = 'http://localhost:4200';

function getDocument() {
    console.log('Holaaaa')
    const containerButtons = $('.private-area-row .private-area-admin-buttons div[id]');
    for (let index = 0; index < containerButtons.length; index++) {
        const containerButton = containerButtons[index];
        const documentId = containerButton.getAttribute('id');
        const documentLink = containerButton.getAttribute('data-url');
        const documentName = containerButton.getAttribute('data-url');
        const documentDate = containerButton.getAttribute('data-url');
        const http = new XMLHttpRequest();
        http.open("GET", `${apiURL}/api/documents/?link=${documentLink}&limit=1&offset=0`);
        http.onreadystatechange = function () {
            switch (this.status) {
                case 200:
                    buttonEdit = buttonEdit.replace('@LINK@', `${apiURL}/apps/document/${documentId}`);
                    buttonDelete = buttonEdit.replace('@LINK@', `${apiURL}/apps/document-detail/${documentId}?delete=true`);
                    buttonOpen = buttonEdit.replace('@LINK@', `${apiURL}/apps/document-detail/${documentId}`);
                    $(`#${documentId}`).html(() => {
                        return `${buttonEdit}${buttonDelete}${buttonOpen}`;
                    });
                    break;
                case 404:
                    buttonAdd = buttonAdd.replace('@LINK@', `${apiURL}/apps/document?source=private_area&visibility=private&name=${documentName}&date=${documentDate}&link=${documentLink}`);
                    $(`#${documentId}`).html(() => {
                        return `${buttonAdd}`;
                    });
                    break;
            }
        }
        http.send();
    }
}

getDocument();