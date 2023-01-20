import { isNullOrUndefined } from "@swimlane/ngx-datatable";

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    enrollment: string;
    cellPhone: string;
    department: string;
    country: string;
    timezone: string;
    base64: string;
}

export class User implements IUser {
    firstName = null;
    lastName = null;
    email = null;
    base64 = null;
    enrollment = null;
    cellPhone = null;
    department = null;
    country = null;
    timezone = null;

    fromObj(data: any) {
        if (!isNullOrUndefined(data)) {
            this.firstName = this.firstName ? this.firstName : data.firstName ? data.firstName : null;
            this.lastName = this.lastName ? this.lastName : data.lastName ? data.lastName : null;
            this.email = this.email ? this.email : data.email ? data.email : null;
            this.base64 = this.base64 ? this.base64 : data.base64 ? data.base64 : null;
            this.enrollment = this.enrollment ? this.enrollment : data.enrollment ? data.enrollment : null;
            this.cellPhone = this.cellPhone ? this.cellPhone : data.cellPhone ? data.cellPhone : null;
            this.department = this.department ? this.department : data.department ? data.department : null;
            this.country = this.country ? this.country : data.country ? data.country : null;
            this.timezone = this.timezone ? this.timezone : data.timezone ? data.timezone : null;
        }
    }
}