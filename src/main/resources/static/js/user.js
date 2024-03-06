import {getCurrentUser} from "./modules/get_data.js";
import {updateUserTable} from "./modules/table.js";
import loadHeader from "./modules/header.js"

// Инициализация при загрузке документа
$(document).ready( async () => {
    try {
        const $usersList = $(document).find('.users-list');
        const user = await getCurrentUser('user');

        const button = `<a type="button" class="btn btn-primary pl-5 pr-5" id="${user.id}">${user.email}</a>`;
        $usersList.find('nav').append(button);

        updateUserTable(user);
        loadHeader(user)
    } catch (e) {
        console.error(e);
    }
});