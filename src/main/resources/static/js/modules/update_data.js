//получить данные из формы
function retrieveData($form) {
    const json = {};

    json.id = parseInt($form.find('[name="id"]').val());
    json.firstName = $form.find('[name="firstName"]').val();
    json.lastName = $form.find('[name="lastName"]').val();
    json.age = parseInt($form.find('[name="age"]').val());
    json.email = $form.find('[name="email"]').val();
    json.password = $form.find('[name="password"]').val();
    json.rolesList = [];

    const $options = $form.find('[name="roles"] option:selected');

    for (const $option of $options) {
        json.rolesList.push($option.text);
    }

    return JSON.stringify(json);
}

export async function createUser($createForm) {
    const user = retrieveData($createForm);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    const response = await fetch('/api/admin/user',{
        method: 'POST',
        headers: headers,
        body: user
    });
    if(!response.ok) {
        throw `Network request for create user failed with response ${response.status}: ${response.statusText}`;
    }
}

export async function updateUser($modalForm) {
    const user = retrieveData($modalForm);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    const response = await fetch('/api/admin/user',{
        method: 'PUT',
        headers: headers,
        body: user
    });
    if(!response.ok) {
        throw `Network request for update user failed with response ${response.status}: ${response.statusText}`;
    }
}

export async function removeUser(id) {
    const response = await fetch(`/api/admin/user/${id}`,{
        method: 'DELETE'
    });
    if(!response.ok) {
        throw `Network request for delete user failed with response ${response.status}: ${response.statusText}`;
    }
}