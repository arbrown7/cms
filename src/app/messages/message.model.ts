export class Message {
    //id—the id of the message
    //subject—the subject of the message
    //msgText—the text of the message
    //sender—the sender of the message

    constructor(public id: number, public subject: string, public msgText: string, public sender: string) {}
}