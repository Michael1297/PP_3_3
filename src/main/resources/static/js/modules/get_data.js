export async function getUsers() {
    const response = await fetch('/api/users');
    if(!response.ok) {
        throw `Network request for users.json failed with response ${response.status}: ${response.statusText}`;
    }
    return await response.json();
}

export async function getUser(id) {
    const response = await fetch(`/api/user/${id}`);
    if(!response.ok) {
        throw `Network request for user.json failed with response ${response.status}: ${response.statusText}`;
    }
    return await response.json();
}

export async function getRoles() {
    const response = await fetch('/api/rolesList');
    if(!response.ok) {
        throw `Network request for rolesList.json failed with response ${response.status}: ${response.statusText}`;
    }
    return await response.json();
}