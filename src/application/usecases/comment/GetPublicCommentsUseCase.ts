import Comment from "@/domain/entities/Comment";
import Response from "@/domain/entities/Response";
import ICommentRepo from "@/domain/repositories/ICommentRepo";

class GetPublicCommentsUseCase {
    private readonly commentsRepo: ICommentRepo;

    constructor(commentsRepo: ICommentRepo) {
        this.commentsRepo = commentsRepo;
    }

    async run(): Promise<Response<Comment[]>> {
        let response: Response<Comment[]> = await this.commentsRepo.getPublic();
        return response;
    }
}

export default GetPublicCommentsUseCase;