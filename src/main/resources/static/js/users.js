async function getUsers() {
    const response = await fetch('/api/users');
    if(!response.ok) {
        throw `Network request for users.json failed with response ${response.status}: ${response.statusText}`;
    }
    return await response.json();
}

async function getRoles() {
    const response = await fetch('/api/rolesList');
    if(!response.ok) {
        throw `Network request for rolesList.json failed with response ${response.status}: ${response.statusText}`;
    }
    return await response.json();
}

async function getUser(id) {
    const response = await fetch(`/api/user/${id}`);
    if(!response.ok) {
        throw `Network request for user.json failed with response ${response.status}: ${response.statusText}`;
    }
    return await response.json();
}

async function removeUser(id) {
    const response = await fetch(`/api/user/${id}`,{
        method: 'DELETE'
    });
    if(!response.ok) {
        throw `Network request for delete user failed with response ${response.status}: ${response.statusText}`;
    }
}

async function loadCreateForm() {
    const rolesForm = $('.create-form  [name="roles"]');
    try{
        const allRoles = await getRoles();
        for (const role of allRoles) {
            rolesForm.append(`<option>${role}</option>`);
        }
    } catch (e) {
        console.error(e);
    }

}

async function createModal(id) {
    const $modal = $('#modalForm').clone();

    try {
        const user = await getUser(id);
        //установить значения для полей
        $modal.find('[name="id"]').val(user.id);
        $modal.find('[name="firstName"]').val(user.firstName);
        $modal.find('[name="lastName"]').val(user.lastName);
        $modal.find('[name="age"]').val(user.age);
        $modal.find('[name="email"]').val(user.email);
        $modal.find('[name="password"]').val(user.password);

        const rolesForm = $modal.find('[name="roles"]');
        const allRoles = await getRoles();
        for (const role of allRoles) {
            const $option = $(`<option>${role}</option>`);
            $option.prop('selected', user.rolesList.includes(role));
            rolesForm.append($option);
        }
    } catch (e) {
        console.error(e);
    }

    return $modal;
}

function updateUserTable(user) {
    const $table = $('.user-panel  .table > tbody');
    $table.empty();
    const row =
        `<tr>
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td>${user.rolesList.join(' ')}</td>
        </tr>`;
    $table.append(row);
}

function loadAdminTable(users) {
    const $table = $('.admin-panel  .table > tbody');
    $table.empty();

    for (const user of users) {
        const row =
            `<tr>
                <td>${user.id}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.age}</td>
                <td>${user.email}</td>
                <td>${user.rolesList.join(' ')}</td>
                <td><button class = "btn update btn-info" data-id="${user.id}">Edit</button></td>
                <td><button class = "btn remove btn-danger" data-id="${user.id}">Delete</button></td>
            </tr>`;
        $table.append(row);
    }
}

function selectUserInList() {
    const id = $('.users-list').attr('data-admin-id');
    $(`.users-list > nav > a[id="${id}"]`).toggleClass('btn-light btn-primary');
}

function loadUsersList(users) {
    const $nav = $('.users-list > nav');
    $nav.empty();

    for (const user of users) {
        const button = `<a type="button" class="btn btn-light pl-5 pr-5" id="${user.id}">${user.email}</a>`;
        $nav.append(button);
    }
}

async function loadPageContent() {
    try{
        const users = await getUsers();
        loadUsersList(users);
        loadAdminTable(users);
    } catch (e) {
        console.error(e);
    }
}

//нажатие на кнопку обновить в таблице администратора
$(document).on('click', 'button.btn.update', async function (){
    //получить id пользователя
    const userId = $(this).attr('data-id');

    //создать модальное окно
    const $modal = await createModal(userId);

    //указание ссылки на изменения данных при нажатии на кнопку
    $modal.find('form').attr('action', `./edit/${userId}`);
    $modal.find('form').attr('method', 'POST');

    //добавить кнопку
    const $button = $('<button type="submit" class="btn btn-primary">Edit</button>');
    $modal.find('.modal-footer').append($button);

    //Заголовок модального окна
    const $title = $('<h4 class="modal-title">Edit User</h4>');
    $modal.find('.modal-header').append($title);

    //show dialog
    $modal.modal();
});

//нажатие на кнопку удалить в таблице администратора
$(document).on('click', 'button.btn.remove', async function () {
    //получить id пользователя
    const userId = $(this).attr('data-id');

    //создать модальное окно
    const $modal = await createModal(userId);

    //выключить поля
    $modal.find('[name="firstName"]').prop('disabled', true);
    $modal.find('[name="lastName"]').prop('disabled', true);
    $modal.find('[name="age"]').prop('disabled', true);
    $modal.find('[name="email"]').prop('disabled', true);
    $modal.find('[name="password"]').prop('disabled', true);
    $modal.find('[name="roles"]').prop('disabled', true);

    //добавить кнопку
    const $button = $('<button class="btn btn-danger" data-dismiss="modal">Delete</button>');
    $button.click(async function (){
        await removeUser(userId);
    });
    $modal.find('.modal-footer').append($button);

    //Заголовок модального окна
    const $title = $('<h4 class="modal-title">Delete User</h4>');
    $modal.find('.modal-header').append($title);

    //show dialog
    $modal.modal();
});

//нажатие на одного из пользователей в списке
$(document).on('click', '.users-list  a[type="button"]', function (){
    const $btn = $(this);
    const id = $btn.attr('id');

    //заменить btn-light на btn-primary
    $('.users-list  a[type="button"][class*="btn-primary"]').toggleClass('btn-primary btn-light');
    $btn.toggleClass('btn-light btn-primary');

    fetch(`/api/user/${id}`).then(function (response) {
        if(response.ok) {
            response.json().then(user => {
                if(user.rolesList.includes('ADMIN')) {
                    $('.admin-panel').css('display', 'block');
                    $('.user-panel').css('display', 'none');
                } else {
                    $('.admin-panel').css('display', 'none');
                    $('.user-panel').css('display', 'block');
                    updateUserTable(user);
                }
            });
        } else {
            console.error(`Network request for user.json failed with response ${response.status}: ${response.statusText}`);
        }
    });
});

// Инициализация при загрузке документа
$(document).ready(
    async () => {
        await loadPageContent();
        await selectUserInList();
        await loadCreateForm();
    }
);