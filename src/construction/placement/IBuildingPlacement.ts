export interface IBuildingPlacement {
    findLocation(room : Room) : RoomPosition | undefined
}