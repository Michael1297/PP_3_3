export function updateUserTable(user) {
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

export function loadAdminTable(users) {
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