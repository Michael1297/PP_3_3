import {getUser} from "./modules/get_data.js";
import {updateUserTable} from "./modules/table.js";

// Инициализация при загрузке документа
$(document).ready(
    async () => {
        const $usersList = $(document).find('.users-list');
        const id = $usersList.attr('data-user-id');
        const user = await getUser(id);

        const button = `<a type="button" class="btn btn-primary pl-5 pr-5" id="${user.id}">${user.email}</a>`;
        $usersList.find('nav').append(button);

        updateUserTable(user);
    }
);