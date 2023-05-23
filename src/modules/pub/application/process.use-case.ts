import { postEntityInterface } from "../domain/post.entity";
import { postRepositoryInterface } from "../domain/post.repository";
import { postValue } from "../domain/post.value";

export class postProcessUseCase {
    constructor(private readonly post_repository: postRepositoryInterface) { }

    public async create(value: postEntityInterface): Promise<postEntityInterface> {
        try {
            const new_data: postValue = new postValue(value);
            const created: postEntityInterface = await this.post_repository.create(new_data);
            for (const item of new_data.comments) {
                created.comments.push(await this.post_repository.create_comment(created.uuid, item));
            }
            return created;
        } catch (error) {
            throw error;
        }
    }

    public async update(value: postEntityInterface): Promise<postEntityInterface> {
        try {
            const update_data: postValue = new postValue(value);
            const updated: postEntityInterface = await this.post_repository.update(update_data);
           /* if (update_data.comments.length > 0) {
                for (const item of update_data.comments) {
                    updated.comments.push(await this.post_repository.update_comment(item));
                }
            }*/
            return updated;
        } catch (error) {
            throw error;
        }
    }

    public async delete(uuid: string): Promise<postEntityInterface> {
        try {
            const exist_comment = await this.post_repository.show_comment(uuid);
            if (exist_comment.length > 0) {
                for (const item of exist_comment) {
                    await this.post_repository.delete_comment(item.uuid);
                }
            }
            const deleted: postEntityInterface = await this.post_repository.delete(uuid);
            return deleted;
        } catch (error) {
            throw error;
        }
    }
}