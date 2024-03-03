export function selectUserInList(id = null) {
    if(id === null) {
        id = $('.users-list').attr('data-admin-id');
    }
    const $button = $(`.users-list > nav > a[id="${id}"]`);
    if($button.length) {
        $button.toggleClass('btn-light btn-primary');
    } else {
        $(`.users-list > nav > a:first-child`).click();
    }
}

export function loadUsersList(users) {
    const $nav = $('.users-list > nav');
    $nav.empty();

    for (const user of users) {
        const button = `<a type="button" class="btn btn-light pl-5 pr-5" id="${user.id}">${user.email}</a>`;
        $nav.append(button);
    }
}