function loadHeader(user) {
    const $header = $('header');
    $header.find('#email').html(user.email);
    $header.find('#roles').html(user.rolesList.join(' '));
}

export default loadHeader;