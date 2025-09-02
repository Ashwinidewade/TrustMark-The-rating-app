import { User } from './user.entity';
import { Store } from './store.entity';
export declare class Rating {
    id: number;
    rating: number;
    comment: string;
    store: Store;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
