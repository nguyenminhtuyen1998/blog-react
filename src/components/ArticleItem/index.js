import './article-item.css';
import cls from 'classnames';
import ArticleItemDesc from './ArticleItemDesc';
import ArticleItemThumb from './ArticleItemThumb';
import ArticleItemTitle from './ArticleItemTitle';
import ArticleItemInfo from './ArticleItemInfo';
import ArticleItemCategories from './ArticleItemCategories';
import ArticleItemStats from './ArticleItemStats';

export default function ArticleItem({
    isStyleRow = false,
    isStyleCard = false,
    isShowDesc = false,
    isShowCategoies = false,
    isShowAvatar = true,
    post
}) {


    const classes = cls('article-item', {
        'style-card': isStyleCard,
        'style-row': isStyleRow,
    })

    if (!post) {
        return null
    }

    const { title, thumbnail, author, createdDate, slug, authorId, viewCount, categoriesID} = post
    const slugLink = '/post/' + slug
    const authorLink = '/user/' + authorId

    return (
        <article className={classes}>
            <ArticleItemThumb thumbnail={thumbnail} slugLink={slugLink} title={title} />
            <div className="article-item__content">

                {isShowCategoies && <ArticleItemCategories categoriesID={categoriesID}/>}
                {isShowCategoies && <ArticleItemStats viewCount={viewCount} />}

                <ArticleItemTitle title={title} slugLink={slugLink} />

                {isShowDesc && <ArticleItemDesc />}

                <ArticleItemInfo isShowAvatar={isShowAvatar} author={author} createdDate={createdDate} authorLink={authorLink} />
            </div>
        </article>
    )
}