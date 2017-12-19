

export class Activity {
    text: string;
    calories: number;
    user: string;
}

export class User {
    id: number;
    name: string = "billy";
    activities: Activity[] = [];
    completed: Activity[] = [];
    


  
    

}

export class Room {
    users: User[] = [new User(), new User()];
    activities: Activity[] = [];
    

    

}
