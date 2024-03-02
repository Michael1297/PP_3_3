function createModal(user) {
    const $modal = $('#modalForm').clone();

    //установить значения для полей
    $modal.find('[name="id"]').val(user.id);
    $modal.find('[name="firstName"]').val(user.firstName);
    $modal.find('[name="lastName"]').val(user.lastName);
    $modal.find('[name="age"]').val(user.age);
    $modal.find('[name="email"]').val(user.email);
    $modal.find('[name="password"]').val(user.password);

    //сделать чтобы роли у пользователя были выбраны
    const roles = $modal.find('[name="roles"] > option');
    for (const role of roles) {
        role.selected = user.rolesList.includes(role.text);
    }
    return $modal;
}

function updateUserTable(user) {
    const $table = $('.user-panel  table  tbody');
    $table.find('tr').remove();
    const row =
        `<tr>
            <td>${user.id}</td>>
            <td>${user.firstName}</td>>
            <td>${user.lastName}</td>>
            <td>${user.age}</td>>
            <td>${user.email}</td>>
            <td>${user.rolesList.join(' ')}</td>>
        </tr>`;
    $table.append(row);
}

$(function(){
    //нажатие на кнопку обновить в таблице администратора
    $("button.btn.update").click(function(){
        //получить имя пользователя
        const userName = $(this).attr('name');
        //получить данные пользователя
        const userData = $(`.users-list  a[type="button"][name="${userName}"]`).attr('data-user');

        const user = JSON.parse(userData);
        const $modal = createModal(user);

        //указание ссылки на изменения данных при нажатии на кнопку
        $modal.find('form').attr('action', `./edit/${user.id}`);
        $modal.find('form').attr('method', 'POST');

        //добавить кнопку
        const button = $('<button type="submit" class="btn btn-primary">Edit</button>');
        $modal.find('.modal-footer').append(button);

        //Заголовок модального окна
        const title = $('<h4 class="modal-title">Edit User</h4>');
        $modal.find('.modal-header').append(title);

        //show dialog
        $modal.modal();
    });

    //нажатие на кнопку удалить в таблице администратора
    $("button.btn.remove").click(function() {
        //получить имя пользователя
        const userName = $(this).attr('name');
        //получить данные пользователя
        const userData = $(`.users-list  a[type="button"][name="${userName}"]`).attr('data-user');

        const user = JSON.parse(userData);
        const $modal = createModal(user);

        //выключить поля
        $modal.find('[name="firstName"]').prop('disabled', true);
        $modal.find('[name="lastName"]').prop('disabled', true);
        $modal.find('[name="age"]').prop('disabled', true);
        $modal.find('[name="email"]').prop('disabled', true);
        $modal.find('[name="password"]').prop('disabled', true);
        $modal.find('[name="roles"]').prop('disabled', true);

        //указание ссылки на изменения данных при нажатии на кнопку
        $modal.find('form').attr('action', `./remove/${user.id}`);
        $modal.find('form').attr('method', 'GET');

        //добавить кнопку
        const button = $('<button type="submit" class="btn btn-danger">Delete</button>');
        $modal.find('.modal-footer').append(button);

        //Заголовок модального окна
        const title = $('<h4 class="modal-title">Delete User</h4>');
        $modal.find('.modal-header').append(title);

        //show dialog
        $modal.modal();
    });

    //нажатие на одного из пользователей в списке
    $('.users-list  a[type="button"]').click(function(){
        const $btn = $(this);

        //заменить btn-light на btn-primary
        $('.users-list  a[type="button"][class*="btn-primary"]').toggleClass('btn-primary btn-light');
        $btn.toggleClass('btn-light btn-primary');

        const user = JSON.parse($btn.attr('data-user'));
        if(user.rolesList.includes('ADMIN')) {
            $('.admin-panel').css('display', 'block');
            $('.user-panel').css('display', 'none');
        } else {
            $('.admin-panel').css('display', 'none');
            $('.user-panel').css('display', 'block');
            updateUserTable(user);
        }
    });
});