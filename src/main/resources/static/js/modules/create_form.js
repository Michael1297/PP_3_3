import {getRoles} from "./get_data.js";
import {createUser} from "./update_data.js";
import loadPageContent from "./page_content.js";
import {selectUserInList} from "./users_list.js";

async function clearCreateForm() {
    const $form = $('.create-form');

    $form.find('[name="firstName"]').val('');
    $form.find('[name="lastName"]').val('');
    $form.find('[name="age"]').val('');
    $form.find('[name="email"]').val('');
    $form.find('[name="password"]').val('');

    const $rolesForm = $form.find('[name="roles"]');
    $rolesForm.empty();

    try {
        const allRoles = await getRoles();
        for (const role of allRoles) {
            $rolesForm.append(`<option>${role}</option>`);
        }
    } catch (e) {
        console.error(e);
    }
}

async function loadCreateForm() {
    const $form = $('.create-form');
    await clearCreateForm();

    const $button = $form.find('.create-button');

    //id текущей нажатой кнопки в списке пользователей
    const currentButtonId = $('.users-list  a[type="button"][class*="btn-primary"]').attr('id');

    $button.click(async function (){
        await createUser($form);
        await $('[href="#table"]').click()
        await loadPageContent();
        await selectUserInList(currentButtonId);
        await clearCreateForm();
    });
}

export default loadCreateForm;