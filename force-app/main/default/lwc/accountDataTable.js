import { LightningElement, wire } from 'lwc';
import getTopAccounts from '@salesforce/apex/AccountDataController.getTopAccounts';

export default class AccountDataTable extends LightningElement {
    accounts = [];
    error;

    @wire(getTopAccounts)
    wiredAccounts({ error, data }) {
        if (data) {
            this.accounts = data.map(account => ({
                name: account.Name,
                contacts: account.Contacts.map(contact => ({
                    name: contact.Name,
                    cases: contact.Cases.map(cs => ({
                        caseNumber: cs.CaseNumber,
                        subject: cs.Subject
                    }))
                }))
            }));
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.accounts = [];
        }
    }
}
