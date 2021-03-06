import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actFetchArticleGeneralAsync } from "../../store/post/actions";
import ArticleItem from "../ArticleItem";
import Button from "../shared/Button";
import MainTitle from "../shared/MainTitle";

function ArticleGeneral() {
    const dispatch = useDispatch()
    const posts = useSelector( state => state.Post.articlesPaging.list)
    const currentPage = useSelector( state => state.Post.articlesPaging.currentPage)
    const totalPage = useSelector( state => state.Post.articlesPaging.totalPage)
    
    const hasMorePost = currentPage < totalPage

    const [loading, setLoading] = useState(false)

    function handleLoadMore(){
        if(loading){
            return
        }

        setLoading(true)

        dispatch(actFetchArticleGeneralAsync(
            {
                currentPage: currentPage + 1
            }
        )).then( () => {
            setLoading(false)
        })
    }

    return (
        <div className="articles-list section">
            <div className="tcl-container">
                {/* Main Title */}
                <MainTitle btnLabel="Xem them">Bai Viet Tong Hop</MainTitle>
                {/* End Main Title */}
                {/* End Row News List */}
                <div className="tcl-row">
                   
                   {
                       posts.map( post => {
                           return(
                            <div className="tcl-col-12 tcl-col-md-6" key={post.id}>
                                <ArticleItem isStyleCard isShowAvatar={false} post={post}/>
                             </div>
                           )
                       })
                   }

                </div>
                {/* End Row News List */}
                {
                    hasMorePost && (
                        <div className="text-center">
                    <Button type="primary"
                     size="large" 
                     loading={loading}
                     onClick = {handleLoadMore}
                     >T???i th??m</Button>
                </div>
                    )
                }
                
            </div>
        </div>
    )
}

export default ArticleGeneral