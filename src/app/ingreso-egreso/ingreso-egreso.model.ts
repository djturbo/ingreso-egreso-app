export class IngresoEgresoModel {
    description: string;
    amount: number;
    type: string;
    uid: string;

    constructor( obj: any ) {
        this.description = obj.description || null;
        this.amount      = obj.amount || null;
        this.type        = obj.type || null;
        // this.uid         = obj.uid || null;
    }
}
