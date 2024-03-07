export class Note {
    title: string;
    content: string;
    createdByUid: string;
    creationTime: number;

    constructor(obj?: any) {
        this.title = obj ? obj.title : '';
        this.content = obj ? obj.content : '';
        this.createdByUid = obj ? obj.createdByUid : '';
        this.creationTime = obj ? obj.creationTime : 0;
    }
}