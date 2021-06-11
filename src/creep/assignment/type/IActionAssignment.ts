export interface IActionAssignment {
    shouldAssign(creep: Creep): boolean;

    assign(creep: Creep): boolean;

}
