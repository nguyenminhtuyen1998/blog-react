import { ACT_FETCH_ARTICLE_GENERAL, ACT_FETCH_ARTICLE_LATEST, ACT_FETCH_ARTICLE_POPULAR } from "./actions"


const initState = {
    articlesLatest: [],
    articlesPopular: [],
    articlesPaging: {
        list: [],
        currentPage: 1
    }
}

function reducer(postState = initState, action) {
    switch (action.type) {
        case ACT_FETCH_ARTICLE_LATEST:
            return {
                ...postState,
                articlesLatest: action.payload.posts
            }
        case ACT_FETCH_ARTICLE_POPULAR:
            return {
                ...postState,
                articlesPopular: action.payload.posts
            }
        case ACT_FETCH_ARTICLE_GENERAL:
            return {
                ...postState,
                articlesPaging:{
                    ...postState.articlesPaging,
                    list : action.payload.currentPage === 1 ? action.payload.posts : [...postState.articlesPaging.list, 
                    ... action.payload.posts] ,
                    currentPage: action.payload.currentPage,
                    totalPage: action.payload.totalPage,
                    total: action.payload.total,
                    
                } 
            }
        default:
            return postState
    }
}

export default reducer