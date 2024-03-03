import {getUsers} from "./get_data.js";
import {loadUsersList} from "./users_list.js";
import {loadAdminTable} from "./table.js";

async function loadPageContent() {
    try{
        const users = await getUsers();
        loadUsersList(users);
        loadAdminTable(users);
    } catch (e) {
        console.error(e);
    }
}

export default loadPageContent;