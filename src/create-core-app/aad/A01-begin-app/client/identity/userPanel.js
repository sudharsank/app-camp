import { inTeams } from '../modules/teamsHelpers.js';
import {
    getLoggedInEmployee,
    logoff
} from './identityClient.js';

class northwindUserPanel extends HTMLElement {

    async connectedCallback() {
        // To skip the navigation rendering if the app is running in Teams
        //console.log(await inTeams());
        if (!(await inTeams())) {
            const employee = await getLoggedInEmployee();

            if (!employee) {

                alert("Employee not found; are you in the right tenant?");
                logoff();

            } else {

                this.innerHTML = `<div class="userPanel">
                <img src="data:image/bmp;base64,${employee.photo}"></img>
                <p>${employee.displayName}</p>
                <p>${employee.jobTitle}</p>
                <hr />
                <button id="logout">Log out</button>
            </div>
            `;

                const logoutButton = document.getElementById('logout');
                logoutButton.addEventListener('click', async ev => {
                    logoff();
                });
            }
        }
    }
}

// Define the web component and insert an instance at the top of the page
customElements.define('northwind-user-panel', northwindUserPanel);
const panel = document.createElement('northwind-user-panel');
document.body.insertBefore(panel, document.body.firstChild);
