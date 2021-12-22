import { api } from "./api"


const postService = {
    getList(param) {
        return api.call().get("/wp/v2/posts?", {
            params: {
                ...param,
                lang: "vi"
            }
        })
    },
    getArticleLastest() {
        return postService.getList({
            page: 1,
            per_page: 3
        })
    },
    getArticlePopular() {
        return postService.getList({
            page: 1,
            per_page: 3,
            orderby: "post_views"
        })
    },
    getArticleGeneral( {
        perPage = 2,
        currentPage = 1,
    } ) {
        return postService.getList({
            page: currentPage,
            per_page: perPage,
        })
    }
}

export default postService