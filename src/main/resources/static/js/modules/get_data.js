export async function getUsers() {
    const response = await fetch('/api/admin/users');
    if(!response.ok) {
        throw `Network request for users.json failed with response ${response.status}: ${response.statusText}`;
    }
    return await response.json();
}

export async function getCurrentUser(type = "admin") {
    const response = await fetch(`/api/${type}/current`);
    if(!response.ok) {
        throw `Network request for user.json failed with response ${response.status}: ${response.statusText}`;
    }
    return await response.json();
}

export async function getUser(id) {
    const response = await fetch(`/api/admin/user/${id}`);
    if(!response.ok) {
        throw `Network request for user.json failed with response ${response.status}: ${response.statusText}`;
    }
    return await response.json();
}

export async function getRoles() {
    const response = await fetch('/api/admin/rolesList');
    if(!response.ok) {
        throw `Network request for rolesList.json failed with response ${response.status}: ${response.statusText}`;
    }
    return await response.json();
}