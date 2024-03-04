import {updateUser, removeUser} from './modules/update_data.js';

import loadCreateForm from './modules/create_form.js';
import createModal from './modules/create_modal.js'

import {updateUserTable} from './modules/table.js'
import {selectUserInList} from './modules/users_list.js'

import loadPageContent from './modules/page_content.js'

//нажатие на кнопку обновить в таблице администратора
$(document).on('click', 'button.btn.update', async function (){
    //получить id пользователя
    const userId = $(this).attr('data-id');

    //id текущей нажатой кнопки в списке пользователей
    const buttonId = $('.users-list  a[type="button"][class*="btn-primary"]').attr('id');

    //создать модальное окно
    const $modal = await createModal(userId);

    //добавить кнопку
    const $button = $('<button class="btn btn-primary" data-dismiss="modal">Edit</button>');
    $button.click(async function (){
        await updateUser($modal)
        await loadPageContent();
        await selectUserInList(buttonId);
    });
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

    //id текущей нажатой кнопки в списке пользователей
    const buttonId = $('.users-list  a[type="button"][class*="btn-primary"]').attr('id');

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
        await loadPageContent();
        await selectUserInList(buttonId);
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
$(document).ready( async () => {
    await loadPageContent();
    await selectUserInList();
    await loadCreateForm();
});