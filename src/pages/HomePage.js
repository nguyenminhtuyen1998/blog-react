import { useDispatch } from "react-redux"
import { useEffect } from "react"

import ArticleGeneral from "../components/ArticleGeneral";
import ArticleLatest from "../components/ArticleLatest";
import ArticlePopular from "../components/ArticlePopular";
import { actFetchArticleGeneralAsync, actFetchArticleLatestAsync, actFetchArticlePopularAsync } from "../store/post/actions";

function HomePage() {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(actFetchArticleLatestAsync())
        dispatch(actFetchArticlePopularAsync())
        dispatch(actFetchArticleGeneralAsync())
    }, [dispatch])



    return (
        <>
            <ArticleLatest />
            <ArticlePopular />
            <ArticleGeneral />
        </>
    )
}

export default HomePage