import { postRepositoryInterface } from "../domain/post.repository";
import { postProcessUseCase } from "./process.use-case";
import { postShowUseCase } from "./show.use-case";

export class postApplication {
    public show: postShowUseCase;
    public process: postProcessUseCase;

    constructor(private readonly post_repository: postRepositoryInterface) {
        this.show = new postShowUseCase(post_repository);
        this.process = new postProcessUseCase(post_repository);
    }
}