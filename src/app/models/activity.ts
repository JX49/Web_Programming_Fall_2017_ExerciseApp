

export class Activity {
    text: string;
    calories: number;
    player: string;
}

export class User {
    id: number;
    name: string = "billy";
    quotes: Activity[] = [];
    


  
    

}

export class Room {
    players: User[] = [new User(), new User()];
    Activities: Activity[] = [];
    

    

}
