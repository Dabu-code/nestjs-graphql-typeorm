import { postEntityInterface } from "../domain/post.entity";
import { postRepositoryInterface } from "../domain/post.repository";

export class postShowUseCase {
    constructor(private readonly post_repository: postRepositoryInterface) { }

    async get(uuid:string): Promise<postEntityInterface> {
        const geted: postEntityInterface = await this.post_repository.get(uuid);
        return geted;
    }

    async show(): Promise<postEntityInterface[]> {
        const list: postEntityInterface[] = await this.post_repository.show();
        for(const item of list) item.comments= await this.post_repository.show_comment(item.uuid);
        return list;
    }
}