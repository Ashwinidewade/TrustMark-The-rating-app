import { User } from './user.entity';
import { Rating } from './rating.entity';
export declare class Store {
    id: number;
    name: string;
    email: string;
    address: string;
    owner: User;
    ratings: Rating[];
    createdAt: Date;
    updatedAt: Date;
}
