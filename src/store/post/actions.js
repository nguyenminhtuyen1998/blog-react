import { mappingPostData } from "../../helpers"
import postService from "../../services/post"

// Action Types
export const ACT_FETCH_ARTICLE_LATEST = 'ACT_FETCH_ARTICLE_LATEST'
export const ACT_FETCH_ARTICLE_POPULAR = 'ACT_FETCH_ARTICLE_POPULAR'
export const ACT_FETCH_ARTICLE_GENERAL = 'ACT_FETCH_ARTICLE_GENERAL'


// Action

export function actFetchArticleLatest(posts){
    return {
        type : ACT_FETCH_ARTICLE_LATEST,
        payload : {
            posts
        }
    }
}
export function actFetchArticlePopular(posts){
    return {
        type : ACT_FETCH_ARTICLE_POPULAR,
        payload : {
            posts
        }
    }
}

export function actFetchArticleGeneral({
    posts,
    currentPage,
    totalPage,
    total
}){
    return {
        type : ACT_FETCH_ARTICLE_GENERAL,
        payload : {
            posts,
            currentPage,
            totalPage,
            total
        }
    }
}

// Action Async

export function actFetchArticleLatestAsync() {
    return async (dispatch) => {
        try{
            const response = await postService.getArticleLastest()
            const posts = response.data.map(mappingPostData)
            
            dispatch(actFetchArticleLatest(posts))
        }catch(err){

        }
      }
}


export function actFetchArticlePopularAsync() {
    return async (dispatch) => {
        try{
            const response = await postService.getArticlePopular()
            const posts = response.data.map(mappingPostData)
            
            dispatch(actFetchArticlePopular(posts))
        }catch(err){

        }
      }
}

export function actFetchArticleGeneralAsync( {
    perPage = 2,
    currentPage = 1,
} = {}) {
    return async (dispatch) => {
        try{
            const response = await postService.getArticleGeneral( {
                perPage,
                currentPage
            } )

            const totalPage = Number(response.headers["x-wp-totalpages"])
            const total = Number(response.headers["x-wp-total"])
            // console.log(response.headers["x-wp-totalpages"])
            // console.log(response.headers["x-wp-total"])
            const posts = response.data.map(mappingPostData)
            dispatch(actFetchArticleGeneral({
                posts,
                currentPage,
                totalPage,
                total
            }))
        }catch(err){

        }
      }
}

