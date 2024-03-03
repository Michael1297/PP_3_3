import {getRoles, getUser} from "./get_data.js";

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

export default createModal;